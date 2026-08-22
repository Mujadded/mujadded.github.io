#!/usr/bin/env python3
"""Guard the invariant that shipped a stale page: sw.js precaches APP_SHELL_FILES
cache-first, so a change to one of those files needs a cache-version bump or a
returning visitor's browser never notices the page changed (it only re-checks a
service worker by diffing the file itself). PR #22 changed a precached page and
didn't bump the version; nothing caught it until a live check after merge.

Two checks:
1. VERSION BUMP - if a precached file changed since the base commit, the
   version strings in sw.js (CACHE_NAME/APP_SHELL_CACHE/RUNTIME_CACHE) must
   have changed too.
2. EVERY ENTRY RESOLVES - APP_SHELL_FILES lists no path that isn't a real file
   in the repo. sw.js's cache.add() failures are caught and only console.warn'd
   (deliberately, so one missing file doesn't break the whole shell) - which
   means a renamed/moved precached page fails silently at install time. This
   makes that failure visible at commit time instead.

Run: python3 tests/check_sw_cache.py
Base commit for check 1 comes from $SW_CACHE_BASE if set (CI sets this from the
PR/push event), else falls back to merge-base with origin/master, then HEAD~1.
"""
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SW_PATH = os.path.join(ROOT, "sw.js")

VERSION_RE = re.compile(r"(CACHE_NAME|APP_SHELL_CACHE|RUNTIME_CACHE)\s*=\s*'([^']+)'")
ARRAY_RE = re.compile(r"const APP_SHELL_FILES\s*=\s*\[(.*?)\n\];", re.S)
ENTRY_RE = re.compile(r"'([^']*)'")

fails = []


def check(ok, msg):
    if not ok:
        fails.append(msg)


def sh(*args):
    return subprocess.run(
        ["git", *args], cwd=ROOT, capture_output=True, text=True, check=True
    ).stdout


def parse_app_shell(text):
    m = ARRAY_RE.search(text)
    return ENTRY_RE.findall(m.group(1)) if m else []


def local_path(entry):
    """Map an APP_SHELL_FILES entry to a repo-relative path, or None if external."""
    if entry.startswith("http://") or entry.startswith("https://"):
        return None
    rel = entry.lstrip("/")
    if rel == "" or entry.endswith("/"):
        rel = os.path.join(rel, "index.html")
    return rel


def resolve_base():
    env = os.environ.get("SW_CACHE_BASE")
    if env:
        return env
    for candidate in ("origin/master", "master"):
        try:
            return sh("merge-base", "HEAD", candidate).strip()
        except subprocess.CalledProcessError:
            continue
    try:
        sh("rev-parse", "HEAD~1")
        return "HEAD~1"
    except subprocess.CalledProcessError:
        return None


def sw_versions_at(rev):
    """Version strings in sw.js at `rev`, or None if sw.js doesn't exist there."""
    try:
        text = sh("show", "%s:sw.js" % rev)
    except subprocess.CalledProcessError:
        return None
    return dict(VERSION_RE.findall(text))


sw_text = open(SW_PATH, encoding="utf-8").read()
entries = parse_app_shell(sw_text)
check(bool(entries), "could not find APP_SHELL_FILES in sw.js - guard can't run")

# 1. Version bump: any precached local file that changed since base, without
#    sw.js's own version strings changing, means stale-page risk.
base = resolve_base()
try:
    changed = set(sh("diff", "--name-only", "%s..HEAD" % base).splitlines()) if base else None
except subprocess.CalledProcessError:
    changed = None
if changed is None:
    print("WARN: no usable base commit (shallow clone, or first-ever push) - "
          "skipping the version-bump check.", file=sys.stderr)
else:
    shell_paths = {local_path(e) for e in entries if local_path(e)}
    touched = sorted(changed & shell_paths)
    if touched:
        head_versions = dict(VERSION_RE.findall(sw_text))
        base_versions = sw_versions_at(base)
        check(
            base_versions != head_versions,
            "precached file(s) changed (%s) but sw.js's CACHE_NAME/"
            "APP_SHELL_CACHE/RUNTIME_CACHE did not - bump the version strings "
            "in sw.js so returning visitors actually get the update"
            % ", ".join(touched),
        )

# 2. Every entry resolves to a real file.
for entry in entries:
    rel = local_path(entry)
    if rel is None:
        continue
    check(os.path.exists(os.path.join(ROOT, rel)),
          "APP_SHELL_FILES has '%s' but %s doesn't exist - cache.add() will "
          "fail for it and sw.js only console.warn's, so it silently drops "
          "out of the offline app shell" % (entry, rel))

if fails:
    print("FAIL")
    for f in fails:
        print("  -", f)
    sys.exit(1)
print("OK - sw cache checks passed (%d precached entries)" % len(entries))

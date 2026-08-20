#!/usr/bin/env python3
"""Guard the invariant that broke the Pages build.

GitHub Pages loads jekyll-optional-front-matter, so every .md in the repo is
rendered as a page and its Liquid tags are evaluated. A plan doc that quotes
`{{ }}` therefore kills the whole site build. Internal dev docs are excluded in
_config.yml; this check verifies that nothing Jekyll *still* renders contains
Liquid syntax.

Run: python3 tests/check_jekyll_build.py
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIQUID = re.compile(r"\{\{|\{%")
RAW_BLOCK = re.compile(r"\{%-?\s*raw\s*-?%\}.*?\{%-?\s*endraw\s*-?%\}", re.S)


def excluded_paths():
    """Parse the `exclude:` list out of _config.yml (no PyYAML in stdlib)."""
    path = os.path.join(ROOT, "_config.yml")
    if not os.path.exists(path):
        return []
    out, in_block = [], False
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            if re.match(r"^exclude:\s*$", line):
                in_block = True
                continue
            if in_block:
                item = re.match(r"^\s*-\s*(\S+)\s*$", line)
                if item:
                    out.append(item.group(1).strip("'\"").rstrip("/"))
                elif line.strip() and not line.lstrip().startswith("#"):
                    break  # next top-level key
    return out


def is_excluded(rel, excludes):
    parts = rel.split(os.sep)
    return any(e == rel or e in parts for e in excludes)


def main():
    excludes = excluded_paths()
    rendered, offenders = [], []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in (".git", "_site")]
        for name in filenames:
            if not name.endswith(".md"):
                continue
            rel = os.path.relpath(os.path.join(dirpath, name), ROOT)
            if is_excluded(rel, excludes):
                continue
            rendered.append(rel)
            with open(os.path.join(dirpath, name), encoding="utf-8") as fh:
                body = RAW_BLOCK.sub("", fh.read())
            hit = LIQUID.search(body)
            if hit:
                line = body[: hit.start()].count("\n") + 1
                offenders.append("%s:%d contains Liquid syntax %r" % (rel, line, hit.group(0)))

    if offenders:
        print("FAIL - markdown Jekyll will render contains Liquid syntax:")
        for o in offenders:
            print(" - " + o)
        print("Fix: add the directory to `exclude:` in _config.yml, or wrap the")
        print("     snippet in {%- raw -%} ... {%- endraw -%}.")
        return 1

    print("OK - jekyll build guard passed (%d excluded path(s), %d rendered .md file(s))"
          % (len(excludes), len(rendered)))
    return 0


if __name__ == "__main__":
    sys.exit(main())

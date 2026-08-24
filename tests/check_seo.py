#!/usr/bin/env python3
"""SEO invariants for mjalif.com.

Written after an audit found og:image pointing at assets/images/og-image.jpg,
a file that has never existed - so every share of the homepage rendered without
an image and nobody noticed. These checks are the cheap, mechanical subset of
SEO: the things that are simply broken rather than merely debatable.

Run: python3 tests/check_seo.py
"""
import os
import re
import subprocess
import sys
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NS = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
HOST = "https://www.mjalif.com/"
PAGES = [
    "index.html",
    "case-studies/index.html",
    "case-studies/edge-cv-outdoor-inspection.html",
    "posts/2026-01-27-edge-cv-domain-shift.html",
    "posts/2026-08-20-lightweight-by-constraint.html",
]

fails = []


def check(ok, msg):
    if not ok:
        fails.append(msg)


def local(url):
    """Map a site URL to the file that serves it."""
    rel = url.replace(HOST, "")
    if rel == "" or rel.endswith("/"):
        rel += "index.html"
    return os.path.join(ROOT, rel)


locs = [e.text for e in ET.parse(os.path.join(ROOT, "sitemap.xml")).getroot().iter(NS + "loc")]
check(len(locs) == len(set(locs)), "sitemap.xml contains duplicate <loc> entries")

for url in locs:
    check(url.startswith(HOST),
          "sitemap.xml lists %s, which is not on this host - a sitemap may only "
          "contain URLs it is authoritative for" % url)
    check("#" not in url,
          "sitemap.xml lists the anchor %s; a page fragment is not a separate document" % url)
    if url.startswith(HOST) and "#" not in url:
        check(os.path.exists(local(url)), "sitemap.xml lists %s but no file serves it" % url)

titles, descriptions = {}, {}
for rel in PAGES:
    path = os.path.join(ROOT, rel)
    if not os.path.exists(path):
        fails.append("%s is missing" % rel)
        continue
    html = open(path, encoding="utf-8").read()

    title = re.search(r"<title>(.*?)</title>", html, re.S)
    check(title is not None, "%s has no <title>" % rel)
    if title:
        titles.setdefault(title.group(1).strip(), []).append(rel)

    desc = re.search(r'name="description" content="([^"]*)"', html)
    check(desc is not None, "%s has no meta description" % rel)
    if desc:
        check(len(desc.group(1)) >= 50, "%s has a meta description under 50 characters" % rel)
        descriptions.setdefault(desc.group(1).strip(), []).append(rel)

    canonical = re.search(r'rel="canonical" href="([^"]+)"', html)
    check(canonical is not None, "%s has no canonical URL" % rel)
    if canonical:
        check(canonical.group(1) in locs,
              "%s canonical %s is not listed in sitemap.xml" % (rel, canonical.group(1)))

    # The check that would have caught the original bug: a social image must
    # actually be servable.
    for prop, pattern in (("og:image", r'property="og:image" content="([^"]+)"'),
                          ("twitter:image", r'name="twitter:image" content="([^"]+)"')):
        m = re.search(pattern, html)
        check(m is not None, "%s has no %s" % (rel, prop))
        if m and m.group(1).startswith(HOST):
            check(os.path.exists(local(m.group(1))),
                  "%s points %s at %s, which does not exist" % (rel, prop, m.group(1)))

    check('property="og:image:alt"' in html or 'name="twitter:image:alt"' in html,
          "%s social image has no alt text" % rel)

for title, pages in titles.items():
    check(len(pages) == 1, "duplicate <title> %r on %s" % (title, ", ".join(pages)))
for desc, pages in descriptions.items():
    check(len(pages) == 1, "duplicate meta description on %s" % ", ".join(pages))

# A dateModified/lastmod is a manually-typed date with nothing checking it's
# still true - the exact bug class as the sw-cache version guard, applied to
# freshness instead of caching. Rather than trying to classify commits as
# "content" vs "formatting" (a judgement call a script can't make reliably),
# this compares the READER-VISIBLE TEXT (title, meta description, body prose)
# as of the END OF THE DAY the date claims against the working tree now. A
# reformatting commit changes no visible text, so it can never trip this; a
# real content change always does - and because it's anchored to the whole
# claimed DAY rather than one specific commit, a second same-day commit that
# also touches content doesn't falsely flag a date that's still accurate.
# (First draft anchored to the commit that set the date line instead; that
# false-positived on exactly this - two commits landing the same calendar
# day, the second one prose-only - fixed by switching to date, not commit.)
# Needs full git history (fetch-depth 0 in CI, already set for
# check_sw_cache.py) - degrades to a ::warning:: and skips that one page/URL
# if history isn't available, never a false FAIL.

def visible_content(html):
    """Title + meta description + body prose, whitespace-normalised. Anything
    a search engine or a reader would notice; nothing a reformat would touch."""
    title = re.search(r"<title>(.*?)</title>", html, re.S)
    desc = re.search(r'name="description" content="([^"]*)"', html)
    body = html.split("<body", 1)[1] if "<body" in html else html
    body = re.sub(r"<svg.*?</svg>",
                  lambda m: " ".join(re.findall(r"<(?:title|desc)[^>]*>.*?</(?:title|desc)>",
                                                m.group(0), flags=re.S)),
                  body, flags=re.S)
    for pattern in (r"<pre.*?</pre>", r"<script.*?</script>", r"<style.*?</style>"):
        body = re.sub(pattern, " ", body, flags=re.S)
    body = re.sub(r"<[^>]+>", " ", body)
    combined = (title.group(1) if title else "") + " " + (desc.group(1) if desc else "") + " " + body
    return re.sub(r"\s+", " ", combined).strip()


def git(*args):
    try:
        return subprocess.run(["git", *args], cwd=ROOT, capture_output=True,
                               text=True, check=True).stdout
    except subprocess.CalledProcessError:
        return None


def content_at(commit, rel):
    return git("show", "%s:%s" % (commit, rel))


def check_freshness(date_value, target_rel, what):
    """Has `target_rel`'s visible content changed since the end of the day
    `date_value` claims? If so, that date is stale, wherever it's declared."""
    path = os.path.join(ROOT, target_rel)
    if not date_value or not os.path.exists(path):
        return
    commit = git("log", "--until=%s 23:59:59" % date_value, "-1", "--format=%H", "--", target_rel)
    if not commit or not commit.strip():
        print("::warning::no commit found for %s on or before %s (shallow clone, or the date "
              "predates git's reach) - skipping its freshness check" % (target_rel, date_value))
        return
    old_html = content_at(commit.strip(), target_rel)
    if old_html is None:
        print("::warning::could not read %s as of %s - skipping its freshness check"
              % (target_rel, date_value))
        return
    new_html = open(path, encoding="utf-8").read()
    check(visible_content(old_html) == visible_content(new_html),
          "%s says %s was last modified %s, but its visible content has changed "
          "since end of that day - bump the date" % (what, target_rel, date_value))


for rel in PAGES:
    path = os.path.join(ROOT, rel)
    if not os.path.exists(path):
        continue
    m = re.search(r'"dateModified":\s*"([^"]*)"', open(path, encoding="utf-8").read())
    if m:  # Person/CollectionPage pages have no dateModified
        check_freshness(m.group(1), rel, "%s's dateModified" % rel)

sitemap_text = open(os.path.join(ROOT, "sitemap.xml"), encoding="utf-8").read()
for m in re.finditer(r"<url>(.*?)</url>", sitemap_text, re.S):
    loc_m = re.search(r"<loc>(.*?)</loc>", m.group(1))
    lastmod_m = re.search(r"<lastmod>(.*?)</lastmod>", m.group(1))
    if not (loc_m and lastmod_m and loc_m.group(1).strip().startswith(HOST)):
        continue
    url = loc_m.group(1).strip()
    check_freshness(lastmod_m.group(1).strip(), os.path.relpath(local(url), ROOT),
                     "sitemap.xml's lastmod for %s" % url)

robots = open(os.path.join(ROOT, "robots.txt"), encoding="utf-8").read()
check("Sitemap: %ssitemap.xml" % HOST in robots, "robots.txt does not point at the sitemap")
# Rules only apply to the User-agent group above them; a Disallow stranded
# under a named bot silently applies to that bot alone.
groups = re.findall(r"^User-agent:\s*(\S+)", robots, re.M)
check(groups and groups[0] == "*",
      "robots.txt: the first User-agent group should be * so its rules apply to every crawler")

if fails:
    print("FAIL")
    for f in fails:
        print("  -", f)
    sys.exit(1)
print("OK - SEO checks passed (%d pages, %d sitemap URLs)" % (len(PAGES), len(locs)))

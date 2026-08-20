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
import sys
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NS = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
HOST = "https://mjalif.com/"
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

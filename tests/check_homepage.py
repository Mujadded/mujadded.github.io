#!/usr/bin/env python3
"""Guards the homepage port: no unresolved design syntax, no lost integrations.

Run: python3 tests/check_homepage.py   (exit 0 = pass)
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
html = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
fails = []


def check(ok, msg):
    if not ok:
        fails.append(msg)


# 1. The Claude Design template language must be fully resolved.
for token in ("{{", "sc-for", "sc-if", "<x-dc", "<helmet", "style-hover", "style-focus", "DCLogic"):
    check(token not in html, f"unresolved design syntax left in index.html: {token}")

# 2. Integrations that must survive any redesign.
for needed, what in [
    ("G-955Y7L8VQJ", "GA4 tag"),
    ("https://formspree.io/f/mnnvennw", "Formspree endpoint"),
    ('application/ld+json', "schema.org JSON-LD"),
    ('rel="manifest"', "PWA manifest link"),
    ("serviceWorker", "service worker registration (js/home.js is linked)"),
    ("assets/docs/MJ-Alif-CV.pdf", "CV download"),
    ('href="case-studies/"', "/case-studies/ link"),
    ("posts/2026-01-27-edge-cv-domain-shift.html", "/posts/ link"),
    ('rel="canonical"', "canonical URL"),
    ("sitemap.xml", "sitemap link"),
]:
    check(needed in html or needed in open(os.path.join(ROOT, "js/home.js"), encoding="utf-8").read(),
          f"missing {what}")

# 3. Placeholders stay placeholders; invented profiles stay deleted.
for invented in ("orcid.org/0000-0000-0000-0000", "researchgate.net/profile/mjalif",
                 "github.com/mujaddedalif", "scholar.google.com/citations?user=mjalif"):
    check(invented not in html, f"invented/placeholder profile URL is back: {invented}")

# 4. Accessibility basics.
check(len(re.findall(r"<h1[\s>]", html)) == 1, "there must be exactly one <h1>")
for field in ("cf-name", "cf-email", "cf-message"):
    check(f'for="{field}"' in html, f"form field {field} has no <label for>")
    check(f'id="{field}"' in html, f"form field {field} is missing")
check('class="skip"' in html, "skip-to-content link missing")

# 5. Local files the page points at must exist.
for path in ("css/home.css", "js/home.js", "assets/docs/MJ-Alif-CV.pdf", "manifest.json", "sw.js"):
    check(os.path.exists(os.path.join(ROOT, path)), f"referenced file does not exist: {path}")

# 6. The service worker cache must have been bumped, or returning
#    visitors keep the old homepage.
sw = open(os.path.join(ROOT, "sw.js"), encoding="utf-8").read()
check("v1.2.0" not in sw, "sw.js cache version was not bumped past v1.2.0")
check("/css/home.css" in sw and "/js/home.js" in sw, "sw.js app shell does not cache the new homepage assets")

# 7. Every in-page anchor the homepage links to must exist. This used to read
#    the anchor URLs out of sitemap.xml; those were removed as SEO noise, which
#    would have left this loop iterating nothing, so it now reads the page's own
#    navigation - the links that actually have to resolve.
for anchor in sorted(set(re.findall(r'href="#([\w-]+)"', html))):
    check(f'id="{anchor}"' in html, f"the page links to #{anchor}, which is not a section on it")

# 8. A citation figure quoted in the meta description must match the stat row,
#    or the two drift apart the next time Scholar is refreshed.
meta_desc = re.search(r'name="description" content="([^"]*)"', html)
stat_cites = re.search(r'<div class="stat"><dd class="accent">([\d,]+)</dd><dt>Citations</dt></div>', html)
if meta_desc and stat_cites:
    quoted = re.search(r"([\d,]+) citations", meta_desc.group(1))
    if quoted:
        check(quoted.group(1) == stat_cites.group(1),
              f"meta description says {quoted.group(1)} citations but the stat row says {stat_cites.group(1)}")

# 8. Publication data integrity. The page once shipped a headline of 584 while
#    the per-paper counts summed to 825. Scholar's official total is
#    de-duplicated and legitimately differs from that sum, so the invariant is
#    not "these add up" - it is "the stat matches the list, each row agrees with
#    itself, and the figures carry a date".
listed = len(re.findall(r'<li class="pub"', html))
stat = re.search(r'<div class="stat"><dd>(\d+)</dd><dt>Publications</dt></div>', html)
check(stat is not None, "no Publications stat found")
if stat:
    check(int(stat.group(1)) == listed,
          f"Publications stat says {stat.group(1)} but {listed} papers are listed")
check(re.search(r"as of \d{1,2} \w+ \d{4}", html) is not None,
      "citation figures have no 'as of <date>' provenance line")
for cites, shown in re.findall(
        r'<li class="pub" data-year="\d+" data-cites="(\d+)">.*?<p class="cites">(\d+) cit\.</p>',
        html, re.S):
    check(cites == shown, f"data-cites {cites} does not match the displayed {shown} cit.")

if fails:
    print("FAIL")
    for f in fails:
        print("  -", f)
    sys.exit(1)
print(f"OK — homepage checks passed ({len(html)} bytes)")

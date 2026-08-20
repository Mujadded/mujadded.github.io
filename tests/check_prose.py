#!/usr/bin/env python3
"""Keep em dashes out of the published prose.

An em dash everywhere is the loudest tell that copy was machine-written, and
the founder called it out on the live site. This checks the rendered prose
only. Headings and the section rail labels are in scope: the founder asked
for those too, so a colon or a middot replaces the dash there. Code, tag
attributes and the drawn parts of SVG figures are excluded as structure
rather than sentences, but an SVG's <title> and <desc> are read aloud by a
screen reader, so they count as prose. En dashes in number and date ranges
are correct typography and are left alone.

Run: python3 tests/check_prose.py
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = [
    "index.html",
    "case-studies/index.html",
    "case-studies/edge-cv-outdoor-inspection.html",
    "posts/2026-01-27-edge-cv-domain-shift.html",
    "posts/2026-08-20-lightweight-by-constraint.html",
]
EM = re.compile(r"—|&mdash;")

fails = []


def prose_of(html):
    """The sentences a reader actually reads."""
    body = html.split("<body", 1)[1] if "<body" in html else html
    # An SVG's own title/desc are the accessible text, so keep them and drop
    # only the shapes around them.
    body = re.sub(r"<svg.*?</svg>",
                  lambda m: " ".join(re.findall(r"<(?:title|desc)[^>]*>.*?</(?:title|desc)>",
                                                m.group(0), flags=re.S)),
                  body, flags=re.S)
    for pattern in (r"<pre.*?</pre>", r"<script.*?</script>", r"<style.*?</style>",
                    r'<p class="role-dates">.*?</p>'):
        body = re.sub(pattern, " ", body, flags=re.S)
    return re.sub(r"<[^>]+>", " ", body)   # drops attributes with the tags


for rel in PAGES:
    path = os.path.join(ROOT, rel)
    if not os.path.exists(path):
        fails.append("%s is missing" % rel)
        continue
    text = prose_of(open(path, encoding="utf-8").read())
    for m in EM.finditer(text):
        snippet = re.sub(r"\s+", " ", text[max(0, m.start() - 60):m.start() + 60]).strip()
        fails.append("%s has an em dash in prose: ...%s..." % (rel, snippet))

if fails:
    print("FAIL")
    for f in fails:
        print("  -", f)
    print("Pick the punctuation the sentence wants: a comma for an aside, a")
    print("colon for an expansion, or a full stop. Not one mechanical swap.")
    sys.exit(1)
print("OK - prose checks passed (%d pages, no em dashes)" % len(PAGES))

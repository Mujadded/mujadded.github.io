#!/usr/bin/env python3
"""Structural guard for the /case-studies/ and /posts/ templates.

Mirrors tests/check_homepage.py. Catches the two ways this port can break
silently: leaving Claude Design authoring syntax in a shipped page, and losing
a must-keep (analytics, canonical, structured data, a stable URL) while
restyling. Run: python3 tests/check_articles.py
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# URLs the founder has published. Renaming or dropping one breaks inbound links.
STABLE_URLS = [
    "case-studies/index.html",
    "case-studies/edge-cv-outdoor-inspection.html",
    "posts/2026-01-27-edge-cv-domain-shift.html",
    "posts/2026-08-20-lightweight-by-constraint.html",
]

ARTICLE_PAGES = STABLE_URLS

# Every published page, for the checks that apply site-wide.
PUBLISHED_PAGES = ["index.html"] + STABLE_URLS

# Design-format constructs that must be resolved at author time - none of them
# do anything in a browser.
DESIGN_SYNTAX = ["{{", "sc-for", "sc-if", "<x-dc", "<helmet", "style-hover",
                 "style-focus", "DCLogic", "data-dc-script"]

# Profiles that do not belong to him. Never let one back in.
INVENTED_URLS = ["orcid.org/0000-0000-0000-0000", "researchgate.net/profile/mjalif",
                 "github.com/mujaddedalif", "scholar.google.com/citations?user=mjalif"]

MUST_KEEP = [
    ("GA4 tag", "G-955Y7L8VQJ"),
    ("canonical link", 'rel="canonical"'),
    ("OG title", 'property="og:title"'),
    ("favicon", "favicon"),
    ("skip link", 'href="#main"'),
]

errors = []


def fail(msg):
    errors.append(msg)


# Meta-note tells. A note meant for the author ("I can turn this into a
# LinkedIn version next week") once shipped to the live site because the port
# preserved content verbatim and nobody separated article text from
# author-to-author chatter. These patterns are never article content.
# Intentional flags - [NEEDS DOI], [PLACEHOLDER: ...], [X] - are NOT leaks and
# are deliberately absent from this list.
META_TELLS = [
    "i can turn this", "i&rsquo;ve kept", "i've kept", "let me know",
    "if you want:", "next week", "you mentioned", "your real ",
    "your project numbers", "your actual class", "next edit step",
    "note to self", "todo:", "draft note", "for you next",
]


# Placeholder tokens. These were previously tolerated as deliberate "fill me in
# later" flags, which is exactly how six [NEEDS DOI]s and a [PLACEHOLDER: ORCID]
# reached the live site. Nothing scaffolded ships: render the field without the
# missing part, or do not publish the item.
PLACEHOLDER_TOKENS = [
    "[placeholder", "[metric]", "[needs ", "[x]", "[y]", "[n%]",
    "[&mdash;]", "[\u2014]", "case study pending", "placeholder",
]


def check_placeholders(rel, html):
    lowered = html.lower()
    for token in PLACEHOLDER_TOKENS:
        idx = lowered.find(token)
        if idx != -1:
            line = html[:idx].count("\n") + 1
            fail("%s:%d has a placeholder token %r - omit the field or unpublish "
                 "the item; placeholders must not reach a published page"
                 % (rel, line, html[idx:idx + 60].replace("\n", " ")))


def check_meta_notes(rel, html):
    lowered = html.lower()
    for tell in META_TELLS:
        idx = lowered.find(tell)
        if idx != -1:
            line = html[:idx].count("\n") + 1
            fail("%s:%d reads like an author/assistant note, not article content: %r"
                 % (rel, line, html[idx:idx + 70].replace("\n", " ")))


def check_page(rel):
    path = os.path.join(ROOT, rel)
    if not os.path.exists(path):
        fail("%s is missing - a published URL was dropped" % rel)
        return
    html = open(path, encoding="utf-8").read()

    for token in DESIGN_SYNTAX:
        if token in html:
            fail("%s contains unresolved design syntax %r" % (rel, token))

    for label, needle in MUST_KEEP:
        if needle not in html:
            fail("%s is missing its %s" % (rel, label))

    for bad in INVENTED_URLS:
        if bad in html:
            fail("%s contains an invented profile URL %r" % (rel, bad))

    check_meta_notes(rel, html)
    check_placeholders(rel, html)

    h1s = re.findall(r"<h1\b", html)
    if len(h1s) != 1:
        fail("%s has %d <h1> elements, expected exactly 1" % (rel, len(h1s)))

    blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)
    if not blocks:
        fail("%s has no JSON-LD structured data" % rel)
    for block in blocks:
        try:
            json.loads(block)
        except ValueError as exc:
            fail("%s has JSON-LD that does not parse: %s" % (rel, exc))

    # Every local asset the page references must exist.
    page_dir = os.path.dirname(path)
    for ref in re.findall(r'(?:href|src)="([^"#?:]+\.(?:css|js|ico|png|json))"', html):
        target = os.path.normpath(os.path.join(page_dir, ref.lstrip("/")
                                               if ref.startswith("/") else ref))
        if ref.startswith("/"):
            target = os.path.normpath(os.path.join(ROOT, ref.lstrip("/")))
        if not os.path.exists(target):
            fail("%s references %s which does not exist" % (rel, ref))


def check_service_worker():
    sw = open(os.path.join(ROOT, "sw.js"), encoding="utf-8").read()
    if "v1.3.0" in sw:
        fail("sw.js still on v1.3.0 - bump the cache or returning visitors keep "
             "the old precached pages")
    if "/css/article.css" not in sw:
        fail("sw.js app shell does not include /css/article.css")


def main():
    for rel in ARTICLE_PAGES:
        check_page(rel)
    # the homepage is not an article page, but the same rule applies to it
    home = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
    check_placeholders("index.html", home)
    check_meta_notes("index.html",
                     open(os.path.join(ROOT, "index.html"), encoding="utf-8").read())
    check_service_worker()

    if errors:
        print("FAIL")
        for e in errors:
            print(" - " + e)
        return 1
    total = sum(os.path.getsize(os.path.join(ROOT, p)) for p in ARTICLE_PAGES)
    print("OK - article checks passed (%d pages, %d bytes)" % (len(ARTICLE_PAGES), total))
    return 0


if __name__ == "__main__":
    sys.exit(main())

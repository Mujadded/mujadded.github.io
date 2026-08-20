# Case Study + Blog Post Template Port — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Bring `/case-studies/` and `/posts/` into the homepage's visual language by porting the two remaining Claude Design templates, without changing a word of the existing published content or any existing URL.

**Architecture:** Same pattern that worked for the homepage. The `.dc.html` templates do not run in a browser — `{{ }}` bindings, `sc-for`, `style-hover` and the `DCLogic` class are all author-time constructs. They get resolved into static HTML, every inline style is lifted into a class in one shared stylesheet so hover/focus states can exist at all, and the only genuinely interactive piece (the theme toggle) reuses the JavaScript already shipped for the homepage.

**Tech Stack:** Hand-written HTML, one new CSS file, no new JavaScript, no framework, no build step, no new dependency.

**Spec:** the two design files in Claude Design project `5ed1b4d3-3efe-4148-9c9f-dc6cdb499c80` — `MJ Alif Case Study.dc.html` and `MJ Alif Blog Post.dc.html`.

## Global Constraints

- **Every existing URL survives byte-for-byte**: `/case-studies/`, `/case-studies/edge-cv-outdoor-inspection.html`, `/posts/2026-01-27-edge-cv-domain-shift.html`. No renames, no drops.
- **Every existing word survives.** These are restyles. The existing case study is explicitly published as a literature-based template with `[X]` placeholders and says so on the page; that framing is content, and it stays.
- **Nothing invented.** The design's metric cards, "At a glance" fields and figure slots want numbers this project does not have. They stay flagged placeholders for the founder. No fabricated mAP, FPS, dataset size, funder or role.
- Must-keeps: GA4 `G-955Y7L8VQJ`, canonical + OG, JSON-LD, favicons, sitemap, PWA manifest/service worker. The sub-pages currently have none of the analytics/SEO ones — they get the same set the homepage has, using only facts already on the page.
- Service worker: bump every cache version and add new assets to the app shell. Same trap caught on the homepage — a stale precache means returning visitors never see the change.
- Canonical host is `https://mjalif.com` (no `www`), matching the homepage and sitemap.
- Do not restyle the homepage again.

## Content mapping (stated, not invented)

The existing case study's numbered sections map onto the design's named sections:

| Existing | Design section |
|---|---|
| 1) Problem | The problem |
| 2) Dataset Reality | The constraint (the messy factors *are* the constraint) |
| 3) Model Choice + decision framing | Approach |
| 4) Metrics | Results (table cells stay `[—]`; no real numbers exist) |
| 5) Deployment Constraints | Deployment |
| 6) One failure + one lesson | What I would do differently |
| 7) Reproducible demo, References | kept in flow after the above |

The design's sidebar "At a glance" asks for Role / Domain / Stack / Funding — none are stated anywhere in the existing content, so the sidebar carries the existing Dataset-Reality key/value table (real content) plus flagged placeholders for the rest.

## File Structure

- `css/article.css` — new. Design tokens, base typography, shared header/footer chrome, and the case-study, blog-post and listing classes. One file, one request, self-contained; the token block is duplicated from `home.css` rather than extracted, because extracting it would mean touching the homepage.
- `case-studies/edge-cv-outdoor-inspection.html` — restyled onto the case-study template.
- `posts/2026-01-27-edge-cv-domain-shift.html` — restyled onto the blog-post template.
- `case-studies/index.html` — restyled listing, so the header's "← Case studies" link does not land on an old-styled page.
- `js/home.js` — unchanged behaviour, reused. Every block is already guarded by an element check, so it degrades to "theme toggle + service worker registration" on the article pages.
- `sw.js` — cache bump, app shell updated.
- `sitemap.xml` — the three article URLs added (they were never listed).
- `tests/check_articles.py` — new check.

---

### Task 1: The check, first and failing

**Files:** Create `tests/check_articles.py`

Mirrors `tests/check_homepage.py`. For each of the three article pages it asserts: no unresolved design syntax (`{{`, `sc-for`, `sc-if`, `<x-dc`, `<helmet`, `style-hover`, `style-focus`, `DCLogic`); GA4, canonical, OG, JSON-LD and favicon present; JSON-LD parses; exactly one `<h1>`; a skip link; every referenced local file exists; and no invented profile URLs. Plus, across the repo: every existing article URL still exists on disk, and the service-worker cache version is past `v1.3.0`.

- [ ] **Step 1:** Write it.
- [ ] **Step 2:** Run it. Expected: FAIL — the pages have no GA4, no canonical, no JSON-LD, no skip link.
- [ ] **Step 3:** Commit.

### Task 2: `css/article.css`

Tokens copied verbatim from the two `<helmet>` blocks (they agree; the case study adds `--split` and `--figs`). Every inline style becomes a class. Hover and focus states, which have no HTML equivalent and would otherwise be silently dropped, are written out.

- [ ] **Step 1:** Write the stylesheet.
- [ ] **Step 2:** Commit.

### Task 3: The three pages

- [ ] **Step 1:** Case study — template markup, existing content, placeholders left flagged.
- [ ] **Step 2:** Blog post — same.
- [ ] **Step 3:** Listing page — same chrome, cards restyled.
- [ ] **Step 4:** Run `python3 tests/check_articles.py`. Expected: PASS.
- [ ] **Step 5:** Diff the rendered text against the old pages to prove no content was lost.
- [ ] **Step 6:** Commit.

### Task 4: Chrome — service worker, sitemap

- [ ] **Step 1:** `sw.js` — all three cache names to `v1.4.0`; add `/css/article.css` and the three article URLs to the app shell; drop the entries no page loads any more (`style.css`, `animations.css`, `main.js`, Font Awesome).
- [ ] **Step 2:** `sitemap.xml` — add `/case-studies/`, the case study and the post.
- [ ] **Step 3:** Run both check scripts plus `check_jekyll_build.py`. Expected: all pass.
- [ ] **Step 4:** Commit, push, open the PR, confirm the `build` check goes green.

## Verification

There is still no browser and no Ruby/Jekyll on this machine, so there is no visual or Lighthouse pass — the PR's `build` check is the build evidence, the check scripts are the structural evidence, and a text-extraction diff against the previous revision is the content-preservation evidence. Say so plainly rather than implying a visual review happened.

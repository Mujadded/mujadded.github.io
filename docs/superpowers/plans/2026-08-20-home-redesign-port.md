# Homepage Redesign Port — Implementation Plan

> **For agentic workers:** implement task-by-task; steps use `- [ ]` checkboxes.

**Goal:** Replace the mjalif.com homepage with the founder-authored Claude Design homepage (`MJ Alif Home.dc.html`), as a plain static page, with every existing integration intact.

**Architecture:** The design source is a Claude Design component (`<x-dc>` template + a `DCLogic` class with data arrays, `{{ }}` bindings, `sc-for` loops, and `style-hover`/`style-focus` pseudo-attributes). None of that runs in a browser. The port resolves it at author time: loops are expanded into static HTML, bindings are replaced by their real values, and the design's inline styles are lifted into a class-based stylesheet so hover/focus/media states become real CSS. Only the publications grouping toggle, the theme toggle, the mobile nav and the contact form need runtime behaviour, so those become one small vanilla-JS file. No build step, no framework, no new dependency.

**Tech Stack:** Static HTML + CSS custom properties + vanilla JS, served by GitHub Pages. Google Fonts (Instrument Serif, DM Sans, Space Mono). Formspree for the contact form. Python 3 stdlib for the verification check.

**Spec:** the design project itself — `MJ Alif Home.dc.html` and `github.md` in Claude Design project `5ed1b4d3-3efe-4148-9c9f-dc6cdb499c80`. Content decisions (copy, numbers, section order, nav contents) are the founder's and are ported verbatim.

## Global Constraints

- **Homepage only.** `case-studies/` and `posts/` pages keep using `css/style.css`, `css/animations.css` and `js/main.js` — none of those may be deleted or restyled.
- **Preserve on `index.html`:** GA4 tag `G-955Y7L8VQJ`; Formspree endpoint `https://formspree.io/f/mnnvennw`; `schema.org` Person JSON-LD; meta/OG/Twitter/canonical/geo tags; favicons; `manifest.json` link; service-worker registration; the `/case-studies/` and `/posts/` URL paths; the CV download at `assets/docs/MJ-Alif-CV.pdf`.
- **Never invent.** Every fact, number and string comes from the design file. Placeholders in the design (portrait, ORCID, the third case study, missing DOIs, the citation-total VERIFY note) are ported **as visible placeholders**, not filled in.
- **Accent colour:** `#a99dff` on dark, `#4b3fd6` on light. Page background `#111318` dark / `#f8f9fd` light. The old `#8B5CF6` must not remain in homepage-facing chrome (manifest, theme-color, mask-icon).
- **Accessibility:** one `h1`; labelled form fields; visible focus ring; 44px minimum tap targets; `prefers-reduced-motion` honoured; skip link.

---

### Task 1: Stylesheet — `css/home.css`

**Files:** Create `css/home.css`

- [ ] **Step 1:** Copy the design's `:root` token block verbatim (colours, fonts, `--pad`/`--cols`/`--sec`/`--split`/`--r` layout vars) plus the `:root[data-theme="light"]` overrides and the 768/1024/1440px media queries that retune the vars.
- [ ] **Step 2:** Copy the element base rules (`body`, `h1–h4`, `a`, `ul/ol`, `:focus-visible`, `::selection`, `mark`, `section[id]{scroll-margin-top}`, the `prefers-reduced-motion` block).
- [ ] **Step 3:** Add one class per repeated design element (`.nav-link`, `.pill`, `.btn-primary`, `.stat`, `.pub-row`, `.case-card`, `.role-row`, `.interest`, `.post-row`, `.field`, …), each carrying the exact declarations from the corresponding inline `style` attribute in the design.
- [ ] **Step 4:** Convert every `style-hover="…"` and `style-focus="…"` attribute into a real `:hover` / `:focus-visible` rule on the matching class. These have no HTML equivalent — dropping them silently would lose the design's interaction layer.

### Task 2: Behaviour — `js/home.js`

**Files:** Create `js/home.js`

- [ ] **Step 1:** Theme toggle — read/write `localStorage['mjalif-theme']`, set `document.documentElement.dataset.theme`, and update the button label/`aria-label` (`Light`/`Dark`). The no-flash inline snippet stays in `<head>` exactly as the design has it.
- [ ] **Step 2:** Mobile nav — toggle `hidden` on `#mobile-nav`, keep `aria-expanded` in sync, swap the button label `Menu`/`Close`, close on link click.
- [ ] **Step 3:** Publications grouping — the "By theme" grouping is the static HTML; "By year" regroups the same `<li>` nodes using `data-year` and `data-cites`, and rebuilds the group headers. Both buttons keep `aria-pressed` correct. With JS off, the theme grouping still renders.
- [ ] **Step 4:** Contact form — port `validate()`/`onSubmit()` from the design: block submit, validate name/email/message, write messages into the `#cf-*-err` paragraphs, focus the first bad field, `fetch` to Formspree with `Accept: application/json`, and set the `role="status"` line on success/failure. Keep the `_gotcha` honeypot.
- [ ] **Step 5:** Service-worker registration — one `navigator.serviceWorker.register('/sw.js')` call. The old `confirm('New version available…')` prompt and the floating "Install App" button are dropped; they are not in the design and the browser's own install UI covers the latter.

### Task 3: Page — `index.html`

**Files:** Modify `index.html` (full rewrite)

- [ ] **Step 1:** Head — carry over every must-keep listed in Global Constraints, swap the font link to Instrument Serif + DM Sans + Space Mono, link `css/home.css`, drop the Font Awesome CDN and the old stylesheet/preload lines, and use the design's `<title>`/`<meta name="description">`. Add media-scoped `theme-color` metas (`#f8f9fd` light, `#111318` dark).
- [ ] **Step 2:** JSON-LD — keep the existing Person object, but set `sameAs` to the real profiles only: LinkedIn, `https://github.com/Mujadded`, `https://blog.mjalif.com`, `https://scholar.google.com/citations?user=2M71y1UAAAAJ`. Delete the invented `orcid.org/0000-0000-0000-0000`, `researchgate.net/profile/mjalif` and `github.com/mujaddedalif` entries.
- [ ] **Step 3:** Body — port the design's header/nav (desktop + mobile), hero, stat row, About, Research, Selected work, Experience, Interests, Writing, Contact and footer, expanding every `sc-for` into static markup and substituting the class names from Task 1.
- [ ] **Step 4:** Data expansion — 11 publications (title, venue, year, citation count, link or Scholar fallback, `[NEEDS DOI]`/`[NEEDS VENUE + LINK]` flags), 3 case cards, 8 roles across 2 eras, 3 interest areas with their tool lists, 4 posts. Values exactly as in the design; no rewording, no filling of placeholders.

### Task 4: Chrome that still carries the old accent

**Files:** Modify `manifest.json`, `sw.js`

- [ ] **Step 1:** `manifest.json` — `theme_color` and `background_color` to `#111318`.
- [ ] **Step 2:** `sw.js` — bump `CACHE_NAME`/`APP_SHELL_CACHE`/`RUNTIME_CACHE` to `v1.3.0` so returning visitors are not served the cached old homepage, and swap the app-shell entries for the new `css/home.css` / `js/home.js` and the new font URL. `css/style.css` and `js/main.js` stay in the shell — the sub-pages still use them.

### Task 5: Verification check

**Files:** Create `tests/check_homepage.py`

- [ ] **Step 1:** Write a stdlib-only script that fails loudly if the port regressed: no unresolved template syntax left (`{{`, `sc-for`, `x-dc`, `style-hover`, `style-focus`, `<helmet>`); every must-keep present (GA4 id, Formspree endpoint, JSON-LD, manifest link, sw registration, CV path, `/case-studies/`, `/posts/`); exactly one `<h1>`; every `id="cf-*"` input has a matching `<label for>`; no invented ORCID/ResearchGate URL; the referenced local files exist.
- [ ] **Step 2:** Run `python3 tests/check_homepage.py`, confirm it passes, and confirm it fails when a must-keep is removed.
- [ ] **Step 3:** Commit, push, open the PR with this plan in the body.

# Pages Build Fix + GitHub Actions CI — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Stop Jekyll from rendering internal dev docs (which broke the Pages build), and add a GitHub Actions workflow so a broken build shows red on a PR instead of on the deploy path.

**Architecture:** Two independent changes. (1) A repo-root `_config.yml` whose `exclude:` list covers the internal dev-doc directories, so Jekyll copies the site through without parsing markdown that was never meant to be a page. (2) A single `.github/workflows/pages.yml` that builds the Pages site and runs the homepage checks on every pull request, and on `master` builds then deploys — with the deploy step self-gating on whether the repo's Pages source has actually been switched to "GitHub Actions", so it can never report a false failure while the repo is still on the legacy branch-deploy path.

**Tech Stack:** GitHub Pages (github-pages v232 / jekyll 3.10, legacy build), GitHub Actions (`actions/configure-pages`, `actions/jekyll-build-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`), Python 3 stdlib for the repo checks.

**Spec:** this document (bounded change; the failing build log is the spec).

## Context — the failure

Run `32381934290` (`master`, 2026-08-20T14:44) died with:

```
Rendering: docs/superpowers/plans/2026-08-20-home-redesign-port.md
Rendering Liquid: docs/superpowers/plans/2026-08-20-home-redesign-port.md
Error: Liquid syntax error (line 62): Variable '{{' was not properly terminated
```

GitHub Pages loads `jekyll-optional-front-matter`, so *every* `.md` in the repo is
rendered as a page whether or not it has front matter. The homepage plan doc quotes
the Claude Design binding syntax verbatim, Liquid tries to evaluate it, and the whole
build dies — taking the site deploy with it. PR #1 merged before anyone saw it, so
`master` has been failing to deploy since.

## Global Constraints

- The plan/spec docs **stay in the repo** — they are only un-rendered, never deleted.
- No blanket `.nojekyll`. Verified first: no HTML in this repo has front matter or
  Liquid tags, and there is no `_layouts` / `_includes` / `_data` — so `/posts/` and
  `/case-studies/` do not depend on Jekyll rendering. `.nojekyll` would have worked,
  but `exclude:` is the narrower change and leaves site rendering untouched.
- Setting `exclude:` **replaces** the GitHub Pages defaults, so the default entries
  (`Gemfile`, `Gemfile.lock`, `node_modules`, `vendor/*`) must be re-listed verbatim.
- Do not change repo Settings. If the Actions deploy needs Pages source flipped to
  "GitHub Actions", that is a founder toggle, reported not performed.
- Homepage PR only: no restyling, all must-keeps (GA4, Formspree, JSON-LD, PWA
  manifest/service worker, sitemap, `/case-studies/` + `/posts/` URLs) untouched.

---

### Task 1: A check that fails on the current tree

**Files:**
- Create: `tests/check_jekyll_build.py`

The guard is not "line 62 is escaped" — it is the invariant that broke: *no markdown
file that Jekyll will render may contain Liquid syntax*. The check parses the
`exclude:` list out of `_config.yml`, walks every `.md` Jekyll would still render, and
fails if one contains `{{` or `{%` outside a `{% raw %}` block.

- [ ] **Step 1:** Write the check.
- [ ] **Step 2:** Run `python3 tests/check_jekyll_build.py` on the unfixed tree.
      Expected: FAIL naming `docs/superpowers/plans/2026-08-20-home-redesign-port.md`.
- [ ] **Step 3:** Commit.

### Task 2: The root-cause fix

**Files:**
- Create: `_config.yml`

`exclude:` covers `docs/` (all plans and specs, now and future), `drafts/`
(unpublished writing that was being rendered as live pages), plus the re-listed
GitHub Pages defaults.

- [ ] **Step 1:** Write `_config.yml`.
- [ ] **Step 2:** Run `python3 tests/check_jekyll_build.py`. Expected: PASS.
- [ ] **Step 3:** Run `python3 tests/check_homepage.py`. Expected: still PASS.
- [ ] **Step 4:** Commit.

### Task 3: CI

**Files:**
- Create: `.github/workflows/pages.yml`

`build` runs on `pull_request` and on `push` to `master`: checkout, both Python
checks, `configure-pages`, `jekyll-build-pages`, and (on `master` only) upload the
artifact. A real Liquid error now turns the PR red before it can reach the deploy path.

`deploy` runs only on `push` to `master`. Its first step reads the repo's Pages
`build_type`; `deploy-pages` runs only when that is `workflow`. Today the repo is
`build_type: legacy` (source: branch `master`), so the deploy step is skipped and the
existing legacy `pages-build-deployment` keeps publishing the site. The moment the
founder flips Settings → Pages → Source to "GitHub Actions", this job takes over with
no code change — and until then it cannot report a false red.

- [ ] **Step 1:** Write the workflow.
- [ ] **Step 2:** Validate the YAML parses.
- [ ] **Step 3:** Commit, push, open the PR.
- [ ] **Step 4:** Watch the PR's `build` check go green — that is the real
      verification that the Pages build is fixed.

## Verification

No Ruby, Bundler, or Jekyll is installed on this machine, so the build **cannot** be
reproduced locally — the authoritative evidence is the `build` job on the PR, which
runs the same `github-pages` gem path that failed. Local evidence is limited to:
`tests/check_jekyll_build.py` failing before the fix and passing after,
`tests/check_homepage.py` still passing, and the workflow YAML parsing.

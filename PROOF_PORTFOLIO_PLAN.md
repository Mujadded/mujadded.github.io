# Proof Portfolio + Weekly Publishing (Plan)

This repo is a static site. The homepage’s writing list lives in `index.html` itself — see “Blog roll” below before editing it.

## What we’re building

### 1) Proof portfolio (2–3 flagship case studies)
Each case study should be *interview/grant ready*:
- Problem
- Dataset reality (what was messy / constrained)
- Model choice (why YOLO/ViT/etc)
- Metrics (what you measured and why)
- Deployment constraints (latency, edge, memory, ops)
- Failures + lessons
- Reproducible demo code (synthetic or public mini-dataset)

### 2) Weekly publishing cadence
Weekly deliverable:
- 1 LinkedIn post **or**
- 1 short blog note (300–800 words)

Topics that compound for your niche:
- synthetic-to-real gaps
- dataset shift & robustness
- edge optimisation (Jetson/TensorRT/ONNX)
- inspection-specific evaluation
- failure modes

## Repo conventions (minimal changes)

### Blog roll (homepage)

- File: **`index.html`**, the `Notes and articles` list in `<section id="writing">`.
- Add one `<li class="post">` at the top (newest first). The list holds five
  entries; adding one pushes the oldest off the bottom.

**Not `js/blogPosts.js`.** That file, and `js/main.js`, are leftovers from the
pre-port site and nothing loads them. If an instruction anywhere sends you at
`js/blogPosts.js` for the feed, it is out of date — including an earlier version
of this document, which is what this note replaces.

Verify it yourself rather than taking this on faith, because it will go stale
too:

```
grep -o '<script[^>]*src="[^"]*"' index.html    # only js/home.js is loaded
```

The tell that the old instruction had already gone wrong: the 20 Aug 2026 post
appears in `index.html` and in `sitemap.xml`, and is absent from
`js/blogPosts.js`. Someone had been editing the live page and the dead file had
silently drifted behind.

**Template** (external posts get the source and an arrow in the meta line;
posts hosted here just say `mjalif.com`):

```html
<li class="post">
  <a class="post-title" href="posts/YYYY-MM-DD-slug.html">Title in sentence case</a>
  <p class="post-meta">20 Aug 2026 &middot; 8 min &middot; mjalif.com</p>
</li>
```

A new post hosted in this repo also needs an entry in `sitemap.xml`, and a
`sw.js` cache-version bump so returning visitors do not keep the old precached
homepage.

### Case studies
We’ll add:
- `case-studies/` (index + individual pages)
- `assets/diagrams/` (simple diagrams exported as SVG/PNG)
- Optional `code/` repo links for reproducible demos

## What I need from you to write the first case study
Pick ONE project (railway/inspection preferred) and answer these quickly:
1) What problem? (1 sentence)
2) Data: type + size + biggest mess (lighting, motion blur, occlusion, weather, labeling noise, imbalance)
3) Model(s) tried: what worked / didn’t
4) Best metrics achieved (even approximate)
5) Deployment target (Jetson? server? required FPS/latency)
6) One failure + one key lesson

Then I can produce:
- the written case study
- 1–2 simple diagrams (pipeline + deployment)
- a small reproducible “toy” demo repo (synthetic/public)

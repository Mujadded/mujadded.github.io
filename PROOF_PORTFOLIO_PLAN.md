# Proof Portfolio + Weekly Publishing (Plan)

This repo is a static site. The homepage pulls “Latest Blog Posts” from `js/blogPosts.js`.

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
- File: `js/blogPosts.js`
- Add one new object at the top each week (keep newest first).

**Template:**
```js
{
  title: "…",
  excerpt: "1–2 sentences",
  date: "YYYY-MM-DD",
  readTime: "X min read",
  category: "AI & Computer Vision",
  url: "https://…",
  image: "https://…" // optional
}
```

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

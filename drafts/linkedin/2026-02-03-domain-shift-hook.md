# LinkedIn Post Draft (Week 2) — Domain Shift in Inspection CV

**Hook (pick one):**
1) The #1 reason computer vision fails in the real world isn’t the model — it’s the data distribution.
2) If your detector is great on mAP but fails in rain/night/blur… you don’t have a model problem. You have a measurement problem.

---

**Post (copy/paste):**

Most CV systems fail for one boring reason: **domain shift**.

In outdoor/industrial inspection, the worst errors are almost always clustered in:
- small objects
- motion blur
- low light / harsh contrast
- occlusion
- rare classes (defects)

If you only track one overall metric (e.g., mAP), you can miss the cases that actually matter.

What I’ve found works in practice:
1) **Slice your evaluation** (day/night, rain/dry, blur/no blur, small-object subset)
2) Track **recall / false negatives** per slice
3) Use **targeted augmentations** (blur + low light), then re-measure on the same slices
4) Pick the final model based on **deployment constraints** (latency stability on Jetson, memory, thermals), not leaderboard scores

If you’re building inspection CV, I’m curious: what slice breaks your model the most?

#computervision #deeplearning #yolo #edgeai #mlops #datasetshift #industrialAI

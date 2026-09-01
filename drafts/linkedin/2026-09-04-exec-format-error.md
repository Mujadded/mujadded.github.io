# LinkedIn Post Draft — "Three broken pipelines, one stale image"

**Image:** `2026-09-04-arch-mismatch.svg` (self-authored diagram — manifest resolution vs. local cache hit. Structure, not data.)

---

**Post (copy/paste):**

Three scheduled CI workflows had been failing for days. Different jobs, different schedules, different purposes. Same error:

```
exec /bin/sh: exec format error
Process completed with exit code 255
```

The instinct is to debug three pipelines. The right move was to notice they had one thing in common.

The runner is **arm64**. Both container images they used resolved to **amd64**.

Two different causes, which is the part I found interesting:

**1. A stale cached image.** `alpine:latest` had been pulled as amd64 at some point and cached. Docker will happily reuse a local image *without checking its platform* — so every run started a binary the kernel couldn't execute. The workflows never reached a single line of their actual logic.

**2. An image with no arm64 build at all.** The other one simply doesn't exist for this architecture. It could never have worked here.

The fix for the second is obvious — use a multi-arch image.

The fix for the first is where I had to think. The tempting option is `--platform linux/arm64`. But that just *moves* the assumption: it hardcodes today's runner into the pipeline and breaks the moment anything runs elsewhere.

`--pull=always` was the better answer. It re-resolves the manifest for whatever host it lands on. **It doesn't depend on the cache being clean, and it doesn't depend on me knowing the architecture.**

That's the pattern I keep reaching for: prefer the guard whose correctness doesn't require someone to have done something correctly.

#devops #cicd #docker #arm64 #platformengineering

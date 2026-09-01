# LinkedIn Post Draft — "A guard that cannot execute is no guard"

**Image:** `2026-09-03-guard-shared-failure.svg` (self-authored architecture diagram — the guard and the thing it guards depending on the same broker. Structure, not data.)

---

**Post (copy/paste):**

We had a nice piece of defensive design. Uploads get queued for malware scanning; if a scan gets stuck, a periodic task sweeps anything that has been pending too long and rescues it.

I liked that guard for a specific reason: **it filters on state and age, with no knowledge of how the item got there.** It cannot miss a new creation path, because it never enumerates creation paths. Correctness that doesn't depend on someone having kept a list up to date is rare and worth protecting.

Then the message broker went down.

Scans stopped. And the sweep that rescues stuck scans — **it's a periodic task on the same broker.** It was down for exactly the same reason as the thing it exists to rescue.

The property I praised was real. It just never applied, because the guard couldn't run at all.

**A guard that cannot execute is not a weaker guard. It's no guard.**

The question I'd been asking about that code was *"what does this check?"* The question I hadn't asked was **"what does this depend on?"** Those have different answers, and only the second one tells you when your safety net is offline.

Worth auditing in your own stack: for each recovery mechanism, does it share infrastructure with the failure it recovers from? Retry logic in the service that crashed. Alerting that runs on the cluster it monitors. A dead-letter consumer on the queue that died.

#softwareengineering #reliability #distributedsystems #sre #architecture

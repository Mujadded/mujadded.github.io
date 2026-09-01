# LinkedIn Post Draft — "The guard I wrote to catch silent failures was itself silent"

**Image:** `2026-09-05-guard-verified-wrong-conditions.svg` (self-authored diagram — the two-layer failure: masked test, then masked fix. No data, no invented numbers.)

---

**Post (copy/paste):**

A monitoring workflow had been reporting green for weeks while measuring nothing. Three load-test steps, each printing "Test completed," zero real numbers, containers dead in under a second.

My first diagnosis was wrong, and it's worth being specific about how. I assumed the pipe's exit status was the formatter's — that a trailing `sed` succeeds on empty input, so the whole line reports success no matter what happened upstream. Checked closer, and that's not it: this shell runs with `pipefail` on, so a failure upstream does propagate correctly through the formatter. The real defect was a blanket `|| echo "fallback message"` at the very end — written once to smooth over one harmless case, now swallowing every failure indiscriminately. A container that never started looks identical to a benchmark that ran clean.

Fixed it: replace the fallback with an explicit check, fail the step loudly if no real measurement came back.

**Then the fix didn't work the first time either.**

Under the shell's actual flags (`set -e` plus `pipefail`), a failing pipe inside a variable assignment aborts the script immediately — before the line meant to print the error annotation ever runs. The guard against silent failure was, itself, silent. I'd verified it in a plain shell, without the flags the real job runs under, and it passed there.

**A guard you verified under different conditions than it runs in is not verified.**

The pattern, once we went looking, turned up dozens more times across other monitoring jobs in the same repo — the same one-liner fallback, copy-pasted for convenience, quietly promising nothing failed.

The generalization I'm taking from this: when the fix is for "this failed silently," test the fix in the exact shell, with the exact flags, that it will actually run under — because the class of bug you just found is precisely the class your own fix can reintroduce, if you verify it somewhere easier than where it lives.

Where has a passing check told you less than you thought it did?

#softwareengineering #cicd #reliability #devops #testing

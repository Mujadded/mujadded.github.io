# LinkedIn Post Draft — "It logged success and wrote nothing"

**Image:** `2026-09-02-silent-success.svg` (self-authored diagram — writer vs. independent reader. No data, no invented numbers.)

---

**Post (copy/paste):**

We found three export converters that reported "conversion completed" and produced no file.

Not a crash. Not a stack trace. A success log, a green path, and an empty directory.

The reason they survived so long is uncomfortable: **every check we had asked the writer whether it had written.**

- the function returned without raising → looked fine
- the log line said completed → looked fine
- the tests asserted the call succeeded → looked fine

None of that touches the filesystem.

What actually catches this class of bug is boring:

**Verify the output with a reader you did not write.**

Not `os.path.exists()`. Not a filesize check — a file that exists and cannot be parsed is the same defect wearing a hat. An *independent* reader:

- TFRecord → `tf.data.TFRecordDataset`
- HDF5 → `h5py`
- NumPy → `numpy.load`

If a third-party parser can open it, you produced that format. If it can't, you produced a file.

The generalisation I keep coming back to: **a test that asks the code under test whether it worked is not a test.** It's a mirror. You need something on the other side of the boundary that has no idea what you intended.

Where has a "success" log lied to you?

#computervision #softwareengineering #testing #mlops #dataengineering

#!/usr/bin/env python3
"""
Dataset shift & robustness: a method demo, not a reproduction of any
real project's results.

Every number this script prints, it generated itself, on data it also
generated itself. Nothing here is borrowed from a paper, a client project,
or private inspection data. See README.md for what that distinction means
and why it matters.

WHAT THIS SHOWS
A model trained only on "clean" images looks great on a clean test set and
then falls apart the moment the input distribution shifts a little (noise,
blur, a lighting change) -- the same class of problem covered in the site's
"Edge CV Under Domain Shift" post, here on synthetic shapes anyone can
regenerate instead of real inspection footage. Training WITH that shift
already present (as augmentation) recovers most of the accuracy. That's the
whole demo: measure the break, then show one standard, honest fix for it.

RUN
    pip install -r requirements.txt
    python demo.py

Runs on CPU in well under a minute. No download, no GPU, no dataset file:
the "dataset" is 32x32 shapes drawn with PIL from a fixed seed, so the
numbers you get are reproducible, not fetched.
"""
import random

import numpy as np
import torch
import torch.nn as nn
from PIL import Image, ImageDraw, ImageFilter

SEED = 0
IMG_SIZE = 32
CLASSES = ["circle", "square", "triangle", "cross"]
N_TRAIN = 3000
N_TEST = 600
EPOCHS = 5
BATCH_SIZE = 64
LR = 1e-3

# Shift severity applied to the "shifted" eval set, and (for the robust
# model only) sometimes applied during training too. Chosen to be visible
# by eye, not tuned to flatter the result.
NOISE_STD = 0.25
BLUR_RADIUS = 1.6
BRIGHTNESS_DELTA = 0.35
CONTRAST_SCALE = 0.55


def draw_shape(rng, label):
    """Render one class as a 32x32 grayscale PIL image, randomized position,
    size and (where it means anything) rotation. This is the entire "dataset"
    -- there is no file on disk anywhere else it could have come from."""
    img = Image.new("L", (IMG_SIZE, IMG_SIZE), color=0)
    draw = ImageDraw.Draw(img)
    cx = rng.uniform(12, 20)
    cy = rng.uniform(12, 20)
    r = rng.uniform(7, 11)
    fill = rng.randint(180, 255)

    if label == "circle":
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill)
    elif label == "square":
        angle = rng.uniform(0, 45)
        pts = _rotated_square(cx, cy, r, angle)
        draw.polygon(pts, fill=fill)
    elif label == "triangle":
        angle = rng.uniform(0, 120)
        pts = _rotated_ngon(cx, cy, r, 3, angle)
        draw.polygon(pts, fill=fill)
    else:  # cross
        w = r * 0.4
        draw.rectangle([cx - r, cy - w, cx + r, cy + w], fill=fill)
        draw.rectangle([cx - w, cy - r, cx + w, cy + r], fill=fill)

    return img


def _rotated_ngon(cx, cy, r, n, angle_deg):
    pts = []
    for i in range(n):
        a = np.deg2rad(angle_deg + i * 360 / n)
        pts.append((cx + r * np.sin(a), cy - r * np.cos(a)))
    return pts


def _rotated_square(cx, cy, r, angle_deg):
    return _rotated_ngon(cx, cy, r, 4, angle_deg)


def apply_shift(img, rng):
    """The three nuisance factors that break real-world CV in the field:
    sensor noise, blur (motion/defocus), and a lighting change. Applied here
    to synthetic shapes; the mechanism is what generalizes, not the pixels."""
    img = img.filter(ImageFilter.GaussianBlur(radius=BLUR_RADIUS))
    arr = np.asarray(img, dtype=np.float32) / 255.0
    arr = arr * CONTRAST_SCALE + BRIGHTNESS_DELTA
    arr = arr + rng.normal(0, NOISE_STD, size=arr.shape).astype(np.float32)
    return np.clip(arr, 0.0, 1.0)


def make_dataset(n, py_rng, np_rng, shifted, augment_shift_prob=0.0):
    """Build n (image, label) pairs. shifted=True draws from the shifted
    distribution (the held-out "domain-shift" test set). augment_shift_prob
    randomly shifts a fraction of TRAINING images -- that's the "robust"
    model's only difference from the baseline: it has seen the shift before."""
    xs = np.empty((n, 1, IMG_SIZE, IMG_SIZE), dtype=np.float32)
    ys = np.empty((n,), dtype=np.int64)
    for i in range(n):
        label_idx = i % len(CLASSES)
        img = draw_shape(py_rng, CLASSES[label_idx])
        if shifted or (augment_shift_prob and np_rng.random() < augment_shift_prob):
            arr = apply_shift(img, np_rng)
        else:
            arr = np.asarray(img, dtype=np.float32) / 255.0
        xs[i, 0] = arr
        ys[i] = label_idx
    order = np_rng.permutation(n)
    return torch.from_numpy(xs[order]), torch.from_numpy(ys[order])


class TinyCNN(nn.Module):
    def __init__(self, n_classes):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 8, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(8, 16, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
        )
        self.classifier = nn.Linear(16 * (IMG_SIZE // 4) ** 2, n_classes)

    def forward(self, x):
        x = self.features(x)
        return self.classifier(x.flatten(1))


def train(model, x, y, epochs=EPOCHS):
    opt = torch.optim.Adam(model.parameters(), lr=LR)
    loss_fn = nn.CrossEntropyLoss()
    n = x.shape[0]
    model.train()
    for epoch in range(epochs):
        perm = torch.randperm(n)
        total_loss = 0.0
        for i in range(0, n, BATCH_SIZE):
            idx = perm[i:i + BATCH_SIZE]
            opt.zero_grad()
            out = model(x[idx])
            loss = loss_fn(out, y[idx])
            loss.backward()
            opt.step()
            total_loss += loss.item() * len(idx)
        print(f"  epoch {epoch + 1}/{epochs}  loss {total_loss / n:.4f}")


@torch.no_grad()
def accuracy(model, x, y):
    model.eval()
    preds = model(x).argmax(1)
    return (preds == y).float().mean().item()


def main():
    torch.manual_seed(SEED)
    py_rng = random.Random(SEED)
    np_rng = np.random.default_rng(SEED)

    print("Generating synthetic shapes dataset (clean train, clean test, shifted test)...")
    x_train, y_train = make_dataset(N_TRAIN, py_rng, np_rng, shifted=False)
    x_test_clean, y_test_clean = make_dataset(N_TEST, py_rng, np_rng, shifted=False)
    x_test_shift, y_test_shift = make_dataset(N_TEST, py_rng, np_rng, shifted=True)

    print("\n[1/2] Training BASELINE model (clean data only)...")
    baseline = TinyCNN(len(CLASSES))
    train(baseline, x_train, y_train)
    acc_base_clean = accuracy(baseline, x_test_clean, y_test_clean)
    acc_base_shift = accuracy(baseline, x_test_shift, y_test_shift)

    print("\n[2/2] Training ROBUST model (50% of training images shifted)...")
    x_train_aug, y_train_aug = make_dataset(
        N_TRAIN, py_rng, np_rng, shifted=False, augment_shift_prob=0.5
    )
    robust = TinyCNN(len(CLASSES))
    train(robust, x_train_aug, y_train_aug)
    acc_robust_clean = accuracy(robust, x_test_clean, y_test_clean)
    acc_robust_shift = accuracy(robust, x_test_shift, y_test_shift)

    print("\n" + "=" * 58)
    print(f"{'model':<28}{'clean test':>13}{'shifted test':>15}")
    print("-" * 58)
    print(f"{'baseline (clean-only train)':<28}{acc_base_clean:>13.1%}{acc_base_shift:>15.1%}")
    print(f"{'robust (shift-augmented)':<28}{acc_robust_clean:>13.1%}{acc_robust_shift:>15.1%}")
    print("=" * 58)
    print(
        "\nThe gap between the two 'shifted test' numbers is what training-time "
        "exposure to the shift buys you. Re-run with different SEED/NOISE_STD/\n"
        "BLUR_RADIUS values at the top of this file to see how sensitive that "
        "gap is to how severe the shift actually is -- it is not a fixed law."
    )


if __name__ == "__main__":
    main()

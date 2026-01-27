// js/blogPosts.js
// This file is meant to be updated regularly (e.g., weekly) with new posts.
// main.js reads it via `window.blogPosts`.
//
// Shape:
// {
//   title, excerpt, date (YYYY-MM-DD), readTime, category, url,
//   pinned?: boolean, image?: string
// }

window.blogPosts = [
  {
    title: "Edge CV Under Domain Shift: What Actually Breaks (and how to measure it)",
    excerpt: "A field-focused guide to evaluation slices, augmentation, and Jetson deployment trade-offs for inspection CV.",
    date: "2026-01-27",
    readTime: "7 min read",
    category: "AI & Computer Vision",
    url: "posts/2026-01-27-edge-cv-domain-shift.html",
    pinned: true
  },
  {
    title: "Transitioning from Rails to Django: A Comprehensive Guide for Rails Developers",
    excerpt: "A practical comparison of Rails vs Django, with a migration mindset for engineers.",
    date: "2024-08-21",
    readTime: "12 min read",
    category: "Web Development",
    url: "https://blog.mjalif.com/transitioning-from-rails-to-django-a-comprehensive-guide-for-rails-developers-9829aaf13cdd",
    image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*6HHIWgA84Es2FptaQFhDbA.png"
  },
  {
    title: "Setting Up Pose-detection AI with Raspberry Pi 4 + Coral USB Accelerator",
    excerpt: "Deploying pose detection on edge hardware; lessons on latency, throughput, and practical setup.",
    date: "2023-11-09",
    readTime: "15 min read",
    category: "AI & Computer Vision",
    url: "https://blog.mjalif.com/setting-up-pose-detection-ai-with-raspberry-pi-4-coral-usb-accelerator-b29a38d5d780",
    image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*tfIEaYh49oWd0ATSdepL6Q.png"
  },
  {
    title: "Why Regularization in Loss Function and How It Helps",
    excerpt: "Why regularization matters, how it behaves inside the loss, and how it reduces overfitting in practice.",
    date: "2023-02-06",
    readTime: "8 min read",
    category: "Machine Learning",
    url: "https://blog.mjalif.com/regularization-in-machine-learning-and-how-it-helps-fc3e78227ba9",
    image: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*C_hTwT5GSNuLnj2h"
  },
  {
    title: "Loss Functions and What It Does Behind the Screen",
    excerpt: "A clear explanation of what loss functions are really doing during training.",
    date: "2023-02-04",
    readTime: "10 min read",
    category: "Machine Learning",
    url: "https://blog.mjalif.com/loss-functions-and-what-it-does-behind-the-screen-9882ecbcdc66",
    image: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*dnx2PKuTTQCGtlsp"
  }
];

// Blog page functionality
// Import blog data from main.js (same data)
const blogData = [{
        title: "Transitioning from Rails to Django: A Comprehensive Guide for Rails Developers",
        excerpt: "As a Rails developer with years of experience, you might consider expanding your skill set by learning Django, a popular Python-based web framework. This comprehensive guide will help you understand the key differences and similarities between Rails and Django.",
        date: "2024-08-21",
        readTime: "12 min read",
        category: "Web Development",
        url: "https://blog.mjalif.com",
        pinned: true,
        tags: ["Django", "Rails", "Web Development", "Python", "Ruby"],
        image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*6HHIWgA84Es2FptaQFhDbA.png"
    },
    {
        title: "Setting Up Pose-detection AI with Raspberry Pi 4 + Coral USB Accelerator",
        excerpt: "In this blog post, we will explore how to set up a pose-detection AI system using a Raspberry Pi 4 and a Coral USB Accelerator. Learn how to deploy machine learning models on edge devices for real-time pose detection.",
        date: "2023-11-09",
        readTime: "15 min read",
        category: "AI & Computer Vision",
        url: "https://blog.mjalif.com",
        tags: ["Computer Vision", "Raspberry Pi", "AI", "Edge Computing", "Pose Detection"],
        image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*tfIEaYh49oWd0ATSdepL6Q.png"
    },
    {
        title: "Why Regularization in Loss Function and How It Helps",
        excerpt: "Whenever we run a simple machine learning model like linear classification, we can determine the measure of unhappiness through the loss function. But what happens when we add regularization? Let's explore why regularization is crucial and how it helps prevent overfitting.",
        date: "2023-02-06",
        readTime: "8 min read",
        category: "Machine Learning",
        url: "https://blog.mjalif.com",
        tags: ["Machine Learning", "Regularization", "Loss Functions", "Overfitting"],
        image: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*C_hTwT5GSNuLnj2h"
    },
    {
        title: "Loss Functions and What It Does Behind the Screen",
        excerpt: "What is the Loss function? Understanding the mathematical foundation behind machine learning model training and how loss functions guide the learning process to optimize model performance.",
        date: "2023-02-04",
        readTime: "10 min read",
        category: "Machine Learning",
        url: "https://blog.mjalif.com",
        tags: ["Machine Learning", "Loss Functions", "Deep Learning", "Optimization"],
        image: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*dnx2PKuTTQCGtlsp"
    }
];

// State management
let currentFilter = 'all';
let displayedPosts = 4; // Start with showing all posts
const postsPerLoad = 4;

// DOM Elements
const blogGrid = document.getElementById('blog-posts-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const loadMoreButton = document.getElementById('load-more');
const newsletterForm = document.getElementById('newsletter-form');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeBlogPage();
});

function initializeBlogPage() {
    populateBlogPosts();
    initializeFilters();
    initializeNewsletterForm();
    updateBlogStats();
}

function populateBlogPosts(filter = 'all', limit = null) {
    if (!blogGrid) return;

    let filteredPosts = blogData;

    // Apply filter
    if (filter !== 'all') {
        filteredPosts = blogData.filter(post => {
            const categorySlug = post.category.toLowerCase().replace(/[^a-z0-9]/g, '-');
            return categorySlug.includes(filter) || post.tags.some(tag =>
                tag.toLowerCase().replace(/[^a-z0-9]/g, '-').includes(filter)
            );
        });
    }

    // Apply limit
    const postsToShow = limit ? filteredPosts.slice(0, limit) : filteredPosts;

    if (postsToShow.length === 0) {
        blogGrid.innerHTML = `
            <div class="no-posts-message">
                <i class="fas fa-search"></i>
                <h3>No posts found</h3>
                <p>Try selecting a different category filter.</p>
            </div>
        `;
        if (loadMoreButton) loadMoreButton.style.display = 'none';
        return;
    }

    blogGrid.innerHTML = postsToShow.map((post, index) => `
        <article class="blog-card fade-in-up" style="animation-delay: ${index * 0.1}s" onclick="window.open('${post.url}', '_blank')" role="button" tabindex="0">
            <div class="blog-image" ${post.image ? `style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${post.image}'); background-size: cover; background-position: center;"` : ''}>
                ${post.pinned ? '<div class="blog-badge">Pinned</div>' : ''}
                <div class="blog-category">${post.category}</div>
            </div>
            <div class="blog-content">
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-meta">
                    <span class="blog-date">${formatDate(post.date)}</span>
                    <span class="blog-read-time">${post.readTime}</span>
                </div>
                <div class="blog-tags">
                    ${post.tags.slice(0, 3).map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                </div>
                <div class="blog-external-link">
                    <i class="fas fa-external-link-alt"></i> Read on My Blog
                </div>
            </div>
        </article>
    `).join('');

    // Add keyboard support for blog cards
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // Show/hide load more button
    if (loadMoreButton) {
        loadMoreButton.style.display = filteredPosts.length > postsToShow.length ? 'block' : 'none';
    }
}

function initializeFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Apply filter
            currentFilter = button.dataset.filter;
            displayedPosts = postsPerLoad;
            populateBlogPosts(currentFilter, displayedPosts);

            // Add haptic feedback if available
            if (window.hapticFeedback) {
                window.hapticFeedback.tap();
            }
        });
    });

    // Load more functionality
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', () => {
            displayedPosts += postsPerLoad;
            populateBlogPosts(currentFilter, displayedPosts);

            if (window.hapticFeedback) {
                window.hapticFeedback.success();
            }
        });
    }
}

function initializeNewsletterForm() {
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        // Simulate form submission
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;

        setTimeout(() => {
            // Reset form
            newsletterForm.reset();
            submitButton.textContent = 'Subscribed!';
            submitButton.style.background = '#8B5CF6';

            // Show success message
            showNotification('Successfully subscribed to the newsletter!', 'success');

            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 3000);
        }, 1500);
    });
}

function updateBlogStats() {
    // Update the stats in the header
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 2) {
        statNumbers[0].textContent = `${blogData.length}+`;
        // Calculate total estimated readers (rough estimate based on Medium views)
        const totalViews = blogData.reduce((sum, post) => {
            // Estimate views based on read time and recency
            const monthsOld = (new Date() - new Date(post.date)) / (1000 * 60 * 60 * 24 * 30);
            const viewEstimate = Math.max(100, 2000 - (monthsOld * 50));
            return sum + viewEstimate;
        }, 0);
        statNumbers[1].textContent = `${Math.floor(totalViews / 1000)}K+`;
    }
}

// Utility functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification styles if not already present
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--secondary-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: 15px 20px;
            box-shadow: 0 10px 30px var(--shadow-color);
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            max-width: 350px;
        }

        .notification.show {
            transform: translateX(0);
            opacity: 1;
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--text-primary);
        }

        .notification-success {
            border-left: 4px solid #8B5CF6;
        }

        .notification-error {
            border-left: 4px solid #ef4444;
        }

        .notification i {
            color: #8B5CF6;
        }

        .notification-error i {
            color: #ef4444;
        }

        .no-posts-message {
            grid-column: 1 / -1;
            text-align: center;
            padding: 60px 20px;
            color: var(--text-secondary);
        }

        .no-posts-message i {
            font-size: 3rem;
            color: var(--text-muted);
            margin-bottom: 20px;
        }

        .no-posts-message h3 {
            color: var(--text-primary);
            margin-bottom: 10px;
        }

        .blog-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 15px;
        }

        .blog-tag {
            background: rgba(139, 92, 246, 0.1);
            color: var(--accent-primary);
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
                transform: translateY(-100px);
            }

            .notification.show {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}
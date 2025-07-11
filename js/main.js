// Main JavaScript for MJ Alif Personal Website

// Data Objects
const experienceData = [{
        title: "Research Assistant – Computer Vision",
        company: "University Of Huddersfield, United Kingdom",
        duration: "2024-05 - Current",
        description: "Leading computer vision research and AI model development",
        achievements: [
            "Utilised Stable Diffusion and prompt engineering to synthetically generate railway hazard scenarios",
            "Improved detection coverage of underrepresented hazard classes by 18%",
            "Co-engineered data pipelines for evaluating and fine-tuning vision-language models",
            "Deployed YOLOv5 through YOLOv10 variants in transportation-focused real-time systems"
        ]
    },
    {
        title: "AI Engineer - LLM System",
        company: "University Of Huddersfield, United Kingdom",
        duration: "2024-05 - 2024-08",
        description: "Designing and implementing sophisticated multi-agent chatbot systems",
        achievements: [
            "Led the design and implementation of a sophisticated multi-agent chatbot system utilising LangChain and LangGraph",
            "Built contextual prompt modules for LLMs (e.g., GPT-4), engineering high-quality outputs",
            "Aligned stakeholder feedback with model safety and accuracy benchmarks",
            "Initiated evaluation workflows for incremental fine-tuning via user-in-the-loop"
        ]
    },
    {
        title: "AI Engineer - Computer Vision",
        company: "University Of Huddersfield, United Kingdom",
        duration: "2023-10 - 2024-04",
        description: "Building advanced computer vision solutions for industrial applications",
        achievements: [
            "Built and maintained object detection software aligned with compliance needs",
            "Engineered advanced software for image analysis and detection of pallet racking",
            "Enhanced image-based task efficiency by 5%, resulting in a rise from 92% to 97% efficiency"
        ]
    },
    {
        title: "Principal Software Engineer",
        company: "Welltravel, United Kingdom (Remote)",
        duration: "2022-09 - 2023-09",
        description: "Leading technical optimization and team management",
        achievements: [
            "Optimised web application performance by 40% through codebase refactoring",
            "Led a cross-functional team of engineers and designers",
            "Improved project completion time by 15% through clear communication and agile project management"
        ]
    },
    {
        title: "Technical Lead / Acting CTO",
        company: "Welltravel, Bangladesh",
        duration: "2020-07 - 2022-09",
        description: "Directing comprehensive technology roadmap and architecture",
        achievements: [
            "Directed a comprehensive technology roadmap across three teams with 20 members each",
            "Managed company-level architecture, platform and data configuration processes"
        ]
    },
    {
        title: "Senior Software Engineer",
        company: "Welltravel, Bangladesh",
        duration: "2017-11 - 2020-07",
        description: "Mentoring teams and delivering high-performance solutions",
        achievements: [
            "Successfully mentored and onboarded 15 engineers in Ruby on Rails",
            "Improved team performance and delivery by 25%"
        ]
    },
    {
        title: "Software Engineer",
        company: "MyCash Online, Malaysia",
        duration: "2015-08 - 2016-12",
        description: "Coordinating with engineering teams to evaluate and improve software and hardware interfaces",
        achievements: [
            "Worked with software development and testing team members to design robust solutions meeting client requirements for functionality, scalability, and performance",
            "Reviewed project specifications and designed technology solutions that met or exceeded performance expectations",
            "Coordinated efficient large-scale software deployments",
            "Enhanced software and hardware interface integration"
        ]
    },
    {
        title: "Junior Software Engineer",
        company: "PixeLizard, Malaysia",
        duration: "2014-06 - 2015-07",
        description: "Learning fundamentals through hands-on projects and backend development",
        achievements: [
            "Developed backend systems and APIs for various client projects",
            "Created and maintained websites using modern web technologies",
            "Gained experience with WordPress development and customization",
            "Solved diverse technical issues while building foundational engineering skills"
        ]
    }
];

const skillsData = [{
        category: "AI & Machine Learning Tools",
        icon: "fas fa-brain",
        skills: [
            "LLM Development: GPT-4, OpenAI API, LangChain, LangGraph",
            "Prompt Engineering & RAG",
            "Multimodal AI & Vision-Language Alignment",
            "PyTorch, TensorFlow, Keras, Scikit-learn",
            "Hugging Face Transformers",
            "LangSmith, Weights & Biases"
        ]
    },
    {
        category: "Computer Vision",
        icon: "fas fa-eye",
        skills: [
            "YOLO-based Detection (YOLOv5 to YOLOv10)",
            "Real-time Object Detection Systems",
            "OpenCV & Custom CNN Architectures",
            "Stable Diffusion & Generative Models",
            "Vision-specific Augmentation Pipelines",
            "Vehicle & Hazard Detection Systems"
        ]
    },
    {
        category: "Programming & Data",
        icon: "fas fa-code",
        skills: [
            "Python, Ruby, JavaScript, PHP, Java, Bash",
            "Pandas, NumPy, Matplotlib, Seaborn",
            "Jupyter Notebooks & Data Science",
            "Algorithm Design & Optimization",
            "Database Design & Query Optimization"
        ]
    },
    {
        category: "Web & Systems Engineering",
        icon: "fas fa-server",
        skills: [
            "Ruby on Rails, Django, Laravel",
            "React.js, JavaScript (ES6+)",
            "REST APIs, GraphQL",
            "Tailwind CSS, Bootstrap",
            "Git, Docker, Linux CLI"
        ]
    },
    {
        category: "Leadership & Collaboration",
        icon: "fas fa-users",
        skills: [
            "Cross-functional Sprint Planning",
            "Research-to-Product Pipeline Coordination",
            "Agile Methodologies",
            "Cross-timezone Team Collaboration",
            "Stakeholder Feedback Integration",
            "Release Cycles & Feature Tracking"
        ]
    }
];

const publicationsData = [{
        title: "YOLOv1 to YOLOv10: A comprehensive review of YOLO variants and their application in the agricultural domain",
        journal: "arXiv preprint arXiv:2406.10139",
        date: "2024",
        type: "Research Paper",
        citations: "111 citations"
    },
    {
        title: "Isolated Bangla handwritten character recognition with convolutional neural network",
        journal: "2017 20th International Conference of Computer and Information Technology",
        date: "2017",
        type: "Conference Paper",
        citations: "104 citations"
    },
    {
        title: "YOLOv11 for vehicle detection: Advancements, performance, and applications in intelligent transportation systems",
        journal: "arXiv preprint arXiv:2410.22898",
        date: "2024",
        type: "Research Paper",
        citations: "38 citations"
    },
    {
        title: "Comparative Analysis of YOLOv8 and YOLOv10 in Vehicle Detection: Performance Metrics and Model Efficacy",
        journal: "Vehicles 6 (3), 1364-1382",
        date: "2024",
        type: "Journal Article",
        citations: "26 citations"
    },
    {
        title: "Lightweight convolutional network with integrated attention mechanism for missing bolt detection in railways",
        journal: "Metrology 4 (2), 254-278",
        date: "2024",
        type: "Journal Article",
        citations: "12 citations"
    },
    {
        title: "BoltVision: A comparative analysis of CNN, CCT, and ViT in achieving high accuracy for missing bolt classification in train components",
        journal: "Machines 12 (2), 93",
        date: "2024",
        type: "Journal Article",
        citations: "11 citations"
    },
    {
        title: "Attention-Based Automated Pallet Racking Damage Detection",
        journal: "Research Publication",
        date: "2024",
        type: "Research Paper",
        citations: "9 citations"
    },
    {
        title: "YOLOv12: A breakdown of the key architectural features",
        journal: "arXiv preprint arXiv:2502.14740",
        date: "2025",
        type: "Research Paper",
        citations: "8 citations"
    },
    {
        title: "State-of-the-Art Bangla Handwritten Character Recognition Using a Modified ResNet-34 Architecture",
        journal: "International Journal of Innovative Science and Research Technology 9 (1)",
        date: "2024",
        type: "Journal Article",
        citations: "8 citations"
    },
    {
        title: "Enhancing diabetic retinopathy diagnosis: A lightweight CNN architecture for efficient exudate detection in retinal fundus images",
        journal: "arXiv preprint arXiv:2408.06784",
        date: "2024",
        type: "Research Paper",
        citations: "6 citations"
    },
    {
        title: "Enhancing Construction Site Safety: A Lightweight Convolutional Network for Effective Helmet Detection",
        journal: "arXiv preprint arXiv:2409.12669",
        date: "2024",
        type: "Research Paper",
        citations: "2 citations"
    }
];

const blogData = [{
        title: "Transitioning from Rails to Django: A Comprehensive Guide for Rails Developers",
        excerpt: "As a Rails developer with years of experience, you might consider expanding your skill set by learning Django, a popular Python-based web framework. This comprehensive guide will help you understand the key differences and similarities between Rails and Django.",
        date: "2024-08-21",
        readTime: "12 min read",
        category: "Web Development",
        url: "https://blog.mjalif.com/transitioning-from-rails-to-django-a-comprehensive-guide-for-rails-developers-9829aaf13cdd",
        pinned: true,
        image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*6HHIWgA84Es2FptaQFhDbA.png"
    },
    {
        title: "Setting Up Pose-detection AI with Raspberry Pi 4 + Coral USB Accelerator",
        excerpt: "In this blog post, we will explore how to set up a pose-detection AI system using a Raspberry Pi 4 and a Coral USB Accelerator. Learn how to deploy machine learning models on edge devices for real-time pose detection.",
        date: "2023-11-09",
        readTime: "15 min read",
        category: "AI & Computer Vision",
        url: "https://blog.mjalif.com/setting-up-pose-detection-ai-with-raspberry-pi-4-coral-usb-accelerator-b29a38d5d780",
        image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*tfIEaYh49oWd0ATSdepL6Q.png"
    },
    {
        title: "Why Regularization in Loss Function and How It Helps",
        excerpt: "Whenever we run a simple machine learning model like linear classification, we can determine the measure of unhappiness through the loss function. But what happens when we add regularization? Let's explore why regularization is crucial and how it helps prevent overfitting.",
        date: "2023-02-06",
        readTime: "8 min read",
        category: "Machine Learning",
        url: "https://blog.mjalif.com/regularization-in-machine-learning-and-how-it-helps-fc3e78227ba9",
        image: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*C_hTwT5GSNuLnj2h"
    },
    {
        title: "Loss Functions and What It Does Behind the Screen",
        excerpt: "What is the Loss function? Understanding the mathematical foundation behind machine learning model training and how loss functions guide the learning process to optimize model performance.",
        date: "2023-02-04",
        readTime: "10 min read",
        category: "Machine Learning",
        url: "https://blog.mjalif.com/loss-functions-and-what-it-does-behind-the-screen-9882ecbcdc66",
        image: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*dnx2PKuTTQCGtlsp"
    }
];

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navOverlay = document.getElementById('nav-overlay');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeThemeToggle();
    initializeTypewriter();
    populateExperience();
    populateSkills();
    populatePublications();
    populateBlog();
    initializeScrollAnimations();
    initializeContactForm();
    initializeParticleEffects();

    // Handle window resize for responsive elements
    window.addEventListener('resize', debounce(() => {
        handlePublicationsResize();
    }, 250));
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.contains('active');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        if (navOverlay) navOverlay.classList.toggle('active');

        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'auto' : 'hidden';
    });

    // Close mobile menu when overlay is clicked
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close mobile menu function
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Active link highlighting and smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        updateNavbarBackground();
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = ['hero', 'about', 'experience', 'skills', 'achievements', 'publications', 'blog', 'contact'];
    const scrollPosition = window.scrollY + 150;

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const navLink = document.querySelector(`a[href="#${sectionId}"]`);

        if (section && navLink) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

// Theme Toggle Functionality
function initializeThemeToggle() {
    // Check for saved theme preference or detect system preference
    let currentTheme = localStorage.getItem('theme');

    if (!currentTheme) {
        // No saved preference, check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme = 'dark';
        } else {
            currentTheme = 'light'; // Default to light mode
        }
    }

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    updateNavbarBackground(); // Set initial navbar background

    // Listen for system theme changes (when no manual preference is set)
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                const systemTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', systemTheme);
                updateThemeIcon(systemTheme);
                updateNavbarBackground();
            }
        });
    }

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            updateNavbarBackground(); // Update navbar background immediately
        });
    }
}

function updateThemeIcon(theme) {
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }
}

function updateNavbarBackground() {
    if (!navbar) return;

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const isScrolled = window.scrollY > 100;

    if (currentTheme === 'dark') {
        navbar.style.background = isScrolled ? 'rgba(10, 10, 10, 0.98)' : 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)';
    }
}

// Typewriter effect
function initializeTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.getAttribute('data-text');
        typewriterElement.textContent = '';

        let index = 0;

        function typeCharacter() {
            if (index < text.length) {
                typewriterElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeCharacter, 100);
            }
        }

        setTimeout(typeCharacter, 1000);
    }
}

// Populate experience tabs
function populateExperience() {
    const tabsContainer = document.querySelector('.experience-tabs');
    const contentContainer = document.querySelector('.experience-content');

    if (!tabsContainer || !contentContainer) return;

    // Create tabs
    tabsContainer.innerHTML = experienceData.map((exp, index) => `
        <button class="experience-tab ${index === 0 ? 'active' : ''}" data-tab="${index}">
            <div class="tab-title">${exp.title}</div>
            <div class="tab-duration">${exp.duration.split(' - ')[0]} - ${exp.duration.split(' - ')[1]}</div>
        </button>
    `).join('');

    // Create content
    contentContainer.innerHTML = experienceData.map((exp, index) => `
        <div class="experience-panel ${index === 0 ? 'active' : ''}" data-panel="${index}">
            <div class="experience-header">
                <h3 class="job-title">${exp.title}</h3>
                <h4 class="company">${exp.company}</h4>
                <p class="duration">${exp.duration}</p>
            </div>
            <p class="job-description">${exp.description}</p>
            <div class="job-achievements">
                <h5>Key Achievements:</h5>
                <ul>
                    ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    // Add tab click handlers
    const tabs = document.querySelectorAll('.experience-tab');
    const panels = document.querySelectorAll('.experience-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabIndex = tab.dataset.tab;
            
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            const activePanel = document.querySelector(`[data-panel="${tabIndex}"]`);
            activePanel.classList.add('active');
            
            // Auto-scroll to content on mobile/tablet for better UX
            if (window.innerWidth <= 1024) {
                setTimeout(() => {
                    const experienceContent = document.querySelector('.experience-content');
                    if (experienceContent) {
                        const yOffset = -80; // Account for navbar height
                        const elementPosition = experienceContent.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset + yOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 100); // Small delay to ensure content is visible before scrolling
            }
        });
    });
    
    // Add swipe gesture support for mobile
    if (window.innerWidth <= 768) {
        addSwipeGestures();
    }
}

// Swipe gesture support for experience tabs
function addSwipeGestures() {
    const experienceContent = document.querySelector('.experience-content');
    if (!experienceContent) return;
    
    let startX = 0;
    let startY = 0;
    let isSwipe = false;
    
    experienceContent.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwipe = false;
    });
    
    experienceContent.addEventListener('touchmove', (e) => {
        if (!startX || !startY) return;
        
        const diffX = Math.abs(e.touches[0].clientX - startX);
        const diffY = Math.abs(e.touches[0].clientY - startY);
        
        // Determine if this is a horizontal swipe
        if (diffX > diffY && diffX > 50) {
            isSwipe = true;
            e.preventDefault(); // Prevent scrolling
        }
    });
    
    experienceContent.addEventListener('touchend', (e) => {
        if (!isSwipe || !startX) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        const activeTab = document.querySelector('.experience-tab.active');
        const allTabs = document.querySelectorAll('.experience-tab');
        const currentIndex = Array.from(allTabs).indexOf(activeTab);
        
        // Swipe left - next tab
        if (diffX > 50 && currentIndex < allTabs.length - 1) {
            allTabs[currentIndex + 1].click();
        }
        // Swipe right - previous tab
        else if (diffX < -50 && currentIndex > 0) {
            allTabs[currentIndex - 1].click();
        }
        
        // Reset values
        startX = 0;
        startY = 0;
        isSwipe = false;
    });
}

// Populate skills section
function populateSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;

    skillsGrid.innerHTML = skillsData.map((skillCategory, index) => `
        <div class="skill-category fade-in-up" style="animation-delay: ${index * 0.1}s">
            <h3><i class="${skillCategory.icon}"></i> ${skillCategory.category}</h3>
            <ul class="skill-list">
                ${skillCategory.skills.map(skill => `<li class="skill-item">${skill}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Populate publications section
function populatePublications() {
    const publicationsGrid = document.querySelector('.publications-grid');
    if (!publicationsGrid) return;

    // Create publications HTML
    const publicationsHTML = publicationsData.map((pub, index) => `
        <div class="publication-card fade-in-up" style="animation-delay: ${index * 0.1}s">
            <h3 class="publication-title">${pub.title}</h3>
            <p class="publication-journal">${pub.journal}</p>
            <p class="publication-date">${pub.date} • ${pub.type}${pub.citations ? ' • <span class="citation-count">' + pub.citations + '</span>' : ''}</p>
        </div>
    `).join('');

    // Only add show more button on mobile/tablet screens
    const isMobileTablet = window.innerWidth <= 768;
    const showMoreButton = isMobileTablet ? `
        <div class="publications-show-more">
            <button class="btn show-more-btn" onclick="togglePublications()">
                <i class="fas fa-chevron-down"></i> Show More Publications
            </button>
        </div>
    ` : '';

    publicationsGrid.innerHTML = publicationsHTML + showMoreButton;
    
    // Handle window resize to show/hide button appropriately
    handlePublicationsResize();
}

// Handle window resize for publications
function handlePublicationsResize() {
    const showMoreContainer = document.querySelector('.publications-show-more');
    const isMobileTablet = window.innerWidth <= 768;
    const allCards = document.querySelectorAll('.publication-card');
    const hiddenCards = Array.from(allCards).slice(4); // Cards after the 4th one
    
    if (!isMobileTablet && showMoreContainer) {
        // Hide the button on larger screens
        showMoreContainer.style.display = 'none';
        // Show all publications
        hiddenCards.forEach(card => {
            card.style.display = 'block';
        });
    } else if (isMobileTablet && showMoreContainer) {
        // Show the button on mobile/tablet
        showMoreContainer.style.display = 'block';
        // Reset hidden publications if needed
        const isExpanded = document.querySelector('.show-more-btn')?.classList.contains('show-less');
        if (!isExpanded) {
            hiddenCards.forEach(card => {
                card.style.display = 'none';
            });
        }
    }
    
    // If no show more container exists on mobile, initialize properly
    if (isMobileTablet && !showMoreContainer) {
        hiddenCards.forEach(card => {
            card.style.display = 'none';
        });
    }
}

// Toggle publications visibility on mobile
function togglePublications() {
    const allCards = document.querySelectorAll('.publication-card');
    const hiddenCards = Array.from(allCards).slice(4); // Cards after the 4th one
    const showMoreBtn = document.querySelector('.publications-show-more .btn');
    const isExpanded = showMoreBtn.classList.contains('show-less');

    hiddenCards.forEach(card => {
        if (isExpanded) {
            card.style.display = 'none';
        } else {
            card.style.display = 'block';
        }
    });

    if (isExpanded) {
        showMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Show More Publications';
        showMoreBtn.classList.remove('show-less');
        // Smooth scroll to publications section top when collapsing
        setTimeout(() => {
            document.getElementById('publications').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    } else {
        showMoreBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less Publications';
        showMoreBtn.classList.add('show-less');
    }
}

// Populate blog section
function populateBlog() {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;

    blogGrid.innerHTML = blogData.map((post, index) => `
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
                <div class="blog-external-link">
                    <i class="fas fa-external-link-alt"></i> Read Article
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
}

// Format date utility
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Staggered animations for child elements
                const staggerItems = entry.target.querySelectorAll('.stagger-item');
                staggerItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Counter animation for stats
    animateCounters();
}

// Animate counter numbers
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    const numericValue = parseInt(target.replace(/[^\d]/g, ''));
    
    let current = 0;
    const increment = numericValue / 60; // 60 frames for smooth animation
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (isPlus) displayValue += '+';
        if (isPercentage) displayValue += '%';
        
        element.textContent = displayValue;
    }, 16); // ~60fps
}

// Contact form handling
function initializeContactForm() {
    if (!contactForm) return;

    // Check if using Formspree (has action attribute)
    const isFormspree = contactForm.hasAttribute('action') && contactForm.getAttribute('action').includes('formspree');

    contactForm.addEventListener('submit', async (e) => {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div> Sending...';
        submitButton.disabled = true;
        
        if (isFormspree) {
            // Let Formspree handle the submission naturally
            // Don't prevent default - let form submit normally
            showNotification('Sending message...', 'info');
            return; // Form will submit and redirect/reload
        } else {
            // Prevent default for demo/fallback
            e.preventDefault();
            
            try {
                // Simulate form submission (for demo purposes)
                await simulateFormSubmission(new FormData(contactForm));
                
                // Success state
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitButton.style.background = '#8B5CF6';
                
                // Reset form
                contactForm.reset();
                
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
            } catch (error) {
                // Error state
                submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send';
                submitButton.style.background = '#ef4444';
                
                showNotification('Failed to send message. Please try again.', 'error');
            }
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 3000);
        }
    });
}

// Simulate form submission
function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate success (90% chance)
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Network error'));
            }
        }, 2000);
    });
}

// Show notification
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

// Particle effects
function initializeParticleEffects() {
    createMatrixRain();
}

// Matrix rain effect
function createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-rain';
    document.body.appendChild(matrixContainer);
    
    const chars = '01';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        createMatrixColumn(matrixContainer, i * 20, chars);
    }
}

function createMatrixColumn(container, x, chars) {
    const column = document.createElement('div');
    column.className = 'matrix-column';
    column.style.left = x + 'px';
    column.style.animationDuration = (Math.random() * 3 + 2) + 's';
    column.style.animationDelay = Math.random() * 2 + 's';
    
    // Generate random characters
    let text = '';
    for (let i = 0; i < 20; i++) {
        text += chars[Math.floor(Math.random() * chars.length)];
    }
    column.textContent = text;
    
    container.appendChild(column);
    
    // Remove and recreate periodically
    setTimeout(() => {
        column.remove();
        createMatrixColumn(container, x, chars);
    }, 5000 + Math.random() * 5000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimizations
function optimizeAnimations() {
    // Reduce animations on mobile for better performance
    if (window.innerWidth < 768) {
        document.documentElement.style.setProperty('--transition-fast', '0.1s');
        document.documentElement.style.setProperty('--transition-medium', '0.2s');
        document.documentElement.style.setProperty('--transition-slow', '0.3s');
    }
    
    // Pause animations when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.body.style.animationPlayState = 'paused';
        } else {
            document.body.style.animationPlayState = 'running';
        }
    });
}

// Initialize performance optimizations
optimizeAnimations();

// ================================
// HAPTIC FEEDBACK MODULE
// ================================

class HapticFeedback {
    constructor() {
        this.isSupported = 'vibrate' in navigator;
        this.isEnabled = this.isSupported && this.isMobileDevice();
        this.patterns = {
            light: [10],
            medium: [20],
            heavy: [50],
            success: [20, 50, 20],
            error: [100, 50, 100],
            tap: [5],
            longPress: [30],
            swipe: [15],
            toggle: [10, 10, 20]
        };
        
        console.log(`🔄 Haptic feedback ${this.isEnabled ? 'enabled' : 'disabled'}`);
    }
    
    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    vibrate(pattern = 'light') {
        if (!this.isEnabled) return;
        
        try {
            if (typeof pattern === 'string' && this.patterns[pattern]) {
                navigator.vibrate(this.patterns[pattern]);
            } else if (Array.isArray(pattern)) {
                navigator.vibrate(pattern);
            } else if (typeof pattern === 'number') {
                navigator.vibrate(pattern);
            }
        } catch (error) {
            console.warn('Haptic feedback failed:', error);
        }
    }
    
    // Convenience methods for common interactions
    tap() { this.vibrate('tap'); }
    lightTap() { this.vibrate('light'); }
    mediumTap() { this.vibrate('medium'); }
    heavyTap() { this.vibrate('heavy'); }
    success() { this.vibrate('success'); }
    error() { this.vibrate('error'); }
    toggle() { this.vibrate('toggle'); }
    swipe() { this.vibrate('swipe'); }
    longPress() { this.vibrate('longPress'); }
}

// Initialize haptic feedback
const haptic = new HapticFeedback();

// Add haptic feedback to navigation interactions
function addHapticToNavigation() {
    // Nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('touchstart', () => haptic.tap(), { passive: true });
        link.addEventListener('click', () => haptic.lightTap());
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('touchstart', () => haptic.toggle(), { passive: true });
    }
    
    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('touchstart', () => haptic.mediumTap(), { passive: true });
    }
}

// Add haptic feedback to buttons
function addHapticToButtons() {
    // All buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('touchstart', () => haptic.lightTap(), { passive: true });
        button.addEventListener('click', () => {
            if (button.classList.contains('btn-primary')) {
                haptic.mediumTap();
            } else {
                haptic.lightTap();
            }
        });
    });
    
    // Experience tabs
    document.querySelectorAll('.experience-tab').forEach(tab => {
        tab.addEventListener('touchstart', () => haptic.tap(), { passive: true });
        tab.addEventListener('click', () => haptic.lightTap());
    });
}

// Add haptic feedback to form interactions
function addHapticToForms() {
    // Form inputs
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', () => haptic.tap());
    });
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            if (contactForm.checkValidity()) {
                haptic.success();
            } else {
                haptic.error();
            }
        });
    }
}

// Add haptic feedback to achievement cards
function addHapticToAchievements() {
    document.querySelectorAll('.achievement-item').forEach(item => {
        item.addEventListener('touchstart', () => haptic.tap(), { passive: true });
        
        // Long press for additional info
        let pressTimer;
        item.addEventListener('touchstart', (e) => {
            pressTimer = setTimeout(() => {
                haptic.longPress();
            }, 500);
        }, { passive: true });
        
        item.addEventListener('touchend', () => {
            clearTimeout(pressTimer);
        }, { passive: true });
    });
}

// Add haptic feedback to swipe gestures
function enhanceSwipeWithHaptic() {
    const experienceContent = document.querySelector('.experience-content');
    if (!experienceContent) return;
    
    let startX = 0;
    let isSwipeRegistered = false;
    
    experienceContent.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwipeRegistered = false;
    }, { passive: true });
    
    experienceContent.addEventListener('touchmove', (e) => {
        if (isSwipeRegistered) return;
        
        const currentX = e.touches[0].clientX;
        const diffX = startX - currentX;
        
        // Register swipe when movement exceeds threshold
        if (Math.abs(diffX) > 50) {
            haptic.swipe();
            isSwipeRegistered = true;
        }
    }, { passive: true });
}

// Add haptic feedback to scroll interactions
function addHapticToScroll() {
    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';
    let isScrolling = false;
    
    // Debounced scroll handler
    const handleScroll = debounce(() => {
        const currentScrollY = window.scrollY;
        const newDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        
        // Only trigger haptic on direction change
        if (newDirection !== scrollDirection && Math.abs(currentScrollY - lastScrollY) > 100) {
            haptic.tap();
            scrollDirection = newDirection;
        }
        
        lastScrollY = currentScrollY;
        isScrolling = false;
    }, 100);
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            handleScroll();
        }
    }, { passive: true });
}

// Initialize all haptic feedback
function initializeHapticFeedback() {
    if (!haptic.isEnabled) return;
    
    // Add haptic feedback to various interactions
    addHapticToNavigation();
    addHapticToButtons();
    addHapticToForms();
    addHapticToAchievements();
    enhanceSwipeWithHaptic();
    
    // Optional: Add subtle scroll haptic (may be too frequent for some users)
    // addHapticToScroll();
    
    console.log('✅ Haptic feedback initialized for all touch interactions');
}

// Initialize haptic feedback after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeHapticFeedback, 100);
});

// ================================
// ACHIEVEMENTS TIMELINE TOGGLE
// ================================

function initializeAchievementsToggle() {
    const toggleButtons = document.querySelectorAll('.view-toggle-btn');
    const categoryView = document.getElementById('achievements-category-view');
    const timelineView = document.getElementById('achievements-timeline-view');
    
    if (!toggleButtons.length || !categoryView || !timelineView) {
        console.warn('Achievement toggle elements not found');
        return;
    }
    
    // Add click handlers to toggle buttons
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.getAttribute('data-view');
            switchAchievementView(view, toggleButtons, categoryView, timelineView);
            
            // Add haptic feedback if available
            if (typeof haptic !== 'undefined') {
                haptic.toggle();
            }
        });
    });
    
    console.log('✅ Achievement timeline toggle initialized');
}

function switchAchievementView(targetView, buttons, categoryView, timelineView) {
    // Update button states
    buttons.forEach(btn => {
        if (btn.getAttribute('data-view') === targetView) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Switch views with smooth transition
    if (targetView === 'timeline') {
        // Hide category view
        categoryView.style.opacity = '0';
        categoryView.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            categoryView.style.display = 'none';
            timelineView.style.display = 'block';
            timelineView.style.opacity = '0';
            timelineView.style.transform = 'translateY(20px)';
            
            // Trigger timeline animations
            requestAnimationFrame(() => {
                timelineView.style.opacity = '1';
                timelineView.style.transform = 'translateY(0)';
                
                // Re-trigger timeline item animations
                const timelineItems = timelineView.querySelectorAll('.timeline-item');
                timelineItems.forEach((item, index) => {
                    item.style.animation = 'none';
                    setTimeout(() => {
                        item.style.animation = `timelineSlideIn 0.6s ease-out forwards`;
                        item.style.animationDelay = `${index * 0.1}s`;
                    }, 100);
                });
            });
        }, 300);
        
    } else {
        // Hide timeline view
        timelineView.style.opacity = '0';
        timelineView.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            timelineView.style.display = 'none';
            categoryView.style.display = 'grid';
            categoryView.style.opacity = '0';
            categoryView.style.transform = 'translateY(20px)';
            
            // Show category view
            requestAnimationFrame(() => {
                categoryView.style.opacity = '1';
                categoryView.style.transform = 'translateY(0)';
                
                // Re-trigger category animations
                const achievementCategories = categoryView.querySelectorAll('.achievement-category');
                achievementCategories.forEach((category, index) => {
                    category.style.animation = 'none';
                    setTimeout(() => {
                        category.style.animation = `fadeInUp 0.6s ease-out forwards`;
                        category.style.animationDelay = `${(index + 1) * 0.1}s`;
                    }, 100);
                });
            });
        }, 300);
    }
    
    // Update URL hash for deep linking (optional)
    const newHash = targetView === 'timeline' ? '#achievements-timeline' : '#achievements';
    if (window.location.hash !== newHash) {
        history.replaceState(null, null, newHash);
    }
}

// Check URL hash on page load to show correct view
function checkInitialAchievementView() {
    const hash = window.location.hash;
    if (hash === '#achievements-timeline') {
        const timelineButton = document.querySelector('[data-view="timeline"]');
        if (timelineButton) {
            setTimeout(() => {
                timelineButton.click();
            }, 500); // Wait for page to load
        }
    }
}

// Enhanced haptic feedback for achievement toggles
function addHapticToAchievementToggle() {
    if (typeof haptic === 'undefined' || !haptic.isEnabled) return;
    
    document.querySelectorAll('.view-toggle-btn').forEach(button => {
        button.addEventListener('touchstart', () => haptic.tap(), { passive: true });
    });
    
    // Timeline achievement hover haptic
    document.querySelectorAll('.timeline-achievement').forEach(achievement => {
        achievement.addEventListener('touchstart', () => haptic.tap(), { passive: true });
    });
}

// Initialize achievement timeline functionality
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initializeAchievementsToggle();
        checkInitialAchievementView();
        addHapticToAchievementToggle();
    }, 200);
});

// ================================
// IMAGE OPTIMIZATION MODULE
// ================================

class ImageOptimizer {
    constructor() {
        this.webpSupported = this.checkWebPSupport();
        this.intersectionObserver = null;
        this.isMobile = window.innerWidth < 768;
        this.init();
    }
    
    // Check if WebP format is supported
    checkWebPSupport() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    
    init() {
        this.setupLazyLoading();
        this.optimizeExistingImages();
        this.preloadCriticalImages();
        console.log(`📸 Image optimization initialized (WebP: ${this.webpSupported})`);
    }
    
    // Setup Intersection Observer for lazy loading
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const options = {
                root: null,
                rootMargin: '50px',
                threshold: 0.1
            };
            
            this.intersectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.intersectionObserver.unobserve(entry.target);
                    }
                });
            }, options);
            
            // Observe all images with data-src
            document.querySelectorAll('img[data-src]').forEach(img => {
                this.intersectionObserver.observe(img);
            });
        }
    }
    
    // Load image with optimal format
    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;
        
        // Create optimized image URL
        const optimizedSrc = this.getOptimizedImageURL(src);
        
        // Preload the image
        const imageLoader = new Image();
        imageLoader.onload = () => {
            img.src = optimizedSrc;
            img.classList.add('loaded');
            
            // Remove placeholder if exists
            const placeholder = img.previousElementSibling;
            if (placeholder && placeholder.classList.contains('image-placeholder')) {
                placeholder.style.opacity = '0';
                setTimeout(() => placeholder.remove(), 300);
            }
        };
        
        imageLoader.onerror = () => {
            // Fallback to original image
            img.src = src;
            img.classList.add('loaded');
        };
        
        imageLoader.src = optimizedSrc;
    }
    
    // Get optimized image URL based on device and format support
    getOptimizedImageURL(src) {
        const url = new URL(src, window.location.origin);
        const extension = url.pathname.split('.').pop().toLowerCase();
        
        // If WebP is supported and original is not WebP, try WebP version
        if (this.webpSupported && extension !== 'webp') {
            const webpUrl = url.pathname.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            return webpUrl;
        }
        
        // For mobile, try to get smaller versions
        if (this.isMobile) {
            const mobileUrl = url.pathname.replace(/(\.[^.]+)$/, '_mobile$1');
            return mobileUrl;
        }
        
        return src;
    }
    
    // Optimize existing images in the DOM
    optimizeExistingImages() {
        document.querySelectorAll('img:not([data-src])').forEach(img => {
            if (img.src && !img.classList.contains('optimized')) {
                this.makeImageResponsive(img);
            }
        });
    }
    
    // Make an image responsive and optimized
    makeImageResponsive(img) {
        const originalSrc = img.src;
        
        // Add responsive attributes
        img.loading = 'lazy';
        img.decoding = 'async';
        img.classList.add('optimized');
        
        // Create picture element for better format support
        if (this.webpSupported && !img.parentElement.matches('picture')) {
            this.convertToPictureElement(img);
        }
        
        // Add responsive sizing
        if (!img.style.maxWidth) {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        }
    }
    
    // Convert img to picture element with WebP support
    convertToPictureElement(img) {
        const picture = document.createElement('picture');
        const webpSource = document.createElement('source');
        const fallbackSource = document.createElement('source');
        
        const originalSrc = img.src;
        const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        
        // WebP source
        webpSource.srcset = webpSrc;
        webpSource.type = 'image/webp';
        
        // Fallback source
        fallbackSource.srcset = originalSrc;
        fallbackSource.type = this.getMimeType(originalSrc);
        
        // Clone the img element
        const newImg = img.cloneNode(true);
        newImg.src = originalSrc;
        
        // Build picture element
        picture.appendChild(webpSource);
        picture.appendChild(fallbackSource);
        picture.appendChild(newImg);
        
        // Replace original img
        img.parentNode.replaceChild(picture, img);
    }
    
    // Get MIME type from file extension
    getMimeType(src) {
        const extension = src.split('.').pop().toLowerCase();
        const mimeTypes = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'webp': 'image/webp',
            'svg': 'image/svg+xml'
        };
        return mimeTypes[extension] || 'image/jpeg';
    }
    
    // Preload critical images
    preloadCriticalImages() {
        const criticalImages = [
            // Add paths to critical images here when needed
            // Currently no critical images to preload
        ];
        
        criticalImages.forEach(src => {
            if (this.imageExists(src)) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = this.getOptimizedImageURL(src);
                document.head.appendChild(link);
            }
        });
    }
    
    // Check if image exists
    imageExists(src) {
        const img = new Image();
        img.src = src;
        return img.complete && img.naturalHeight !== 0;
    }
    
    // Create optimized image placeholder
    createImagePlaceholder(width = '100%', height = '200px') {
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.style.cssText = `
            width: ${width};
            height: ${height};
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            border-radius: 8px;
        `;
        return placeholder;
    }
    
    // Add image to lazy load queue
    addImageToLazyLoad(imgElement, src) {
        imgElement.dataset.src = src;
        imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+';
        imgElement.classList.add('lazy-image');
        
        if (this.intersectionObserver) {
            this.intersectionObserver.observe(imgElement);
        }
    }
}

// Initialize image optimizer
const imageOptimizer = new ImageOptimizer();

// Add CSS for image optimization
const imageOptimizationCSS = `
/* Image optimization styles */
.lazy-image {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.lazy-image.loaded {
    opacity: 1;
}

.image-placeholder {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

/* Responsive images */
img {
    max-width: 100%;
    height: auto;
}

picture img {
    width: 100%;
    height: auto;
}

/* Dark mode adjustments for image placeholders */
[data-theme="dark"] .image-placeholder {
    background: linear-gradient(90deg, #2a2a2a 25%, #1a1a1a 50%, #2a2a2a 75%);
    background-size: 200% 100%;
}

/* Mobile-specific image optimizations */
@media (max-width: 768px) {
    img, picture img {
        border-radius: 8px;
    }
    
    .image-placeholder {
        min-height: 150px;
    }
}
`;

// Add image optimization styles to head
const imageStyle = document.createElement('style');
imageStyle.textContent = imageOptimizationCSS;
document.head.appendChild(imageStyle);

// Utility function to create optimized images
function createOptimizedImage(src, alt = '', className = '') {
    const img = document.createElement('img');
    img.alt = alt;
    img.className = className;
    
    // Add to lazy loading
    imageOptimizer.addImageToLazyLoad(img, src);
    
    return img;
}

// Utility function to create responsive image with WebP support
function createResponsiveImage(src, alt = '', sizes = '100vw') {
    const picture = document.createElement('picture');
    
    // WebP source
    if (imageOptimizer.webpSupported) {
        const webpSource = document.createElement('source');
        webpSource.srcset = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        webpSource.type = 'image/webp';
        picture.appendChild(webpSource);
    }
    
    // Fallback
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    
    picture.appendChild(img);
    return picture;
}

// Initialize image optimization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Re-initialize for any dynamically added images
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    const images = node.querySelectorAll ? node.querySelectorAll('img') : [];
                    images.forEach(img => {
                        if (!img.classList.contains('optimized')) {
                            imageOptimizer.makeImageResponsive(img);
                        }
                    });
                }
            });
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Add CSS for notifications
const notificationCSS = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--secondary-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 15px 20px;
    z-index: 9999;
    transform: translateX(400px);
    opacity: 0;
    transition: all 0.3s ease;
    max-width: 400px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
    border-left: 4px solid #4ecdc4;
}

.notification-error {
    border-left: 4px solid #ff6b6b;
}

.notification-success i {
    color: #4ecdc4;
}

.notification-error i {
    color: #ff6b6b;
}
`;

// Add notification styles to head
const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);

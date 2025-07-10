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
        title: "Boltvision: A Comparative Analysis of CNN, CCT, and ViT in Achieving High Accuracy for Missing Bolt Classification in Train Components",
        journal: "MDPI Machines Journal",
        date: "January 2024",
        type: "Journal Article"
    },
    {
        title: "Comparative Analysis of YOLOv8 and YOLOv10 in Vehicle Detection: Performance Metrics and Model Efficacy",
        journal: "MDPI Vehicles Journal",
        date: "August 2024",
        type: "Journal Article"
    },
    {
        title: "Isolated Bangla handwritten character recognition with convolutional neural network",
        journal: "IEEE Conference",
        date: "December 2017",
        type: "Conference Paper"
    },
    {
        title: "Lightweight Convolutional Network with Integrated Attention Mechanism for Missing Bolt Detection in Railways",
        journal: "MDPI Metrology",
        date: "January 2024",
        type: "Journal Article"
    },
    {
        title: "Attention-based automated pallet racking damage detection",
        journal: "IJSRT",
        date: "January 2024",
        type: "Journal Article"
    }
];

const blogData = [{
        title: "The Future of LLMs in Computer Vision: Multimodal AI Revolution",
        excerpt: "Exploring how large language models are transforming computer vision tasks and enabling new forms of multimodal AI applications.",
        date: "2024-01-15",
        readTime: "8 min read",
        category: "AI Research"
    },
    {
        title: "YOLOv10 vs YOLOv8: A Deep Dive into Real-Time Object Detection",
        excerpt: "Comprehensive comparison of the latest YOLO architectures, performance metrics, and real-world applications in transportation systems.",
        date: "2024-01-10",
        readTime: "12 min read",
        category: "Computer Vision"
    },
    {
        title: "Prompt Engineering Best Practices for Production LLM Systems",
        excerpt: "Essential techniques and strategies for designing robust prompt engineering workflows in enterprise AI applications.",
        date: "2024-01-05",
        readTime: "10 min read",
        category: "LLM Engineering"
    }
];

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTypewriter();
    populateExperience();
    populateSkills();
    populatePublications();
    populateBlog();
    initializeScrollAnimations();
    initializeContactForm();
    initializeParticleEffects();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
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
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = ['hero', 'about', 'experience', 'skills', 'publications', 'blog', 'contact'];
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

// Populate experience timeline
function populateExperience() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    timeline.innerHTML = experienceData.map((exp, index) => `
        <div class="timeline-item fade-in-up" style="animation-delay: ${index * 0.2}s">
            <div class="timeline-content">
                <div class="timeline-dot"></div>
                <h3 class="job-title">${exp.title}</h3>
                <h4 class="company">${exp.company}</h4>
                <p class="duration">${exp.duration}</p>
                <p class="job-description">${exp.description}</p>
                <ul class="job-achievements">
                    ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
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

    publicationsGrid.innerHTML = publicationsData.map((pub, index) => `
        <div class="publication-card fade-in-up" style="animation-delay: ${index * 0.1}s">
            <h3 class="publication-title">${pub.title}</h3>
            <p class="publication-journal">${pub.journal}</p>
            <p class="publication-date">${pub.date} • ${pub.type}</p>
        </div>
    `).join('');
}

// Populate blog section
function populateBlog() {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;

    blogGrid.innerHTML = blogData.map((post, index) => `
        <article class="blog-card fade-in-up" style="animation-delay: ${index * 0.1}s">
            <div class="blog-image"></div>
            <div class="blog-content">
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-meta">
                    <span class="blog-date">${formatDate(post.date)}</span>
                    <span class="blog-read-time">${post.readTime}</span>
                </div>
            </div>
        </article>
    `).join('');
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

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div> Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await simulateFormSubmission(formData);
            
            // Success state
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.style.background = '#4ecdc4';
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
        } catch (error) {
            // Error state
            submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send';
            submitButton.style.background = '#ff6b6b';
            
            showNotification('Failed to send message. Please try again.', 'error');
        }
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }, 3000);
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
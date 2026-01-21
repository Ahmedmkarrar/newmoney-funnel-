// =====================================================
// NEW MONEY - Main JavaScript
// =====================================================

document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Scroll Animations (Intersection Observer)
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.timeline-item, .benefit-card, .testimonial-card, .car-card, .module-card, .case-study-card');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    };

    // Add visible styles
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item.visible,
        .benefit-card.visible,
        .testimonial-card.visible,
        .car-card.visible,
        .module-card.visible,
        .case-study-card.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    animateOnScroll();

    // Counter Animation
    const animateCounters = function() {
        const counters = document.querySelectorAll('.stat-number');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current).toLocaleString();
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toLocaleString();
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    };

    animateCounters();

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission
    const leadForm = document.getElementById('leadForm');

    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(leadForm);
            const email = formData.get('email');
            const name = formData.get('name') || '';

            // Here you would typically send this to your backend
            console.log('Lead captured:', { name, email });

            // Redirect to thank you page
            window.location.href = 'thank-you.html';
        });
    }

    // Video Play Button Click Handler
    const playButtons = document.querySelectorAll('.play-button');

    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoContainer = this.closest('.video-placeholder') || this.closest('.video-thumb');

            // Here you would typically embed the actual video
            // For now, we'll just add a visual feedback
            if (videoContainer) {
                videoContainer.style.background = '#000';
                this.style.display = 'none';

                // You can add your video embed code here
                // Example: videoContainer.innerHTML = '<iframe src="your-video-url" ...></iframe>';
            }
        });
    });

    // Parallax Effect for Hero Background (subtle)
    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroOverlay = hero.querySelector('.hero-bg-overlay');

            if (heroOverlay && scrolled < 800) {
                heroOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    // Add loading animation removal
    document.body.classList.add('loaded');

});

// Prevent FOUC (Flash of Unstyled Content)
document.documentElement.style.visibility = 'visible';

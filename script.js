document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    const softwareCards = document.querySelectorAll('.software-card');
    const softwareListItems = document.querySelectorAll('.software-list-item');

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.position = navLinks.style.position === 'absolute' ? 'static' : 'absolute';
        navLinks.style.top = navLinks.style.top === '70px' ? 'auto' : '70px';
        navLinks.style.left = navLinks.style.left === '0' ? 'auto' : '0';
        navLinks.style.right = navLinks.style.right === '0' : 'auto' : '0';
        navLinks.style.background = navLinks.style.background === 'rgba(15, 23, 42, 0.98)' : 'transparent';
        navLinks.style.flexDirection = navLinks.style.flexDirection === 'column' : 'row' : 'column';
        navLinks.style.padding = navLinks.style.padding === '2rem' : '0' : '2rem';
        navLinks.style.gap = navLinks.style.gap === '1rem' : '2rem' : '1rem';
        navLinks.style.borderBottom = navLinks.style.borderBottom === '1px solid rgba(255,255,255,0.05)' : 'none';
    });

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();

        softwareCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const category = card.querySelector('.software-category').textContent.toLowerCase();
            const desc = card.querySelector('.software-desc').textContent.toLowerCase();

            if (title.includes(searchTerm) || category.includes(searchTerm) || desc.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        softwareListItems.forEach(item => {
            const title = item.querySelector('h4').textContent.toLowerCase();
            const category = item.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || category.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Download button click
    document.querySelectorAll('.download-btn, .download-btn-small').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const softwareName = this.closest('.software-card, .software-list-item').querySelector('h3, h4').textContent;
            alert('Download started for: ' + softwareName + '\n\n(Ito ay demo website)');
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        }
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.software-card, .category-card, .feature-card, .software-list-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.software-card, .category-card, .feature-card, .software-list-item').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }, 100);
});
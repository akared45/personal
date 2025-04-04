document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    const interactiveElements = document.querySelectorAll('a, button, .toggle-projects, .skill-card, .form-control');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
        });
    });
    
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const progressBars = document.querySelectorAll('.progress-bar');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            gsap.to(bar, {
                width: width + '%',
                duration: 1.5,
                ease: 'power3.out'
            });
        });
    }
    
    const toggleButtons = document.querySelectorAll('.toggle-projects');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectsList = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            projectsList.classList.toggle('active');
            
            if (projectsList.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
    
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.from('.hero h1', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.hero p', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-buttons', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-image', {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    const sections = document.querySelectorAll('section:not(.hero)');
    
    sections.forEach(section => {
        gsap.from(section.querySelectorAll('h2, h3, p, .skill-card, .info-item, .contact-form'), {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    ScrollTrigger.create({
        trigger: '.skills-progress',
        start: 'top 80%',
        onEnter: animateProgressBars,
        once: true
    });
});
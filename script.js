// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Update button icon based on current theme
function updateButtonIcon() {
    const theme = document.documentElement.getAttribute('data-theme');
    const moonIcon = themeToggle.querySelector('.fa-moon');
    const sunIcon = themeToggle.querySelector('.fa-sun');
    
    if (theme === 'dark') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'inline-block';
    } else {
        moonIcon.style.display = 'inline-block';
        sunIcon.style.display = 'none';
    }
}

// Call initially and add event listener for theme changes
updateButtonIcon();
themeToggle.addEventListener('click', updateButtonIcon);

// Scroll reveal functionality
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

// Add hidden class to elements we want to animate
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections
    document.querySelectorAll('section > h2').forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    // Animate project cards
    document.querySelectorAll('.project-card').forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    // Animate skill tags with delay
    document.querySelectorAll('.skill-tags span').forEach((el, index) => {
        el.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s both`;
    });

    // Add hover animation to social links
    document.querySelectorAll('.social-links a').forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            e.target.style.animation = 'bounce 1s';
        });
        el.addEventListener('animationend', (e) => {
            e.target.style.animation = '';
        });
    });
});

// Add typing effect to hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    const heroText = document.querySelector('.hero p');
    const originalText = heroText.textContent;
    typeWriter(heroText, originalText);
}); 
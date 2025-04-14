// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Clients Slider
const clientSlides = document.querySelectorAll('.client-slide');
const clientDots = document.querySelectorAll('.slider-dot');
let currentClientSlide = 0;

function showClientSlide(index) {
    clientSlides.forEach(slide => slide.classList.remove('active'));
    clientDots.forEach(dot => dot.classList.remove('active'));
    
    clientSlides[index].classList.add('active');
    clientDots[index].classList.add('active');
    currentClientSlide = index;
}

clientDots.forEach(dot => {
    dot.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        showClientSlide(slideIndex);
    });
});

// Auto-rotate client testimonials
setInterval(() => {
    currentClientSlide = (currentClientSlide + 1) % clientSlides.length;
    showClientSlide(currentClientSlide);
}, 5000);

// Sticky header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Language Switcher Functionality
let translations = {};

// Load translations
fetch('translations.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        const savedLang = localStorage.getItem('selectedLang') || 'en';
        translatePage(savedLang);
    });

function translatePage(lang) {
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key] && translations[key][lang]) {
            element.textContent = translations[key][lang];
        }
    });

    // Handle RTL for Arabic
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.body.classList.add('rtl');
    } else {
        document.documentElement.removeAttribute('dir');
        document.body.classList.remove('rtl');
    }

    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Save selected language
    localStorage.setItem('selectedLang', lang);
}

// Language button click handlers
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        translatePage(lang);
    });
});
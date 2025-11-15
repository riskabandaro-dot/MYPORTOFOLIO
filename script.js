// Inisialisasi Lucide Icons
lucide.createIcons();

// Variabel untuk elemen DOM
const pageContent = document.getElementById('page-content');
const navbar = document.getElementById('navbar');
const darkModeToggle = document.getElementById('darkModeToggle');
const animatedTextElement = document.getElementById('animated-text');

// --- 1. Animasi Saat Masuk Halaman (Fade-in) ---
document.addEventListener('DOMContentLoaded', () => {
    pageContent.style.opacity = '1';
});


// --- 2. Navbar Berubah Warna Saat Discroll ---
const handleScroll = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
};
window.addEventListener('scroll', handleScroll);


// --- 3. Dark Mode Toggle ---
const darkIcon = darkModeToggle.querySelector('.dark-icon');
const lightIcon = darkModeToggle.querySelector('.light-icon');

const setDarkMode = (isDark) => {
    if (isDark) {
        document.documentElement.classList.add('dark');
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'block';
    } else {
        document.documentElement.classList.remove('dark');
        darkIcon.style.display = 'block';
        lightIcon.style.display = 'none';
    }
};

// Cek preferensi user atau simpanan di localStorage saat dimuat
const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setDarkMode(true);
} else {
    setDarkMode(false);
}

darkModeToggle.addEventListener('click', () => {
    const isDark = !document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


// --- 4. Hero Section dengan Animasi Teks Bergerak (Typing Effect) ---
const roles = ["Perawatan Luka Hewan", "Pencegahan Penyakit Umum"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBeforeTyping = 1500;

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        animatedTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        animatedTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(type, delayBeforeTyping);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 500);
    } else {
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, speed);
    }
}
setTimeout(type, 1000); 


// --- 5. Carousel / Slider Gambar Sederhana ---
const carouselSlides = document.getElementById('carousel-slides');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const slides = carouselSlides.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
let currentSlide = 0;

function updateCarousel() {
    // Pastikan slides memiliki elemen sebelum mencoba mengakses properti
    if (slides.length > 0) {
        const slideWidth = slides[0].clientWidth;
        carouselSlides.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    }
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

window.addEventListener('resize', updateCarousel);
document.addEventListener('DOMContentLoaded', updateCarousel);

// Auto-slide 
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}, 5000); 


// --- 6. Animasi Saat Scroll (Scroll Reveal) menggunakan Intersection Observer ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); 
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});

document.querySelectorAll('.scroll-reveal').forEach(element => {
    observer.observe(element);
});

// FIRST TECH CHALLENGE PAGE SCRIPT - OPTIMIZED

// Performance optimizations
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimize Three.js performance
function optimizeThreeJS() {
    const particleCount = window.innerWidth < 768 ? 1000 : 3000; // Reduced for better performance
    const shadowQuality = window.innerWidth < 768 ? 'low' : 'high';
    return { particleCount, shadowQuality };
}

// Initialize 3D background - Optimized
function init3DBackground() {
    let scene, camera, renderer, particles;
    let animationId;
    
    const { particleCount } = optimizeThreeJS();
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: window.innerWidth > 768,
        powerPreference: 'high-performance'
    });
    
    const canvasContainer = document.getElementById('canvas-container');
    if (!canvasContainer) return;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);
    
    // Create optimized particles
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: window.innerWidth < 768 ? 0.003 : 0.005,
        color: 0xff6b35,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xff6b35, 1);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    
    camera.position.z = 3;
    
    function animate3D() {
        animationId = requestAnimationFrame(animate3D);
        
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;
        
        renderer.render(scene, camera);
    }
    
    animate3D();
    
    // Optimized resize handling
    const handleResize = debounce(() => {
        if (camera && renderer) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }, 250);
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    window.addEventListener('beforeunload', () => {
        if (animationId) cancelAnimationFrame(animationId);
        if (renderer) renderer.dispose();
    });
}

// Page specific animations - Optimized
document.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D background
    init3DBackground();
    
    // Optimized GSAP animations with reduced duration for snappier feel
    gsap.from('.project-number-large', {
        scale: 0,
        opacity: 0,
        duration: 0.8, // Reduced from 1
        ease: 'back.out(1.7)'
    });
    
    gsap.from('.project-hero-content h1', {
        y: 50,
        opacity: 0,
        duration: 0.8, // Reduced from 1
        delay: 0.2 // Reduced delay
    });
    
    gsap.from('.project-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8, // Reduced from 1
        delay: 0.4 // Reduced delay
    });
    
    gsap.from('.project-hero-stats .stat', {
        scale: 0,
        opacity: 0,
        duration: 0.6, // Reduced from 0.8
        stagger: 0.05, // Reduced stagger
        delay: 0.6 // Reduced delay
    });
    
    // Optimized scroll animations
    gsap.utils.toArray('.tech-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.6, // Reduced from 0.8
            delay: index * 0.05, // Reduced delay
            ease: 'power3.out'
        });
    });
    
    gsap.utils.toArray('.achievement-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            x: -50,
            opacity: 0,
            duration: 0.6, // Reduced from 0.8
            delay: index * 0.05, // Reduced delay
            ease: 'power3.out'
        });
    });
    
    gsap.utils.toArray('.gallery-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.6, // Reduced from 0.8
            delay: index * 0.05, // Reduced delay
            ease: 'back.out(1.7)'
        });
    });
});

// Mobile menu toggle - Optimized
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth scrolling - Optimized
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar scroll effect - Optimized
const handleNavbarScroll = throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}, 16); // 60fps

window.addEventListener('scroll', handleNavbarScroll);

console.log('🚀 FIRST Tech Challenge Page Loaded Successfully!');

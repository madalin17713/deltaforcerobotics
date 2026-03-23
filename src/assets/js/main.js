// PERFORMANCE OPTIMIZATIONS
// Debounce function for scroll events
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

// Throttle function for performance
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

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'logo.png',
        'ftc_section_photo.jpg',
        'frc_secton_photo.jpg',
        'fgc_section_photo.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Optimize Three.js performance
function optimizeThreeJS() {
    // Reduce particle count for mobile
    const particleCount = window.innerWidth < 768 ? 1000 : 5000;
    
    // Use lower quality shadows on mobile
    const shadowQuality = window.innerWidth < 768 ? 'low' : 'high';
    
    return { particleCount, shadowQuality };
}
// LOADER - Optimized
window.addEventListener('load', () => {
    preloadImages(); // Preload critical images
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
    }, 1500); // Reduced from 2000ms for better UX
});

// CUSTOM CURSOR - Optimized for performance
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

// Throttled cursor movement
const updateCursorPosition = throttle((e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX - 10 + 'px';
        cursorFollower.style.top = e.clientY - 10 + 'px';
    }, 50);
}, 16); // 60fps

document.addEventListener('mousemove', updateCursorPosition);

// Hide cursor on mobile
if (window.innerWidth < 768) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
}

// NAVBAR SCROLL EFFECT - Optimized
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

// MOBILE MENU TOGGLE
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// SMOOTH SCROLLING cu animatie avansata
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.offsetTop - 80;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1500;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function easeInOutQuad(t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Scroll reveal animations
const revealElements = () => {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
};

// Parallax scroll effect
const parallaxElements = document.querySelectorAll('.parallax');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    revealElements();
});

// Progress bar animation on scroll
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !bar.classList.contains('animated')) {
            const width = bar.dataset.width;
            bar.style.width = width + '%';
            bar.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateProgressBars);

// TYPING EFFECT
const typedTextElement = document.querySelector('.typed-text');
const textArray = ['Inovație', 'Tehnologie', 'Excelență', 'Viitor'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(typeText, 500);
    } else {
        setTimeout(typeText, isDeleting ? 50 : 100);
    }
}

// Start typing effect
typeText();

// COUNTER ANIMATION - REMOVED
// No longer needed as we replaced stats with highlights

// THREE.JS 3D BACKGROUND - Optimized
let scene, camera, renderer, particles;
let animationId;

function init3DBackground() {
    const { particleCount } = optimizeThreeJS();
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: window.innerWidth > 768, // Disable antialiasing on mobile
        powerPreference: 'high-performance'
    });
    
    const canvasContainer = document.getElementById('canvas-container');
    if (!canvasContainer) return;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio
    canvasContainer.appendChild(renderer.domElement);
    
    // Create particles with optimized count
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: window.innerWidth < 768 ? 0.003 : 0.005, // Smaller particles on mobile
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
    
    animate3D();
}

function animate3D() {
    animationId = requestAnimationFrame(animate3D);
    
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.002;
    
    renderer.render(scene, camera);
}

// Optimize resize handling
const handleResize = debounce(() => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}, 250);

window.addEventListener('resize', handleResize);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    if (renderer) {
        renderer.dispose();
    }
});

// Initialize 3D background
init3DBackground();

// GSAP ANIMATIONS
gsap.registerPlugin(ScrollTrigger);

// Hero content animation
gsap.timeline()
    .from('.hero-title h1', { duration: 1, y: 100, opacity: 0, ease: 'power3.out' })
    .from('.hero-title h2', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' }, '-=0.5')
    .from('.hero-subtitle p', { duration: 1, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.5')
    .from('.typing-text', { duration: 1, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.3')
    .from('.hero-cta', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' }, '-=0.3')
    .from('.scroll-indicator', { duration: 1, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.3');

// Section animations with ScrollTrigger
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Project cards animation
gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
    });
});

// Team members animation
gsap.utils.toArray('.team-member').forEach((member, index) => {
    gsap.from(member, {
        scrollTrigger: {
            trigger: member,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'back.out(1.7)'
    });
});

// Highlight items animation
gsap.utils.toArray('.highlight-item').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power3.out'
    });
});

// Parallax effect for robot model
gsap.to('.robot-model', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
    },
    y: -100,
    rotation: 360,
    ease: 'none'
});

// CTA buttons hover effects
document.querySelectorAll('.cta-primary, .cta-secondary').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Project cards tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'TRIMITERE...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = 'MESAJ TRIMIS!';
        submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 2000);
});

// Form input animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input.parentElement, {
            duration: 0.3,
            scale: 1.02,
            ease: 'power2.out'
        });
    });
    
    input.addEventListener('blur', () => {
        gsap.to(input.parentElement, {
            duration: 0.3,
            scale: 1,
            ease: 'power2.out'
        });
    });
});

// Window resize handler for 3D scene
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// Add some interactive particle effects
document.addEventListener('click', (e) => {
    createParticleEffect(e.clientX, e.clientY);
});

function createParticleEffect(x, y) {
    const colors = ['#ff6b35', '#ffa500', '#ffb347', '#cc5500'];
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 50 + Math.random() * 50;
        
        gsap.to(particle, {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => {
                particle.remove();
            }
        });
    }
}

// Add floating animation to social icons
document.querySelectorAll('.social-icon, .social-link').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
            y: -5,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Performance optimization - reduce particle count on mobile
if (window.innerWidth < 768) {
    if (particles && particles.geometry) {
        // Reduce particle count for mobile
        const newCount = 1000;
        const posArray = new Float32Array(newCount * 3);
        for (let i = 0; i < newCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }
        particles.geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    }
}

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        gsap.from(img, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

console.log('🚀 Delta Force Robotics Website Loaded Successfully!');

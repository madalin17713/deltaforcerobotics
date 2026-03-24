function debounce(func, wait) {
    let timeout;
    return function debounced(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function initProjectBackground() {
    if (typeof THREE === 'undefined') return;

    const host = document.getElementById('hero-canvas');
    if (!host) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const accent = document.body.dataset.projectAccent || '#ff6b35';
    const particleCount = prefersReducedMotion ? 180 : (window.innerWidth < 768 ? 500 : 1200);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.innerWidth > 768,
        powerPreference: 'high-performance'
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    host.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
        const index = i * 3;
        positions[index] = (Math.random() - 0.5) * 14;
        positions[index + 1] = (Math.random() - 0.5) * 9;
        positions[index + 2] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: window.innerWidth < 768 ? 0.025 : 0.035,
        color: accent,
        transparent: true,
        opacity: prefersReducedMotion ? 0.35 : 0.6,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const pointLight = new THREE.PointLight(accent, 2.2, 16);
    pointLight.position.set(2, 2, 4);
    scene.add(ambientLight, pointLight);

    camera.position.z = 5;

    let animationId = null;
    let running = true;

    const animate = () => {
        if (!running) return;
        animationId = requestAnimationFrame(animate);

        if (!prefersReducedMotion) {
            particles.rotation.y += 0.0009;
            particles.rotation.x += 0.00035;
        }

        renderer.render(scene, camera);
    };

    animate();

    const resize = debounce(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, 150);

    const visibilityHandler = () => {
        running = !document.hidden;
        if (running && !animationId) animate();
        if (!running && animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    };

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', visibilityHandler);
    window.addEventListener('beforeunload', () => {
        running = false;
        if (animationId) cancelAnimationFrame(animationId);
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        renderer.dispose();
    });
}

function initProjectInteractions() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    window.addEventListener('scroll', () => {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 24);
    }, { passive: true });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function initProjectCardTilt() {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('pointermove', (event) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            const rotateY = (x - 0.5) * 6;
            const rotateX = (0.5 - y) * 6;
            card.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
            card.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
        });

        card.addEventListener('pointerleave', () => {
            card.style.setProperty('--tilt-x', '0deg');
            card.style.setProperty('--tilt-y', '0deg');
        });
    });
}

function initProjectAnimations() {
    if (typeof gsap === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    if (prefersReducedMotion) {
        gsap.set([
            '.project-eyebrow',
            '.project-number-large',
            '.hero-title',
            '.hero-subtitle',
            '.project-stat-card',
            '.highlight-item',
            '.project-panel',
            '.tech-stack',
            '.gallery-item',
            '.cta-content'
        ], { clearProps: 'all', opacity: 1 });
        return;
    }

    gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.project-eyebrow', { y: 18, opacity: 0, duration: 0.5 })
        .from('.project-number-large', { scale: 0.85, opacity: 0, duration: 0.9 }, '-=0.2')
        .from('.project-hero .hero-title', { y: 48, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('.project-hero .hero-subtitle', { y: 24, opacity: 0, duration: 0.7 }, '-=0.45')
        .from('.project-stat-card', { y: 30, opacity: 0, duration: 0.6, stagger: 0.12 }, '-=0.35');

    ['.highlight-item', '.project-panel', '.tech-stack', '.gallery-item', '.cta-content'].forEach((selector) => {
        gsap.utils.toArray(selector).forEach((element, index) => {
            gsap.from(element, {
                y: 42,
                opacity: 0,
                duration: 0.75,
                delay: index * 0.04,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 86%',
                    once: true
                }
            });
        });
    });

    gsap.to('.project-hero-glow', {
        scale: 1.08,
        opacity: 0.9,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initProjectBackground();
    initProjectInteractions();
    initProjectCardTilt();
    initProjectAnimations();
});

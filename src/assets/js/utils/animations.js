// ANIMATION UTILITIES
export class AnimationManager {
    static initGSAP() {
        gsap.registerPlugin(ScrollTrigger);
        
        // Global GSAP settings
        gsap.defaults({
            ease: "power3.out",
            duration: 0.8
        });
    }

    static animateHero() {
        const tl = gsap.timeline();
        
        tl.from('.hero-title h1', { 
            y: 100, 
            opacity: 0, 
            duration: 1,
            ease: 'power3.out' 
        })
        .from('.hero-title h2', { 
            y: 50, 
            opacity: 0, 
            duration: 1,
            ease: 'power3.out' 
        }, '-=0.5')
        .from('.hero-subtitle p', { 
            y: 30, 
            opacity: 0, 
            duration: 1,
            ease: 'power3.out' 
        }, '-=0.5')
        .from('.hero-cta .cta-primary', { 
            scale: 0, 
            opacity: 0, 
            duration: 0.8,
            ease: 'back.out(1.7)' 
        }, '-=0.3')
        .from('.hero-cta .cta-secondary', { 
            scale: 0, 
            opacity: 0, 
            duration: 0.8,
            ease: 'back.out(1.7)' 
        }, '-=0.5');

        return tl;
    }

    static animateScrollElements() {
        // Section titles
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8
            });
        });

        // Highlight items
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
                delay: index * 0.2
            });
        });

        // Project cards
        gsap.utils.toArray('.project-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1
            });
        });

        // Team members
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
    }

    static animateProjectPage() {
        // Project number
        gsap.from('.project-number-large', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });

        // Project title
        gsap.from('.project-hero-content h1', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: 0.2
        });

        // Project subtitle
        gsap.from('.project-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.4
        });

        // Stats
        gsap.from('.project-hero-stats .stat', {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.05,
            delay: 0.6
        });

        // Tech items
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
                duration: 0.6,
                delay: index * 0.05
            });
        });

        // Achievements
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
                duration: 0.6,
                delay: index * 0.05
            });
        });

        // Gallery
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
                duration: 0.6,
                delay: index * 0.05,
                ease: 'back.out(1.7)'
            });
        });
    }

    static createParticleEffect(x, y, colors = ['#ff6b35', '#ffa500', '#ffb347', '#cc5500']) {
        const particleCount = 20;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            document.body.appendChild(particle);
            particles.push(particle);

            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 2 + Math.random() * 3;
            const lifetime = 1000 + Math.random() * 1000;

            gsap.to(particle, {
                x: Math.cos(angle) * velocity * 50,
                y: Math.sin(angle) * velocity * 50,
                opacity: 0,
                duration: lifetime / 1000,
                ease: 'power2.out',
                onComplete: () => {
                    particle.remove();
                }
            });
        }

        return particles;
    }

    static addHoverEffects() {
        // Project cards hover
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                AnimationManager.createParticleEffect(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2
                );
            });
        });

        // CTA buttons hover
        document.querySelectorAll('.cta-primary, .cta-secondary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const rect = btn.getBoundingClientRect();
                AnimationManager.createParticleEffect(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2
                );
            });
        });
    }
}

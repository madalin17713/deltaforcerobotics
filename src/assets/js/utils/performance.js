// PERFORMANCE UTILITIES
export class PerformanceOptimizer {
    static debounce(func, wait) {
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

    static throttle(func, limit) {
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

    static preloadImages(imageArray) {
        imageArray.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    static optimizeForDevice() {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        const isDesktop = window.innerWidth >= 1024;

        return {
            isMobile,
            isTablet,
            isDesktop,
            particleCount: isMobile ? 1000 : isTablet ? 3000 : 5000,
            animationQuality: isMobile ? 'low' : 'high',
            enableEffects: !isMobile
        };
    }

    static measurePerformance() {
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0];
            const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
            const domReady = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
            
            console.log(`📊 Performance Metrics:
                Load Time: ${loadTime}ms
                DOM Ready: ${domReady}ms
                Memory Usage: ${performance.memory ? (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + 'MB' : 'N/A'}
            `);
            
            return { loadTime, domReady };
        }
        return null;
    }

    static lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    static optimizeScroll() {
        let ticking = false;
        
        function updateScroll() {
            // Scroll-based animations here
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                window.requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });
        return requestTick;
    }
}

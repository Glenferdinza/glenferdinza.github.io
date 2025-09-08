/**
 * MAIN APPLICATION CONTROLLER
 * Central hub for all functionality
 * Professional implementation for Glenferdinza's landing page
 */

class GlenferdinzaApp {
    constructor() {
        this.isInitialized = false;
        this.loadingScreen = null;
        this.themeController = null;
        this.analyticsController = null;
        this.errorHandler = null;
        
        this.init();
    }
    
    async init() {
        try {
            // Show loading screen
            this.showLoadingScreen();
            
            // Initialize core systems
            await this.initializeCoreComponents();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initialize analytics
            this.initializeAnalytics();
            
            // Setup error handling
            this.setupErrorHandling();
            
            // Hide loading screen
            await this.hideLoadingScreen();
            
            this.isInitialized = true;
            console.log('✅ Glenferdinza Landing Page initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            this.handleInitializationError(error);
        }
    }
    
    showLoadingScreen() {
        this.loadingScreen = document.getElementById('loadingScreen');
        if (this.loadingScreen) {
            this.loadingScreen.style.display = 'flex';
        }
    }
    
    async hideLoadingScreen() {
        return new Promise((resolve) => {
            if (this.loadingScreen) {
                setTimeout(() => {
                    this.loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        this.loadingScreen.style.display = 'none';
                        resolve();
                    }, 500);
                }, 1000); // Minimum loading time for better UX
            } else {
                resolve();
            }
        });
    }
    
    async initializeCoreComponents() {
        // Set current year
        this.updateCurrentYear();
        
        // Initialize theme controller
        this.themeController = new ThemeController();
        
        // Preload critical resources
        await this.preloadCriticalResources();
        
        // Initialize UI components
        this.initializeUIComponents();
        
        // Setup accessibility features
        this.setupAccessibility();
        
        // Initialize PWA features
        this.initializePWA();
    }
    
    updateCurrentYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    async preloadCriticalResources() {
        const criticalImages = [
            './assets/images/profile.jpg',
            './assets/images/favicon.ico'
        ];
        
        const imagePromises = criticalImages.map(src => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(src);
                img.onerror = () => reject(new Error(`Failed to load ${src}`));
                img.src = src;
            });
        });
        
        try {
            await Promise.all(imagePromises);
            console.log('✅ Critical resources preloaded');
        } catch (error) {
            console.warn('⚠️ Some resources failed to preload:', error);
        }
    }
    
    initializeUIComponents() {
        // Initialize tooltips
        this.initializeTooltips();
        
        // Initialize button interactions
        this.initializeButtonInteractions();
        
        // Initialize social link tracking
        this.initializeSocialTracking();
        
        // Initialize copy functionality
        this.initializeCopyFunctionality();
    }
    
    initializeTooltips() {
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', (e) => {
                const platform = e.currentTarget.dataset.platform;
                this.showTooltip(e.currentTarget, platform);
            });
            
            icon.addEventListener('mouseleave', (e) => {
                this.hideTooltip(e.currentTarget);
            });
        });
    }
    
    showTooltip(element, text) {
        const tooltip = element.querySelector('.social-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
        }
    }
    
    hideTooltip(element) {
        const tooltip = element.querySelector('.social-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateX(-50%) translateY(0)';
        }
    }
    
    initializeButtonInteractions() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            // Add click tracking
            button.addEventListener('click', (e) => {
                const buttonText = e.currentTarget.dataset.text || 'Unknown';
                this.trackButtonClick(buttonText, e.currentTarget.href);
            });
            
            // Add keyboard navigation
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }
    
    initializeSocialTracking() {
        const socialLinks = document.querySelectorAll('.social-icon');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = e.currentTarget.dataset.platform;
                this.trackSocialClick(platform, e.currentTarget.href);
            });
        });
    }
    
    initializeCopyFunctionality() {
        // Add copy email functionality if needed
        const copyElements = document.querySelectorAll('[data-copy]');
        copyElements.forEach(element => {
            element.addEventListener('click', async (e) => {
                e.preventDefault();
                const textToCopy = element.dataset.copy;
                await this.copyToClipboard(textToCopy);
                this.showCopyNotification(element);
            });
        });
    }
    
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    }
    
    showCopyNotification(element) {
        const notification = document.createElement('div');
        notification.textContent = 'Copied to clipboard!';
        notification.style.cssText = `
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--color-accent-primary);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        element.style.position = 'relative';
        element.appendChild(notification);
        
        setTimeout(() => notification.style.opacity = '1', 10);
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
    
    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
        
        // Handle page visibility
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
        
        // Handle online/offline status
        window.addEventListener('online', () => this.handleOnlineStatus(true));
        window.addEventListener('offline', () => this.handleOnlineStatus(false));
        
        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
        
        // Handle scroll events
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16));
    }
    
    handleResize() {
        // Update constellation on resize
        if (window.constellation) {
            const isMobile = window.innerWidth < 768;
            window.constellation.updateConfig({
                starCount: isMobile ? 40 : 80,
                maxDistance: isMobile ? 80 : 120,
                lineOpacity: isMobile ? 0.05 : 0.1
            });
        }
    }
    
    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations when tab is hidden
            this.pauseAnimations();
        } else {
            // Resume animations when tab is visible
            this.resumeAnimations();
        }
    }
    
    handleOnlineStatus(isOnline) {
        if (!isOnline) {
            this.showOfflineNotification();
        } else {
            this.hideOfflineNotification();
        }
    }
    
    showOfflineNotification() {
        const notification = document.createElement('div');
        notification.id = 'offline-notification';
        notification.innerHTML = `
            <i class="fas fa-wifi-slash"></i>
            You're offline. Some features may not work.
        `;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff6b6b;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            z-index: 10000;
            font-size: 0.9rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
    }
    
    hideOfflineNotification() {
        const notification = document.getElementById('offline-notification');
        if (notification) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }
    
    handleKeyboardNavigation(e) {
        // Handle tab navigation
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        
        // Handle escape key
        if (e.key === 'Escape') {
            // Close any open modals or tooltips
            this.closeAllOverlays();
        }
    }
    
    handleScroll() {
        // Add scroll-based effects
        const scrollPosition = window.pageYOffset;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollPosition / maxScroll;
        
        // Update scroll indicator if exists
        const scrollIndicator = document.getElementById('scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.width = `${scrollPercent * 100}%`;
        }
    }
    
    closeAllOverlays() {
        // Close tooltips
        document.querySelectorAll('.social-tooltip').forEach(tooltip => {
            tooltip.style.opacity = '0';
        });
    }
    
    pauseAnimations() {
        if (window.constellation) {
            window.constellation.pauseAnimation();
        }
        
        if (window.animationController && window.animationController.particleSystem) {
            window.animationController.particleSystem.isActive = false;
        }
    }
    
    resumeAnimations() {
        if (window.constellation) {
            window.constellation.resumeAnimation();
        }
        
        if (window.animationController && window.animationController.particleSystem) {
            window.animationController.particleSystem.isActive = true;
        }
    }
    
    setupAccessibility() {
        // Add skip link
        this.addSkipLink();
        
        // Enhance keyboard navigation
        this.enhanceKeyboardNavigation();
        
        // Add ARIA labels
        this.addAriaLabels();
        
        // Setup focus management
        this.setupFocusManagement();
    }
    
    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-accent-primary);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    enhanceKeyboardNavigation() {
        // Add visible focus indicators
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-navigation *:focus {
                outline: 2px solid var(--color-accent-primary) !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
        
        // Remove keyboard navigation class on mouse use
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    addAriaLabels() {
        // Add ARIA labels to interactive elements
        const profileImage = document.getElementById('profileImage');
        if (profileImage) {
            profileImage.setAttribute('alt', 'Glenferdinza Profile Picture');
        }
        
        // Add labels to social links
        document.querySelectorAll('.social-icon').forEach(icon => {
            const platform = icon.dataset.platform;
            icon.setAttribute('aria-label', `Visit ${platform} profile`);
        });
        
        // Add labels to buttons
        document.querySelectorAll('.btn').forEach(btn => {
            if (!btn.getAttribute('aria-label')) {
                const text = btn.textContent.trim();
                btn.setAttribute('aria-label', text);
            }
        });
    }
    
    setupFocusManagement() {
        // Trap focus in modals if any
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
    }
    
    handleTabNavigation(e) {
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
    
    initializePWA() {
        // Register service worker if available
        if ('serviceWorker' in navigator) {
            this.registerServiceWorker();
        }
        
        // Handle install prompt
        this.handleInstallPrompt();
        
        // Setup offline handling
        this.setupOfflineHandling();
    }
    
    async registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('✅ Service Worker registered:', registration);
        } catch (error) {
            console.log('ℹ️ Service Worker registration failed:', error);
        }
    }
    
    handleInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            this.showInstallButton(deferredPrompt);
        });
    }
    
    showInstallButton(deferredPrompt) {
        const installButton = document.createElement('button');
        installButton.textContent = 'Install App';
        installButton.className = 'install-button';
        installButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--color-accent-primary);
            color: white;
            border: none;
            padding: 12px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.9rem;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        installButton.addEventListener('click', async () => {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User ${outcome} the install prompt`);
            installButton.remove();
        });
        
        document.body.appendChild(installButton);
    }
    
    setupOfflineHandling() {
        // Cache critical resources
        if ('caches' in window) {
            this.cacheResources();
        }
    }
    
    async cacheResources() {
        const cache = await caches.open('glenferdinza-v1');
        const resourcesToCache = [
            '/',
            '/assets/css/styles.css',
            '/assets/js/main.js',
            '/assets/js/animations.js',
            '/assets/js/constellation.js',
            '/assets/images/profile.jpg'
        ];
        
        try {
            await cache.addAll(resourcesToCache);
            console.log('✅ Resources cached');
        } catch (error) {
            console.warn('⚠️ Failed to cache some resources:', error);
        }
    }
    
    initializeAnalytics() {
        this.analyticsController = new AnalyticsController();
    }
    
    setupErrorHandling() {
        this.errorHandler = new ErrorHandler();
        
        // Global error handler
        window.addEventListener('error', (e) => {
            this.errorHandler.handleError(e.error);
        });
        
        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            this.errorHandler.handleError(e.reason);
        });
    }
    
    handleInitializationError(error) {
        console.error('Initialization error:', error);
        
        // Show user-friendly error message
        const errorMessage = document.createElement('div');
        errorMessage.innerHTML = `
            <h2>Something went wrong</h2>
            <p>Please refresh the page or try again later.</p>
            <button onclick="location.reload()">Refresh Page</button>
        `;
        errorMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-bg-card);
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        `;
        
        document.body.appendChild(errorMessage);
    }
    
    // Utility functions
    debounce(func, wait) {
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
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    trackButtonClick(buttonText, url) {
        if (this.analyticsController) {
            this.analyticsController.trackEvent('button_click', {
                button_text: buttonText,
                url: url
            });
        }
    }
    
    trackSocialClick(platform, url) {
        if (this.analyticsController) {
            this.analyticsController.trackEvent('social_click', {
                platform: platform,
                url: url
            });
        }
    }
}

/**
 * THEME CONTROLLER
 * Handles theme switching and preferences
 */
class ThemeController {
    constructor() {
        this.currentTheme = 'dark';
        this.init();
    }
    
    init() {
        this.loadSavedTheme();
        this.setupThemeToggle();
        this.watchSystemTheme();
    }
    
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            // Use system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
    
    setupThemeToggle() {
        // Add theme toggle button if needed
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
    
    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

/**
 * ANALYTICS CONTROLLER
 * Handles event tracking and analytics
 */
class AnalyticsController {
    constructor() {
        this.events = [];
        this.sessionId = this.generateSessionId();
        this.init();
    }
    
    init() {
        this.trackPageView();
        this.setupPerformanceTracking();
    }
    
    generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    trackEvent(eventName, properties = {}) {
        const event = {
            name: eventName,
            properties: {
                ...properties,
                sessionId: this.sessionId,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                url: window.location.href
            }
        };
        
        this.events.push(event);
        console.log('📊 Event tracked:', event);
        
        // Send to analytics service if configured
        this.sendToAnalytics(event);
    }
    
    trackPageView() {
        this.trackEvent('page_view', {
            title: document.title,
            referrer: document.referrer
        });
    }
    
    setupPerformanceTracking() {
        // Track page load time
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            this.trackEvent('page_load_time', { loadTime });
        });
        
        // Track largest contentful paint
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.trackEvent('largest_contentful_paint', {
                    value: lastEntry.startTime
                });
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }
    
    sendToAnalytics(event) {
        // Implement your analytics service integration here
        // Example: Google Analytics, Mixpanel, etc.
    }
}

/**
 * ERROR HANDLER
 * Centralized error handling and reporting
 */
class ErrorHandler {
    constructor() {
        this.errors = [];
        this.maxErrors = 50;
    }
    
    handleError(error) {
        const errorInfo = {
            message: error.message || 'Unknown error',
            stack: error.stack || '',
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };
        
        this.errors.push(errorInfo);
        
        // Keep only recent errors
        if (this.errors.length > this.maxErrors) {
            this.errors = this.errors.slice(-this.maxErrors);
        }
        
        console.error('🚨 Error caught:', errorInfo);
        
        // Report to error tracking service if configured
        this.reportError(errorInfo);
    }
    
    reportError(errorInfo) {
        // Implement your error reporting service here
        // Example: Sentry, Bugsnag, etc.
    }
    
    getErrorReport() {
        return {
            errors: this.errors,
            userAgent: navigator.userAgent,
            url: window.location.href,
            timestamp: new Date().toISOString()
        };
    }
}

// Initialize the application
let app = null;

function initializeApp() {
    try {
        app = new GlenferdinzaApp();
        window.glenferdinzaApp = app; // Make available globally for debugging
    } catch (error) {
        console.error('Failed to initialize app:', error);
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GlenferdinzaApp,
        ThemeController,
        AnalyticsController,
        ErrorHandler
    };
}

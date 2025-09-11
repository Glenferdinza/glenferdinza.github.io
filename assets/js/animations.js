/**
 * Animation System - Protected
 * Copyright (c) 2025 Glenferdinza
 */

(function() {
    'use strict';
    
    const _0x4e5f = ['AnimationController', 'init', 'observers'];
    
    class AnimationController {
    constructor() {
        this.observers = [];
        this.typingAnimation = null;
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.initTypingAnimation();
        this.setupButtonAnimations();
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        const elementsToObserve = document.querySelectorAll('.card, .btn, .social-icon');
        elementsToObserve.forEach(el => observer.observe(el));
        
        this.observers.push(observer);
    }
    
    initTypingAnimation() {
        const typingElement = document.getElementById('typingText');
        if (typingElement) {
            this.typingAnimation = new TypingAnimation(typingElement);
        }
    }
    
    setupButtonAnimations() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            // Simple hover effect
            button.addEventListener('mouseenter', (e) => {
                this.createSimpleHoverEffect(e, button);
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }
    
    createSimpleHoverEffect(event, element) {
        element.style.transform = 'translateY(-2px)';
    }
}

/**
 * TYPING ANIMATION
 * Creates typewriter effect for dynamic text
 */
class TypingAnimation {
    constructor(element) {
        this.element = element;
        this.phrases = [
            'Building innovative web solutions',
            'Creating intelligent ML systems',
            'Designing user experiences',
            'Developing scalable applications'
        ];
        this.currentPhraseIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.speed = 100;
        this.deleteSpeed = 50;
        this.pauseTime = 2000;
        
        this.init();
    }
    
    init() {
        this.type();
    }
    
    type() {
        const currentPhrase = this.phrases[this.currentPhraseIndex];
        
        if (this.isDeleting) {
            // Deleting characters
            this.element.innerHTML = currentPhrase.substring(0, this.currentCharIndex) + 
                '<span class="typing-cursor">|</span>';
            this.currentCharIndex--;
            
            if (this.currentCharIndex < 0) {
                this.isDeleting = false;
                this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
                setTimeout(() => this.type(), 100);
                return;
            }
            
            setTimeout(() => this.type(), this.deleteSpeed);
        } else {
            // Typing characters
            this.element.innerHTML = currentPhrase.substring(0, this.currentCharIndex) + 
                '<span class="typing-cursor">|</span>';
            this.currentCharIndex++;
            
            if (this.currentCharIndex > currentPhrase.length) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.pauseTime);
                return;
            }
            
            setTimeout(() => this.type(), this.speed);
        }
    }
    
    destroy() {
        this.element.innerHTML = '';
    }
}

/**
 * SMOOTH SCROLL
 * Handles smooth scrolling for internal links
 */
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

/**
 * PERFORMANCE MONITOR
 * Monitors and optimizes performance
 */
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Disable animations on low-end devices
        if (this.isLowEndDevice()) {
            document.body.classList.add('reduced-motion');
        }
    }
    
    isLowEndDevice() {
        return navigator.hardwareConcurrency <= 2 || 
               navigator.deviceMemory <= 2;
    }
}

// Initialize animation system
let animationController = null;
let smoothScroll = null;
let performanceMonitor = null;

function initAnimations() {
    animationController = new AnimationController();
    smoothScroll = new SmoothScroll();
    performanceMonitor = new PerformanceMonitor();
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AnimationController,
        TypingAnimation,
        SmoothScroll,
        PerformanceMonitor
    };
}

})(); // Close wrapper

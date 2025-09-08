/**
 * CONSTELLATION BACKGROUND SYSTEM
 * Creates an animated star field with connecting lines
 * Professional implementation for Glenferdinza's landing page
 */

class ConstellationBackground {
    constructor() {
        this.canvas = document.getElementById('starCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.lines = [];
        this.animationId = null;
        this.mousePos = { x: 0, y: 0 };
        this.isMouseActive = false;
        
        // Configuration
        this.config = {
            starCount: 80,
            maxDistance: 120,
            starSizeMin: 1,
            starSizeMax: 2.5,
            starOpacityMin: 0.2,
            starOpacityMax: 0.6,
            lineOpacity: 0.1,
            mouseInfluenceRadius: 150,
            animationSpeed: 0.3,
            twinkleSpeed: 0.015,
            colors: {
                star: '#ffffff',
                line: '#4a90e2',
                mouseInfluence: '#6ab7ff'
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.createStars();
        this.setupEventListeners();
        this.animate();
    }
    
    setupCanvas() {
        const updateCanvasSize = () => {
            const pixelRatio = window.devicePixelRatio || 1;
            this.canvas.width = window.innerWidth * pixelRatio;
            this.canvas.height = window.innerHeight * pixelRatio;
            this.canvas.style.width = window.innerWidth + 'px';
            this.canvas.style.height = window.innerHeight + 'px';
            this.ctx.scale(pixelRatio, pixelRatio);
            
            // Recreate stars if canvas was resized
            if (this.stars.length > 0) {
                this.createStars();
            }
        };
        
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
    }
    
    createStars() {
        this.stars = [];
        
        for (let i = 0; i < this.config.starCount; i++) {
            const star = {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * (this.config.starSizeMax - this.config.starSizeMin) + this.config.starSizeMin,
                opacity: Math.random() * (this.config.starOpacityMax - this.config.starOpacityMin) + this.config.starOpacityMin,
                twinkleOffset: Math.random() * Math.PI * 2,
                velocityX: (Math.random() - 0.5) * 0.2,
                velocityY: (Math.random() - 0.5) * 0.2,
                originalX: 0,
                originalY: 0
            };
            
            star.originalX = star.x;
            star.originalY = star.y;
            
            this.stars.push(star);
        }
        
        this.updateConnections();
    }
    
    updateConnections() {
        this.lines = [];
        
        for (let i = 0; i < this.stars.length; i++) {
            for (let j = i + 1; j < this.stars.length; j++) {
                const star1 = this.stars[i];
                const star2 = this.stars[j];
                const distance = this.getDistance(star1.x, star1.y, star2.x, star2.y);
                
                if (distance < this.config.maxDistance) {
                    this.lines.push({
                        star1: star1,
                        star2: star2,
                        distance: distance,
                        opacity: (1 - distance / this.config.maxDistance) * this.config.lineOpacity
                    });
                }
            }
        }
    }
    
    setupEventListeners() {
        // Mouse movement tracking
        document.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
            this.isMouseActive = true;
        });
        
        // Reset mouse influence when leaving window
        document.addEventListener('mouseleave', () => {
            this.isMouseActive = false;
        });
        
        // Pause animation when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimation();
            } else {
                this.resumeAnimation();
            }
        });
    }
    
    getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    
    updateStars(deltaTime) {
        this.stars.forEach(star => {
            // Twinkle effect
            star.opacity = this.config.starOpacityMin + 
                (this.config.starOpacityMax - this.config.starOpacityMin) * 
                (Math.sin(Date.now() * this.config.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5);
            
            // Subtle movement
            star.x += star.velocityX * deltaTime * this.config.animationSpeed;
            star.y += star.velocityY * deltaTime * this.config.animationSpeed;
            
            // Mouse influence
            if (this.isMouseActive) {
                const mouseDistance = this.getDistance(star.x, star.y, this.mousePos.x, this.mousePos.y);
                if (mouseDistance < this.config.mouseInfluenceRadius) {
                    const influence = 1 - (mouseDistance / this.config.mouseInfluenceRadius);
                    const angle = Math.atan2(star.y - this.mousePos.y, star.x - this.mousePos.x);
                    star.x += Math.cos(angle) * influence * 0.5;
                    star.y += Math.sin(angle) * influence * 0.5;
                }
            }
            
            // Boundary wrapping
            if (star.x < 0) star.x = window.innerWidth;
            if (star.x > window.innerWidth) star.x = 0;
            if (star.y < 0) star.y = window.innerHeight;
            if (star.y > window.innerHeight) star.y = 0;
            
            // Gentle pull back to original position
            const returnForce = 0.001;
            star.x += (star.originalX - star.x) * returnForce;
            star.y += (star.originalY - star.y) * returnForce;
        });
    }
    
    drawStars() {
        this.stars.forEach(star => {
            this.ctx.save();
            this.ctx.globalAlpha = star.opacity;
            this.ctx.fillStyle = this.config.colors.star;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add glow effect for larger stars
            if (star.size > 2) {
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = this.config.colors.star;
                this.ctx.fill();
            }
            
            this.ctx.restore();
        });
    }
    
    drawLines() {
        // Update connections dynamically
        this.updateConnections();
        
        this.lines.forEach(line => {
            this.ctx.save();
            this.ctx.globalAlpha = line.opacity;
            this.ctx.strokeStyle = this.config.colors.line;
            this.ctx.lineWidth = 0.5;
            this.ctx.beginPath();
            this.ctx.moveTo(line.star1.x, line.star1.y);
            this.ctx.lineTo(line.star2.x, line.star2.y);
            this.ctx.stroke();
            this.ctx.restore();
        });
    }
    
    drawMouseInfluence() {
        if (!this.isMouseActive) return;
        
        this.ctx.save();
        this.ctx.globalAlpha = 0.1;
        this.ctx.fillStyle = this.config.colors.mouseInfluence;
        this.ctx.beginPath();
        this.ctx.arc(this.mousePos.x, this.mousePos.y, this.config.mouseInfluenceRadius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }
    
    animate() {
        const deltaTime = 16.67; // Assuming 60fps
        
        // Clear canvas
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        // Update and draw
        this.updateStars(deltaTime);
        this.drawLines();
        this.drawStars();
        this.drawMouseInfluence();
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    pauseAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    resumeAnimation() {
        if (!this.animationId) {
            this.animate();
        }
    }
    
    destroy() {
        this.pauseAnimation();
        window.removeEventListener('resize', this.setupCanvas);
        document.removeEventListener('mousemove', this.setupEventListeners);
        document.removeEventListener('mouseleave', this.setupEventListeners);
        document.removeEventListener('visibilitychange', this.setupEventListeners);
    }
    
    // Public methods for customization
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.createStars();
    }
    
    setStarCount(count) {
        this.config.starCount = count;
        this.createStars();
    }
    
    setColors(colors) {
        this.config.colors = { ...this.config.colors, ...colors };
    }
}

// Initialize constellation when DOM is ready
let constellation = null;

function initConstellation() {
    if (document.getElementById('starCanvas')) {
        constellation = new ConstellationBackground();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConstellationBackground;
}

// Auto-initialize if not in module environment
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initConstellation);
    } else {
        initConstellation();
    }
}

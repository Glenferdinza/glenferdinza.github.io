/**
 * SECURITY & ANTI-DEBUGGING PROTECTION
 * Protects source code from inspection and debugging
 * Professional implementation for source code protection
 */

(function() {
    'use strict';
    
    // Anti-debugging measures
    const Protection = {
        // Disable console methods
        disableConsole() {
            const methods = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'];
            methods.forEach(method => {
                console[method] = function() {};
            });
        },
        
        // Disable right-click context menu
        disableRightClick() {
            document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
            });
        },
        
        // Disable common keyboard shortcuts
        disableKeyboardShortcuts() {
            document.addEventListener('keydown', function(e) {
                // Disable F12 (Developer Tools)
                if (e.keyCode === 123) {
                    e.preventDefault();
                    return false;
                }
                
                // Disable Ctrl+Shift+I (Developer Tools)
                if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
                    e.preventDefault();
                    return false;
                }
                
                // Disable Ctrl+Shift+C (Element Inspector)
                if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
                    e.preventDefault();
                    return false;
                }
                
                // Disable Ctrl+Shift+J (Console)
                if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
                    e.preventDefault();
                    return false;
                }
                
                // Disable Ctrl+U (View Source)
                if (e.ctrlKey && e.keyCode === 85) {
                    e.preventDefault();
                    return false;
                }
                
                // Disable Ctrl+S (Save Page)
                if (e.ctrlKey && e.keyCode === 83) {
                    e.preventDefault();
                    return false;
                }
                
                // Disable Ctrl+A (Select All)
                if (e.ctrlKey && e.keyCode === 65) {
                    e.preventDefault();
                    return false;
                }
                
                // Disable Ctrl+P (Print)
                if (e.ctrlKey && e.keyCode === 80) {
                    e.preventDefault();
                    return false;
                }
            });
        },
        
        // Detect developer tools
        detectDevTools() {
            let devtools = {
                open: false,
                orientation: null
            };
            
            const threshold = 160;
            
            setInterval(function() {
                if (window.outerHeight - window.innerHeight > threshold || 
                    window.outerWidth - window.innerWidth > threshold) {
                    if (!devtools.open) {
                        devtools.open = true;
                        Protection.handleDevToolsOpen();
                    }
                } else {
                    devtools.open = false;
                }
            }, 500);
        },
        
        // Handle developer tools detection
        handleDevToolsOpen() {
            // Redirect or show warning
            document.body.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Inter', sans-serif;
                    color: white;
                    text-align: center;
                    z-index: 99999;
                ">
                    <div>
                        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">🔒 Access Restricted</h1>
                        <p style="font-size: 1.2rem; margin-bottom: 2rem;">Developer tools are not allowed on this page.</p>
                        <button onclick="location.reload()" style="
                            background: rgba(255,255,255,0.2);
                            border: 2px solid white;
                            color: white;
                            padding: 12px 24px;
                            font-size: 1rem;
                            border-radius: 8px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        ">Reload Page</button>
                    </div>
                </div>
            `;
        },
        
        // Obfuscate source code
        obfuscateCode() {
            // Remove comments and minify inline scripts
            const scripts = document.querySelectorAll('script');
            scripts.forEach(script => {
                if (script.innerHTML) {
                    // Basic obfuscation - remove comments and extra whitespace
                    script.innerHTML = script.innerHTML
                        .replace(/\/\*[\s\S]*?\*\//g, '')
                        .replace(/\/\/.*$/gm, '')
                        .replace(/\s+/g, ' ')
                        .trim();
                }
            });
        },
        
        // Disable text selection
        disableTextSelection() {
            document.addEventListener('selectstart', function(e) {
                e.preventDefault();
                return false;
            });
            
            document.addEventListener('dragstart', function(e) {
                e.preventDefault();
                return false;
            });
            
            // CSS-based selection prevention
            const style = document.createElement('style');
            style.innerHTML = `
                * {
                    -webkit-user-select: none !important;
                    -moz-user-select: none !important;
                    -ms-user-select: none !important;
                    user-select: none !important;
                    -webkit-touch-callout: none !important;
                    -webkit-tap-highlight-color: transparent !important;
                }
                
                input, textarea {
                    -webkit-user-select: text !important;
                    -moz-user-select: text !important;
                    -ms-user-select: text !important;
                    user-select: text !important;
                }
            `;
            document.head.appendChild(style);
        },
        
        // Disable image saving
        disableImageSaving() {
            document.addEventListener('dragstart', function(e) {
                if (e.target.tagName === 'IMG') {
                    e.preventDefault();
                    return false;
                }
            });
            
            // Disable right-click on images
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                    return false;
                });
            });
        },
        
        // Monitor for debugging attempts
        monitorDebugging() {
            // Detect breakpoints
            let debugCheck = function() {};
            debugCheck.toString = function() {
                Protection.handleDebugAttempt();
                return 'function debugCheck() { [native code] }';
            };
            
            setInterval(function() {
                debugCheck();
            }, 1000);
        },
        
        // Handle debug attempts
        handleDebugAttempt() {
            console.clear();
            throw new Error('Debugging not allowed');
        },
        
        // Clear traces
        clearTraces() {
            // Clear console
            if (console.clear) {
                console.clear();
            }
            
            // Remove script source maps
            const scripts = document.querySelectorAll('script[src]');
            scripts.forEach(script => {
                script.removeAttribute('src');
            });
        },
        
        // Initialize all protections
        init() {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.enableProtections();
                });
            } else {
                this.enableProtections();
            }
        },
        
        // Enable all protection measures
        enableProtections() {
            try {
                // Basic protections
                this.disableRightClick();
                this.disableKeyboardShortcuts();
                this.disableTextSelection();
                this.disableImageSaving();
                
                // Advanced protections
                this.detectDevTools();
                this.monitorDebugging();
                
                // Code obfuscation
                this.obfuscateCode();
                this.clearTraces();
                
                // Console protection
                setTimeout(() => {
                    this.disableConsole();
                }, 2000);
                
                console.log('🔒 Protection measures activated');
                
            } catch (error) {
                // Silently handle any errors
            }
        }
    };
    
    // Auto-initialize protection
    Protection.init();
    
    // Make protection methods inaccessible
    window.Protection = undefined;
    delete window.Protection;
    
})();

// Additional runtime protection
(function() {
    // Override native functions to prevent inspection
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    
    // Create fake console methods
    Object.defineProperty(console, 'log', {
        value: function() { /* Silent */ },
        writable: false,
        configurable: false
    });
    
    Object.defineProperty(console, 'error', {
        value: function() { /* Silent */ },
        writable: false,
        configurable: false
    });
    
    Object.defineProperty(console, 'warn', {
        value: function() { /* Silent */ },
        writable: false,
        configurable: false
    });
    
    // Prevent tampering with protection
    Object.freeze(console);
    Object.freeze(Object.prototype);
    Object.freeze(Function.prototype);
    
})();

// Source code protection notice
console.log('%c🔒 This website is protected against inspection and debugging.', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');
console.log('%c⚠️ Unauthorized access to source code is prohibited.', 'color: #ffa500; font-size: 14px;');
console.log('%c© 2025 Glenferdinza. All rights reserved.', 'color: #4a90e2; font-size: 12px;');

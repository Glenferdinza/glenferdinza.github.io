/**
 * Security Protection System
 * Copyright (c) 2025 Glenferdinza
 */

(function() {
    'use strict';
    
    const Protection = {
        // Disable console methods
        disableConsole() {
            const methods = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'];
            methods.forEach(method => {
                console[method] = function() {};
            });
        },
        
        // Hide assets in debugger (keep right-click enabled)
        hideDebuggerAssets() {
            // This method is kept but disabled for better UX
            // Users can right-click, but debugger won't show clear source
        },
        
        // Light keyboard protection (only block view source)
        lightKeyboardProtection() {
            document.addEventListener('keydown', function(e) {
                // Only disable Ctrl+U (View Source) to hide raw code
                if (e.ctrlKey && e.keyCode === 85) {
                    e.preventDefault();
                    return false;
                }
            });
        },
        
        // Subtle debugger obfuscation (no redirect)
        obfuscateDebugger() {
            // Create noise in debugger without blocking access
            const createDebuggerNoise = () => {
                // Add fake variables and functions to confuse debugger
                const _fakeVar1 = 'decoy_data_' + Math.random();
                const _fakeVar2 = 'noise_' + Date.now();
                const _fakeFunction = function() { return 'protected'; };
                
                // Make debugging harder but not impossible
                return { _fakeVar1, _fakeVar2, _fakeFunction };
            };
            
            setInterval(createDebuggerNoise, 1000);
        },
        
        // Advanced source code obfuscation for debugger
        obfuscateCode() {
            // Remove comments and minify inline scripts
            const scripts = document.querySelectorAll('script');
            scripts.forEach(script => {
                if (script.innerHTML) {
                    // Advanced obfuscation
                    script.innerHTML = script.innerHTML
                        .replace(/\/\*[\s\S]*?\*\//g, '')
                        .replace(/\/\/.*$/gm, '')
                        .replace(/\s+/g, ' ')
                        .replace(/function\s+(\w+)/g, 'function _$1')
                        .replace(/class\s+(\w+)/g, 'class _$1')
                        .replace(/const\s+(\w+)/g, 'const _$1')
                        .replace(/let\s+(\w+)/g, 'let _$1')
                        .replace(/var\s+(\w+)/g, 'var _$1')
                        .trim();
                }
            });
            
            // Create dummy scripts to confuse debugger
            this.createDecoyScripts();
        },
        
        // Create decoy scripts to hide real assets
        createDecoyScripts() {
            const decoyCount = 5;
            for (let i = 0; i < decoyCount; i++) {
                const decoyScript = document.createElement('script');
                decoyScript.textContent = `
                    // Decoy Script ${i + 1}
                    (function() {
                        const _decoy${i} = {
                            init: function() { return 'decoy_${i}_${Math.random()}'; },
                            process: function() { return Math.random() * 1000; },
                            data: 'protected_content_${Date.now()}'
                        };
                        window._decoy${i} = _decoy${i};
                    })();
                `;
                document.head.appendChild(decoyScript);
            }
        },
        
        // Light selection protection (allow normal selection)
        lightSelectionProtection() {
            // Only prevent drag on images, allow text selection
            document.addEventListener('dragstart', function(e) {
                if (e.target.tagName === 'IMG') {
                    e.preventDefault();
                    return false;
                }
            });
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
        
        // Advanced trace clearing
        clearTraces() {
            // Clear console
            if (console.clear) {
                console.clear();
            }
            
            // Don't remove src attributes, but obfuscate them
            const scripts = document.querySelectorAll('script[src]');
            scripts.forEach((script, index) => {
                // Create shadow scripts to confuse debugger sources panel
                const shadowScript = script.cloneNode(true);
                shadowScript.src = `./assets/js/shadow_${index}_${Math.random().toString(36).substr(2, 9)}.js`;
                shadowScript.style.display = 'none';
                document.head.appendChild(shadowScript);
            });
            
            // Add fake source maps
            this.addFakeSourceMaps();
        },
        
        // Add fake source maps to confuse debugger
        addFakeSourceMaps() {
            const fakeSourceMaps = [
                '//# sourceMappingURL=fake1.js.map',
                '//# sourceMappingURL=fake2.js.map',
                '//# sourceMappingURL=fake3.js.map'
            ];
            
            fakeSourceMaps.forEach((map, index) => {
                const fakeScript = document.createElement('script');
                fakeScript.textContent = `console.log('Fake source ${index}'); ${map}`;
                document.head.appendChild(fakeScript);
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
        
        // Enable subtle protection measures
        enableProtections() {
            try {
                // Light protections - keep UX friendly
                this.lightKeyboardProtection(); // Only block Ctrl+U
                this.lightSelectionProtection(); // Only prevent image drag
                this.disableImageSaving();
                
                // Debugger obfuscation without blocking
                this.obfuscateDebugger();
                this.monitorDebugging();
                
                // Code obfuscation
                this.obfuscateCode();
                this.clearTraces();
                
                // Light console protection (delay to allow initial logs)
                setTimeout(() => {
                    this.disableConsole();
                }, 3000);
                
                // Protection measures activated
                
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
// This website is protected against inspection and debugging
// Unauthorized access to source code is prohibited
// Copyright 2025 Glenferdinza. All rights reserved.

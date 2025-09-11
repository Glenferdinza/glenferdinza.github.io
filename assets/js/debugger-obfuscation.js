/**
 * Debugger Obfuscation System
 * Copyright (c) 2025 Glenferdinza
 */

(function() {
    'use strict';
    
    const DebuggerObfuscator = {
        
        // Create fake breakpoints to confuse debugger
        createFakeBreakpoints() {
            const fakeBreakpoints = [];
            for (let i = 0; i < 20; i++) {
                const fakeFunction = new Function(`
                    // Fake breakpoint ${i}
                    const _bp${i} = function() {
                        const _data = 'breakpoint_${i}_${Math.random()}';
                        return _data;
                    };
                    return _bp${i};
                `);
                fakeBreakpoints.push(fakeFunction());
            }
            window._fakeBreakpoints = fakeBreakpoints;
        },
        
        // Pollute the global scope to hide real variables
        polluteGlobalScope() {
            const polluteVars = [
                'GlenferdinzaApp', 'ConstellationBackground', 'AnimationController', 
                'app', 'constellation', 'animationController', 'protection',
                'init', 'setup', 'config', 'data', 'controller', 'system'
            ];
            
            polluteVars.forEach(varName => {
                const fakeVar = `_fake_${varName}_${Math.random().toString(36).substr(2, 5)}`;
                window[fakeVar] = {
                    init: () => 'fake_' + Math.random(),
                    data: 'protected_content',
                    type: 'decoy'
                };
            });
        },
        
        // Create fake DOM elements to hide real structure
        createFakeDOMElements() {
            const fakeElements = [
                'fake-constellation', 'fake-animation', 'fake-main',
                'fake-profile', 'fake-buttons', 'fake-social'
            ];
            
            fakeElements.forEach(elementId => {
                const fakeElement = document.createElement('div');
                fakeElement.id = elementId;
                fakeElement.style.display = 'none';
                fakeElement.innerHTML = `<!-- Fake element: ${elementId} -->`;
                document.body.appendChild(fakeElement);
            });
        },
        
        // Confuse the sources panel with fake files
        confuseSourcesPanel() {
            const fakeSourceCode = `
                /**
                 * FAKE SOURCE FILE
                 * This is a decoy to confuse source inspection
                 */
                
                class FakeApp {
                    constructor() {
                        this.fakeData = 'This is not the real source code';
                        this.init();
                    }
                    
                    init() {
                        console.log('Fake initialization');
                        this.setupFakeElements();
                    }
                    
                    setupFakeElements() {
                        const fakeConfig = {
                            theme: 'fake-theme',
                            animations: false,
                            protection: 'enabled'
                        };
                        return fakeConfig;
                    }
                }
                
                const fakeApp = new FakeApp();
            `;
            
            // Create multiple fake source blocks
            for (let i = 0; i < 3; i++) {
                const fakeScript = document.createElement('script');
                fakeScript.textContent = fakeSourceCode.replace(/Fake/g, `Fake${i}`);
                fakeScript.setAttribute('data-source', `fake-source-${i}.js`);
                document.head.appendChild(fakeScript);
            }
        },
        
        // Dynamic function name obfuscation
        obfuscateFunctionNames() {
            // Override Function.prototype.toString to hide real function content
            const originalToString = Function.prototype.toString;
            Function.prototype.toString = function() {
                const funcName = this.name || 'anonymous';
                return `function ${funcName}() { [Protected Code] }`;
            };
        },
        
        // Network tab obfuscation
        obfuscateNetworkRequests() {
            // Create fake network requests to hide real asset loading
            const fakeRequests = [
                './assets/js/fake-main.js',
                './assets/js/fake-animation.js',
                './assets/js/fake-constellation.js',
                './assets/css/fake-styles.css'
            ];
            
            fakeRequests.forEach(url => {
                fetch(url).catch(() => {
                    // Silently fail, just to show in network tab
                });
            });
        },
        
        // Console obfuscation
        obfuscateConsole() {
            const originalMethods = {};
            const consoleMethods = ['log', 'error', 'warn', 'info', 'debug'];
            
            consoleMethods.forEach(method => {
                originalMethods[method] = console[method];
                console[method] = function(...args) {
                    // Add fake log entries to confuse console inspection
                    if (Math.random() > 0.7) {
                        originalMethods[method].call(console, 'Fake log entry:', Math.random());
                    }
                    // Still allow some real logs but mixed with fake ones
                    if (Math.random() > 0.3) {
                        originalMethods[method].apply(console, args);
                    }
                };
            });
        },
        
        // Initialize all obfuscation methods
        init() {
            // Delay execution to avoid breaking page load
            setTimeout(() => {
                this.createFakeBreakpoints();
                this.polluteGlobalScope();
                this.createFakeDOMElements();
                this.confuseSourcesPanel();
                this.obfuscateFunctionNames();
                this.obfuscateNetworkRequests();
                
                // Console obfuscation with delay
                setTimeout(() => {
                    this.obfuscateConsole();
                }, 2000);
                
                // Advanced debugger obfuscation activated
            }, 1000);
        }
    };
    
    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            DebuggerObfuscator.init();
        });
    } else {
        DebuggerObfuscator.init();
    }
    
    // Hide the obfuscator itself
    window.DebuggerObfuscator = undefined;
    delete window.DebuggerObfuscator;
    
})();

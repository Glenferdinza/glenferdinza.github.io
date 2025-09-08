/**
 * SERVICE WORKER
 * Provides offline functionality and caching
 * Version 1.0.0
 */

const CACHE_NAME = 'glenferdinza-landing-v1.0.0';
const STATIC_CACHE = 'glenferdinza-static-v1.0.0';
const DYNAMIC_CACHE = 'glenferdinza-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/assets/css/styles.css',
    '/assets/js/main.js',
    '/assets/js/animations.js',
    '/assets/js/constellation.js',
    '/assets/images/profile.jpg',
    '/manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap'
];

// Files to cache on demand
const DYNAMIC_ASSETS = [
    'https://fonts.gstatic.com/',
    'https://cdnjs.cloudflare.com/'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Caching static assets...');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Static assets cached successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Failed to cache static assets:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && 
                            cacheName !== DYNAMIC_CACHE &&
                            cacheName !== CACHE_NAME) {
                            console.log(' Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
    const { request } = event;
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip Chrome extension requests
    if (request.url.startsWith('chrome-extension://')) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    return cachedResponse;
                }
                
                // Otherwise fetch from network
                return fetch(request)
                    .then((response) => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Check if it's a dynamic asset we should cache
                        const shouldCache = DYNAMIC_ASSETS.some(asset => 
                            request.url.includes(asset)
                        );
                        
                        if (shouldCache) {
                            // Clone the response for caching
                            const responseToCache = response.clone();
                            
                            caches.open(DYNAMIC_CACHE)
                                .then((cache) => {
                                    cache.put(request, responseToCache);
                                });
                        }
                        
                        return response;
                    })
                    .catch(() => {
                        // Return offline page for navigation requests
                        if (request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        
                        // Return placeholder for images
                        if (request.destination === 'image') {
                            return new Response(
                                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#666">Image unavailable</text></svg>',
                                { headers: { 'Content-Type': 'image/svg+xml' } }
                            );
                        }
                    });
            })
    );
});

// Background sync for analytics
self.addEventListener('sync', (event) => {
    if (event.tag === 'analytics-sync') {
        event.waitUntil(syncAnalytics());
    }
});

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        
        const options = {
            body: data.body,
            icon: '/assets/images/profile.jpg',
            badge: '/assets/images/favicon.ico',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            },
            actions: [
                {
                    action: 'explore',
                    title: 'View Profile',
                    icon: '/assets/images/profile.jpg'
                },
                {
                    action: 'close',
                    title: 'Close',
                    icon: '/assets/images/favicon.ico'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
});

// Helper function to sync analytics data
async function syncAnalytics() {
    try {
        // Get stored analytics data
        const cache = await caches.open(DYNAMIC_CACHE);
        const analyticsData = await cache.match('/analytics-data');
        
        if (analyticsData) {
            const data = await analyticsData.json();
            
            // Send to analytics service
            await fetch('/api/analytics', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            // Remove from cache after successful sync
            await cache.delete('/analytics-data');
        }
    } catch (error) {
        console.error('Failed to sync analytics:', error);
    }
}

// Periodic cleanup
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'cleanup') {
        event.waitUntil(performCleanup());
    }
});

async function performCleanup() {
    try {
        const cache = await caches.open(DYNAMIC_CACHE);
        const requests = await cache.keys();
        
        // Remove old cached items (older than 7 days)
        const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        
        for (const request of requests) {
            const response = await cache.match(request);
            const dateHeader = response.headers.get('date');
            
            if (dateHeader) {
                const responseDate = new Date(dateHeader).getTime();
                if (responseDate < oneWeekAgo) {
                    await cache.delete(request);
                }
            }
        }
    } catch (error) {
        console.error('Cleanup failed:', error);
    }
}

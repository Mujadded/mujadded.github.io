const CACHE_NAME = 'mj-alif-portfolio-v1.2.0';
const APP_SHELL_CACHE = 'app-shell-v1.2.0';
const RUNTIME_CACHE = 'runtime-v1.2.0';

// App Shell - Critical resources that should be cached immediately
const APP_SHELL_FILES = [
    '/',
    '/index.html',
    '/css/style.css',
    '/css/animations.css',
    '/js/main.js',
    '/manifest.json',
    // Favicon and PWA icons
    '/assets/images/favicon.ico',
    '/assets/images/favicon-32x32.png',
    '/assets/images/favicon-16x16.png',
    '/assets/images/apple-touch-icon.png',
    '/assets/images/android-chrome-192x192.png',
    '/assets/images/android-chrome-512x512.png',
    '/assets/images/logo.png',
    // Add critical fonts
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Runtime caching - Images and other assets
const RUNTIME_CACHE_URLS = [
    '/assets/',
    'https://fonts.gstatic.com/',
    'https://cdnjs.cloudflare.com/',
    'https://miro.medium.com/'
];

// Install event - Cache app shell
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');

    event.waitUntil(
        Promise.all([
            // Cache app shell with individual error handling
            cacheAppShell(),
            // Skip waiting to activate immediately
            self.skipWaiting()
        ])
    );
});

// Cache app shell files individually to handle failures gracefully
async function cacheAppShell() {
    try {
        const cache = await caches.open(APP_SHELL_CACHE);
        console.log('[SW] Caching app shell files...');

        // Cache files individually to prevent single failures from breaking everything
        const cachePromises = APP_SHELL_FILES.map(async(url) => {
            try {
                console.log('[SW] Caching:', url);
                await cache.add(url);
                console.log('[SW] ✅ Cached successfully:', url);
            } catch (error) {
                console.warn('[SW] ⚠️ Failed to cache:', url, error.message);
                // Continue with other files instead of failing completely
            }
        });

        await Promise.allSettled(cachePromises);
        console.log('[SW] App shell caching completed');
    } catch (error) {
        console.error('[SW] ❌ Error setting up app shell cache:', error);
    }
}

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');

    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== APP_SHELL_CACHE &&
                            cacheName !== RUNTIME_CACHE &&
                            cacheName !== CACHE_NAME) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            // Take control of all pages
            self.clients.claim()
        ])
    );
});

// Fetch event - Implement caching strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const { url, method } = request;

    // Only handle GET requests
    if (method !== 'GET') return;

    // Handle app shell requests - Cache first strategy
    if (APP_SHELL_FILES.some(shellUrl => url.includes(shellUrl))) {
        event.respondWith(cacheFirst(request, APP_SHELL_CACHE));
        return;
    }

    // Handle images - Cache first with fallback
    if (request.destination === 'image' || url.includes('/assets/')) {
        event.respondWith(cacheFirstWithFallback(request, RUNTIME_CACHE));
        return;
    }

    // Handle fonts and external resources - Stale while revalidate
    if (RUNTIME_CACHE_URLS.some(cacheUrl => url.includes(cacheUrl))) {
        event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
        return;
    }

    // Handle API calls or other requests - Network first
    if (url.includes('/api/') || url.includes('localhost') || url.includes('127.0.0.1')) {
        event.respondWith(networkFirst(request, RUNTIME_CACHE));
        return;
    }

    // Default: Network first for everything else
    event.respondWith(networkFirst(request, RUNTIME_CACHE));
});

// Caching Strategies

// Cache first - Good for app shell and static assets
async function cacheFirst(request, cacheName) {
    try {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        const networkResponse = await fetch(request);

        if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            cache.put(request, responseClone);
        }

        return networkResponse;
    } catch (error) {
        console.error('[SW] Cache first failed:', error);
        return new Response('Offline content not available', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Cache first with fallback - Good for images
async function cacheFirstWithFallback(request, cacheName) {
    try {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        const networkResponse = await fetch(request);

        if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            cache.put(request, responseClone);
        }

        return networkResponse;
    } catch (error) {
        console.error('[SW] Cache first with fallback failed:', error);
        // Return a fallback image or offline indicator
        return new Response('', {
            status: 200,
            statusText: 'OK',
            headers: { 'Content-Type': 'image/svg+xml' }
        });
    }
}

// Stale while revalidate - Good for fonts and CSS
async function staleWhileRevalidate(request, cacheName) {
    try {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);

        // Fetch from network in background
        const networkPromise = fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
                const responseClone = networkResponse.clone();
                cache.put(request, responseClone);
            }
            return networkResponse;
        });

        // Return cached version immediately if available
        if (cachedResponse) {
            networkPromise.catch(() => {}); // Prevent unhandled rejection
            return cachedResponse;
        }

        // If no cache, wait for network
        return await networkPromise;
    } catch (error) {
        console.error('[SW] Stale while revalidate failed:', error);
        const cache = await caches.open(cacheName);
        return await cache.match(request) || new Response('Offline', { status: 503 });
    }
}

// Network first - Good for API calls and dynamic content
async function networkFirst(request, cacheName) {
    try {
        const networkResponse = await fetch(request);

        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(cacheName);
            const responseClone = networkResponse.clone();
            cache.put(request, responseClone);
        }

        return networkResponse;
    } catch (error) {
        console.error('[SW] Network first failed, trying cache:', error);
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        return new Response('Offline - Content not available', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Background sync for form submissions (if needed)
self.addEventListener('sync', (event) => {
    if (event.tag === 'contact-form') {
        event.waitUntil(handleFormSync());
    }
});

async function handleFormSync() {
    // Handle background form submissions
    console.log('[SW] Handling background sync for contact forms');
}

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
    if (event.data) {
        const options = {
            body: event.data.text(),
            vibrate: [200, 100, 200],
            tag: 'portfolio-notification',
            actions: [{
                action: 'view',
                title: 'View Portfolio'
            }]
        };

        event.waitUntil(
            self.registration.showNotification('MJ Alif Portfolio', options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    event.waitUntil(
        clients.matchAll().then((clientList) => {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return clients.openWindow('/');
        })
    );
});

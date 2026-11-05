const CACHE_NAME = 'labvirtual-cache-v1';
const urlsToCache = [

    './index.html',
    './styles.css',
    './quimica/index.html',
    './quimica/bicarbonato.html',
    './quimica/dilucion.html',
    './fisica/index.html',
    './fisica/mru.html'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Interceptar peticiones para servir desde la caché offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
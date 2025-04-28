const CACHE_NAME = 'api-cache-v1';
const API_URL = 'https://api.example.com/data';

self.addEventListener('install', event => {
  self.skipWaiting(); // active le SW immédiatement après l'installation
});

self.addEventListener('fetch', event => {
  if (event.request.url === API_URL) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone la réponse pour la mettre en cache
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // En cas d'échec réseau, retourner la version en cache
          return caches.match(event.request);
        })
    );
  }
});
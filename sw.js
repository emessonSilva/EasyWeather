const cacheName = "sw-page-v1";

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        './index.html',
        './style.css',
        './assets/webapp-logo.avif',
        './assets/icons/android/android-launchericon-48-48.png',
        './assets/icons/android/android-launchericon-72-72.png',
        './assets/icons/android/android-launchericon-96-96.png',
        './assets/icons/android/android-launchericon-144-144.png',
        './assets/icons/android/android-launchericon-512-512.png'
      ]))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cache => cache !== cacheName).map(cache => caches.delete(cache))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        return caches.open(cacheName).then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(error => {
      console.error('Error fetching:', error);
      return new Response('No internet connection', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({
          'Content-Type': 'text/plain'
        })
      });
    })
  );
});

self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

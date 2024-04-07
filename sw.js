
const cacheName = "sw-page";

self.addEventListener('install', event => {

  self.skipWaiting();

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
        './assets/icons/android/android-launchericon-512-512.png',
        './assets/icons/android/android-launchericon-512-512.png'

      ]))
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  //Atualizacao internet
  event.respondWith(async function () {
    try {
      return await fetch(event.request);
    } catch (err) {
      return caches.match(event.request);
    }
  }());

  //Atualizacao cache
  /*event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );*/

});
const cacheName = "sw-page";

self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll([
          './index.html',
          './style.css',
          './assets/webapp-logo.avif',
          './assets/icons/android/android-launchericon-48-48.png',
          './assets/icons/android/android-launchericon-72-72.png',
          './assets/icons/android/android-launchericon-96-96.png',
          './assets/icons/android/android-launchericon-144-144.png',
          './assets/icons/android/android-launchericon-192-192.png',
          './assets/icons/android/android-launchericon-512-512.png',
          './assets/icons/ios/16.png',
          './assets/icons/ios/20.png',
          './assets/icons/ios/29.png',
          './assets/icons/ios/32.png',
          './assets/icons/ios/40.png',
          './assets/icons/ios/50.png',
          './assets/icons/ios/57.png',
          './assets/icons/ios/58.png',
          './assets/icons/ios/60.png',
          './assets/icons/ios/64.png',
          './assets/icons/ios/72.png',
          './assets/icons/ios/76.png',
          './assets/icons/ios/80.png',
          './assets/icons/ios/87.png',
          './assets/icons/ios/100.png',
          './assets/icons/ios/114.png',
          './assets/icons/ios/120.png',
          './assets/icons/ios/128.png',
          './assets/icons/ios/167.png',
          './assets/icons/ios/180.png',
          './assets/icons/ios/192.png',
          './assets/icons/ios/256.png',
          './assets/icons/ios/512.png',
          './assets/icons/ios/1024.png'
        ]);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(error => {
        console.error('Error in fetching:', error);
      })
  );
});

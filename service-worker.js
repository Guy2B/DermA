const CACHE_NAME = "dermalida-v1";

const ASSETS = [
  "DermAlidaBeauty_v5_ios.html",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(event.request).catch(() => caches.match("DermAlidaBeauty_v5_ios.html"))
      );
    })
  );
});

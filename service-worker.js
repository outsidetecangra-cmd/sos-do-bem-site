const CACHE_NAME = "sos-do-bem-v5";
const FRESH_PATHS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/data/carousel.json",
  "/assets/site.js",
  "/assets/carrossel/"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll([
      "./",
      "index.html",
      "assets/styles.css",
      "assets/logo/logo-sos-do-bem.png"
    ]))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const isNavigation = event.request.mode === "navigate";
  const shouldStayFresh = FRESH_PATHS.some(path => url.pathname.endsWith(path) || url.pathname.includes(path));

  if (isNavigation || shouldStayFresh) {
    event.respondWith(
      fetch(event.request, { cache: "no-store" }).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }))
  );
});

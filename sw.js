/* Página offline: cuando no hay conexión, cualquier navegación muestra el 404 de Benny */
const CACHE = "benny-offline-v1";
const ruta = f => new URL(f, self.location).pathname;
const OFFLINE_URL = ruta("404.html");
const ASSETS = [
  OFFLINE_URL,
  ruta("fonts/fraunces-latin.woff2"),
  ruta("fonts/jetbrainsmono-latin.woff2"),
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).catch(() => caches.match(OFFLINE_URL)));
  } else if (url.origin === self.location.origin && ASSETS.includes(url.pathname)) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});

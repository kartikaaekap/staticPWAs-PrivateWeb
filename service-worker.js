const CACHE_NAME = "web-kartika-v1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/manifest.json",
  "/images/A.jpg",
  "/images/bendahara.jpeg",
  "/images/dart.jpg",
  "/images/frontend.jpg",
  "/images/logo.png",
  "/images/M.jpg",
  "/images/pink.jpg",
  "/images/sakura.jpg",
  "/images/TC.jpeg",
  "/images/web-dasar.jpg",
  "/pages/home.html",
  "/pages/experiences.html",
  "/pages/certificates.html",
  "/pages/contact.html",
  "/css/materialize.min.css",
  "/css/certificates.css",
  "/css/contact.css",
  "/css/experiences.css",
  "/css/footer.css",
  "/css/home.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "/icon.png"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });
  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
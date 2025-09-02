self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('disha-images-cache').then(function (cache) {
            return cache.addAll([
                // Add the URLs of the images you want to cache here
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function (response) {
                if (event.request.url.startsWith('https://firebasestorage.googleapis.com/v0/b/disha-website-34260.appspot.com/o/services/')) { // Update this path
                    return caches.open('disha-images-cache').then(function (cache) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                } else {
                    return response;
                }
            });
        })
    );
});


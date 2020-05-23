var Config = { 
	OFFLINE_PAGE: "/",  // pagina da servire in modalità offline
	CACHE_NAME : 'SN-cache'  // namespace della cache per l'applicazione
}; 
var urlsToCache = [
'/'
];
/**
** Install
*/
self.addEventListener('install', function(e) {
	console.log('PWA service worker installation');
	e.waitUntil(
		caches.open(Config.CACHE_NAME).then(function(cache) {
			console.log('Service worker caching dependencies');
			urlsToCache.map(function(url) {
				return cache.add(url).catch(function (reason) {
					return console.log('PWA: ' + String(reason) + ' ' + url);
				});
			});
		})
	);
});

/**
** Activate
*/
self.addEventListener('activate', function (e) {
	console.log('PWA service worker activation');
	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if ( key !== Config.CACHE_NAME ) {
					console.log('PWA old cache removed', key);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim(); // il service-worker prende il controllo rispetto ad altri precedenti
});

/**
** Fetch
*/

self.addEventListener('fetch', function(event) {
// console.log(event.request);

 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request).catch(error =>{
		 if(event.request.mode === "navigate" ||(event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html')))
			return caches.match(Config.OFFLINE_PAGE);
	 });
   })
 );
});
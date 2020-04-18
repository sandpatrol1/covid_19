self.addEventListener('install', async (event) => {
	console.log('install event');
});

self.addEventListener('fetch', async (event) => {
	console.log('fetch event');
});

const cacheName = 'covid-19';
const staticAssets = [ './', './index.html', './app.js', './country_code.js', './app.css' ];

self.addEventListener('install', async (event) => {
	const cache = await caches.open(cacheName);
	await cache.addAll(staticAssets);
});

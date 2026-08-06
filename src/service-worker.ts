/// <reference types="@sveltejs/kit" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { base, build, files, prerendered, version } from '$service-worker';

// `self` is a ServiceWorkerGlobalScope in this file, not a Window.
const sw = self as unknown as ServiceWorkerGlobalScope;

// `version` changes on every build, so each deploy gets a fresh cache.
const CACHE = `smartpad-${version}`;

// Everything needed to boot the app offline:
// - `build`: the hashed JS/CSS bundles
// - `files`: the contents of static/
// - `prerendered`: the prerendered HTML for each route (the app is ssr:false,
//   so these shells are what actually gets served on a cold offline load)
const PRECACHE = [...build, ...files, ...prerendered];

sw.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE)
			.then((cache) => cache.addAll(PRECACHE))
			.then(() => sw.skipWaiting())
	);
});

sw.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
			)
			.then(() => sw.clients.claim())
	);
});

sw.addEventListener('fetch', (event) => {
	const { request } = event;

	// Never interfere with anything but plain GETs, and never touch other origins
	// (or the browser extension / devtools schemes).
	if (request.method !== 'GET' || !request.url.startsWith(sw.location.origin)) return;

	// Range requests can't be served from the Cache API in a spec-correct way.
	if (request.headers.has('range')) return;

	event.respondWith(handle(request));
});

async function handle(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const cache = await caches.open(CACHE);

	// Immutable, content-hashed assets: always cache-first, they never change.
	if (PRECACHE.includes(url.pathname)) {
		const cached = await cache.match(url.pathname);
		if (cached) return cached;
	}

	try {
		const response = await fetch(request);

		// Opaque/error responses must not be cached — caching a 404 or an opaque
		// cross-origin response would poison the cache for the next load.
		if (response.status === 200 && response.type === 'basic') {
			cache.put(request, response.clone());
		}

		return response;
	} catch {
		// Offline. Serve whatever we have for this exact request…
		const cached = await cache.match(request);
		if (cached) return cached;

		// …and for navigations, fall back to the cached app shell so a cold
		// offline launch still boots instead of showing the browser error page.
		// `prerendered` exposes route paths (`${base}/`, `${base}/editor`) rather
		// than filenames, so the root route is the shell to match on.
		if (request.mode === 'navigate') {
			const shell = await cache.match(`${base}/`);
			if (shell) return shell;
		}

		return new Response('Offline', {
			status: 503,
			statusText: 'Offline',
			headers: { 'content-type': 'text/plain; charset=utf-8' }
		});
	}
}

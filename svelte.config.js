// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			precompress: false,
			strict: true
		}),
		paths: {
			// Replace 'your-repo-name' with the exact name of your GitHub repository
			base: process.env.NODE_ENV === 'production' ? '/smartpad' : ''
		}
	}
};

export default config;

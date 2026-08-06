import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
	plugins: [
		// Do not pass options here: any argument to sveltekit() makes SvelteKit ignore
		// svelte.config.js entirely. All config lives in svelte.config.js.
		sveltekit(),
		basicSsl()
	]
});

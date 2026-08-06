<script lang="ts">
	// eslint-disable-next-line svelte/valid-prop-names-in-kit-pages
	export const prerender = true;

	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>SmartPad</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

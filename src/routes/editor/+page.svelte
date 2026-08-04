<script lang="ts">
	import { setContext } from 'svelte';
	import { EditorState, KEY } from './state.svelte';
	import LineNumbers from './line-numbers.svelte';
	import TextEditor from './text-editor.svelte';

	const state = new EditorState();
	setContext(KEY, state);
</script>

<main>
	<LineNumbers />
	<TextEditor />
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
	}
</style>

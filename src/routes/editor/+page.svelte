<script lang="ts">
	import { setContext } from 'svelte';
	import { EditorState, KEY } from './state.svelte';
	import LineNumbers from './line-numbers.svelte';
	import TextEditor from './text-editor.svelte';
	import Keyboard from './keyboard.svelte';

	const context = new EditorState();
	setContext(KEY, context);
</script>

<main>
	<div class="core-editor">
		<LineNumbers />
		<TextEditor />
	</div>
	<Keyboard />
</main>

<style>
	main {
		width: 100vw;
		height: 100dvh;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-direction: column;

		.core-editor {
			width: 100%;
			flex: 1;
			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
		}
	}
</style>

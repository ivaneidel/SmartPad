<script lang="ts">
	import { setContext } from 'svelte';
	import { EditorState, KEY } from './state.svelte';
	import TextEditor from './text-editor.svelte';
	import LogicalKeyboard from './logical-keyboard.svelte';
	import { getTextFromSession } from '../../lib/utils/sessionStorage';

	const context = new EditorState();
	setContext(KEY, context);

	$effect(() => {
		const initialText = getTextFromSession();
		if (!context.editor.ref || !initialText) return;

		context.editor.ref.setRangeText(initialText);
	});

	const onSave = () => {
		const blob = new Blob([context.editor.content], { type: 'text/plain' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = 'new-file.txt';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(a.href);
	};
</script>

<main>
	<div class="core-editor">
		<TextEditor />
	</div>
	<LogicalKeyboard />
	<button class="save-button" onclick={onSave}>💾</button>
</main>

<style>
	main {
		position: relative;
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
			overflow: hidden;
			overflow-y: auto;
		}

		.save-button {
			all: unset;

			position: absolute;
			right: 0.2rem;
			top: 0.2rem;
			width: 2.4rem;
			height: 2.4rem;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 2;
			border-radius: 4px;
			background-color: var(--background-color-dark);
			cursor: pointer;
		}
	}
</style>

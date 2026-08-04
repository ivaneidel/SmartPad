<script lang="ts">
	import { getContext } from 'svelte';
	import { KEY, type EditorState } from './state.svelte';

	const state = getContext<EditorState>(KEY);

	const onKeyDown = (e: KeyboardEvent) => {
		const target = e.currentTarget as HTMLTextAreaElement;
		const start = target.selectionStart;
		const end = target.selectionEnd;

		if (e.key.toLowerCase() === 'tab') {
			e.preventDefault();
			target.setRangeText('\t', start, end, 'end');
			return;
		}

		if (e.key.toLowerCase() === 'enter') {
			const previousLine: string = state.editor.lines[state.editor.currentLine - 1];
			const leadingRegex = previousLine.match(/^(\s*)\S/m);
			const whiteSpace = leadingRegex?.at(1) || '';
			const startCharValue = leadingRegex?.at(0)?.replaceAll(whiteSpace, '') || '';
			const startChar = ['-', '*'].includes(startCharValue) ? `${startCharValue} ` : '';
			if (startChar || whiteSpace) {
				e.preventDefault();
				target.setRangeText(`\n${whiteSpace}${startChar}`, start, end, 'end');
			}
			return;
		}
	};
</script>

<textarea
	tabindex="0"
	contenteditable
	bind:this={state.editor.ref}
	bind:value={state.editor.content}
	oninput={state.updateCursor}
	onclick={state.updateCursor}
	onkeyup={state.updateCursor}
	onkeydown={onKeyDown}></textarea>

<style>
	textarea {
		all: unset;
		resize: none;

		width: 100%;
		height: 100%;
		padding: 0.4rem;
		line-height: 1.1rem;
		font-family: monospace;
	}
</style>

<script lang="ts">
	import { getContext } from 'svelte';
	import { KEY, type EditorState } from './state.svelte';

	const context = getContext<EditorState>(KEY);

	const onKeyDown = (e: KeyboardEvent) => {
		const target = e.currentTarget as HTMLTextAreaElement;
		const start = target.selectionStart;
		const end = target.selectionEnd;

		if (e.key.toLowerCase() === 'tab') {
			e.preventDefault();
			target.setRangeText('  ', start, end, 'end');
			return;
		}

		if (e.key.toLowerCase() === 'enter') {
			const previousLine: string = context.editor.lines[context.editor.currentLine - 1];
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
	autocapitalize="none"
	contenteditable
	bind:this={context.editor.ref}
	bind:value={context.editor.content}
	oninput={context.updateCursor}
	onclick={context.updateCursor}
	onkeyup={context.updateCursor}
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

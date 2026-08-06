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
			const previousLine: string = context.lines[context.currentLine - 1];
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

<div class="container">
	<div bind:this={context.editor.baseLineRef} class="base-line">M</div>
	<textarea
		tabindex="0"
		autocapitalize="none"
		contenteditable
		bind:this={context.editor.ref}
		bind:value={context.editor.content}
		onkeydown={onKeyDown}></textarea>
	<div class="mirror">
		{#each Object.entries(context.lines) as entry (entry[0])}
			<div bind:this={context.editor.mirror[Number(entry[0])]}>{entry[1] || ' '}</div>
		{/each}
	</div>
</div>

<style>
	.container {
		position: relative;
		width: 100%;
		height: 100%;
		textarea {
			all: unset;
			resize: none;

			width: 100%;
			min-height: 100%;
			padding: 0.4rem;
			line-height: 1.1rem;
			font-family: monospace;
			overflow-wrap: break-word;
			box-sizing: border-box;
			field-sizing: content;
		}
		.mirror {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			padding: 0.4rem;
			line-height: 1.1rem;
			font-family: monospace;
			white-space: break-spaces;
			visibility: hidden;
			z-index: -1;
		}
		.base-line {
			position: absolute;
			top: 0;
			line-height: 1.1rem;
			font-family: monospace;
			visibility: hidden;
			z-index: -1;
		}
	}
</style>

<script lang="ts">
	let editor: HTMLTextAreaElement;
	let editorContent = $state('');
	let lineCount = $derived(editorContent.split('\n').length);
	let lineNumbers = $derived([...Array(lineCount).keys()]);
	let cursorPosition = $state(0);
	let { cursorLines, activeLine } = $derived.by(() => {
		const cursorLines: { [x: number]: string } = {};
		const lines = editorContent.substring(0, cursorPosition).split('\n');
		lines.forEach((line, index) => (cursorLines[index] = line));
		const activeLine = lines.length;

		return { cursorLines, activeLine };
	});

	const updateCursor = () => {
		cursorPosition = editor.selectionStart;
	};

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
			const previousLine: string = cursorLines[activeLine - 1];
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

<main>
	<div class="line-numbers">
		{#each lineNumbers as number (number)}
			<span class={{ current: activeLine === number }}>{number + 1}</span>
		{/each}
	</div>
	<textarea
		class="text-editor"
		tabindex="0"
		contenteditable
		bind:this={editor}
		bind:value={editorContent}
		oninput={updateCursor}
		onclick={updateCursor}
		onkeyup={updateCursor}
		onkeydown={onKeyDown}></textarea>
</main>

<style>
	* {
		font-family: monospace;
	}

	main {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;

		.line-numbers {
			height: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: flex-end;
			flex-direction: column;
			width: fit-content;
			background-color: var(--background-color-dark);
			padding: 0.4rem;
			line-height: 1.1rem;

			span {
				color: var(--text-color-light);

				&.current {
					color: var(--text-color);
				}
			}
		}

		.text-editor {
			all: unset;
			resize: none;

			width: 100%;
			height: 100%;
			padding: 0.4rem;
			line-height: 1.1rem;
		}
	}
</style>

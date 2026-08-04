<script lang="ts">
	let editor: HTMLTextAreaElement;
	let editorContent = $state('');
	let lineCount = $derived(editorContent.split('\n').length);
	let lineNumbers = $derived([...Array(lineCount).keys()]);
	let cursorPosition = $state(0);
	let cursorLine = $derived(editorContent.substring(0, cursorPosition).split('\n').length - 1);

	const updateCursor = () => {
		cursorPosition = editor.selectionStart;
	};

	$inspect(cursorPosition, cursorLine);
</script>

<main>
	<div class="line-numbers">
		{#each lineNumbers as number (number)}
			<span class={{ current: cursorLine === number }}>{number + 1}</span>
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
		onkeyup={updateCursor}></textarea>
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

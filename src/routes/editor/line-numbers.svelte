<script lang="ts">
	import { getContext } from 'svelte';
	import { EditorState, KEY } from './state.svelte';

	const state = getContext<EditorState>(KEY);

	let lineNumbers = $derived([...Array(state.lineCount).keys()]);
</script>

<div>
	{#each lineNumbers as number (number)}
		<span class={{ current: state.editor.currentLine - 1 === number }}>{number + 1}</span>
	{/each}
</div>

<style>
	div {
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
			font-family: monospace;
			color: var(--text-color-light);

			&.current {
				color: var(--text-color);
			}
		}
	}
</style>

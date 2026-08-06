<script lang="ts">
	import { getContext } from 'svelte';
	import { EditorState, KEY } from './state.svelte';

	const context = getContext<EditorState>(KEY);

	let lineNumbers = $derived([...Array(context.lineCount).keys()]);
</script>

<div>
	{#each lineNumbers as number (number)}
		<span
			class={{ current: context.currentLine - 1 === number }}
			style="margin-bottom: {context.mirrorHeights[number]}px">{number + 1}</span
		>
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

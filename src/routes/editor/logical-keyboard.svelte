<script lang="ts">
	import { getContext } from 'svelte';
	import { KEY, type EditorState } from './state.svelte';
	import { LogicalKeys, logicalKeyToLabel, type LogicalKeyType } from './types';
	import {
		copyToClipboard,
		dupplicateCurrentLine,
		insertTab,
		pasteFromClipboard,
		selectAllText
	} from '../../lib/utils/keyboard';

	const context = getContext<EditorState>(KEY);

	const toggleKey = (e: Event, key: LogicalKeyType) => {
		if (!context.editor.ref) return;
		context.editor.ref.focus();

		console.log(key);

		switch (key) {
			case LogicalKeys.Copy:
				return copyToClipboard({ e, context });
			case LogicalKeys.Paste:
				return pasteFromClipboard({ e, context });
			case LogicalKeys.Tab:
				return insertTab({ e, context });
			case LogicalKeys.SelectAll:
				return selectAllText({ e, context });
			case LogicalKeys.DupplicateLine:
				return dupplicateCurrentLine({ e, context });
		}
	};
</script>

<div>
	{#each Object.keys(LogicalKeys) as key (key)}
		<button type="button" onclick={(e) => toggleKey(e, key as LogicalKeyType)}
			>{logicalKeyToLabel[key as LogicalKeyType]}</button
		>
	{/each}
</div>

<style>
	div {
		width: 100%;
		background-color: var(--background-color-darker);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		padding: 0.8rem;
		gap: 1rem;

		button {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 0.8rem;
			border: none;
			background-color: var(--background-color-dark);
			user-select: none;
			width: 2.8rem;
			height: 2.8rem;
			font-size: 0.8rem;

			&:active {
				background-color: var(--background-color);
			}
		}
	}
</style>

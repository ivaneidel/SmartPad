<script lang="ts">
	import { getContext } from 'svelte';
	import { KEY, type EditorState } from './state.svelte';
	import { PhysicalKeys, type PhysicalKeyType } from './types';
	import {
		copyToClipboard,
		insertTab,
		pasteFromClipboard,
		selectAllText
	} from '$lib/utils/keyboard';

	const context = getContext<EditorState>(KEY);

	let keysDown = $state<PhysicalKeyType[]>([]);

	const toggleKey = (e: Event, key: PhysicalKeyType) => {
		if (!context.editor.ref) return;
		context.editor.ref.focus();

		if (key === PhysicalKeys.Tab) {
			return insertTab({ e, context });
		}

		if (keysDown.includes(key)) {
			keysDown.splice(keysDown.indexOf(key));
		} else {
			keysDown.push(key);
		}
		keysDown = keysDown;
	};

	$effect(() => {
		const listener = async (e: Event) => {
			if (!context.editor.ref || !keysDown.length) return;
			const curretKeys = keysDown;
			keysDown = [];

			if (e instanceof InputEvent) {
				if (curretKeys.includes(PhysicalKeys.Ctrl) && curretKeys.length === 1) {
					if (e.data === 'c') {
						return copyToClipboard({ e, context });
					}

					if (e.data === 'v') {
						return pasteFromClipboard({ e, context });
					}

					if (e.data === 'a') {
						return selectAllText({ e, context });
					}
				}
			}
		};

		context.editor.ref?.addEventListener('beforeinput', listener);

		return () => {
			context.editor.ref?.removeEventListener('beforeinput', listener);
		};
	});
</script>

<div>
	{#each Object.keys(PhysicalKeys) as key (key)}
		<button
			type="button"
			onclick={(e) => toggleKey(e, key as PhysicalKeyType)}
			class={{ active: keysDown.includes(key as PhysicalKeyType) }}>{key}</button
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
			padding: 1rem;
			border-radius: 0.8rem;
			border: none;
			background-color: var(--background-color-dark);
			user-select: none;

			&.active {
				background-color: var(--background-color);
			}
		}
	}
</style>

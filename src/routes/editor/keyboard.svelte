<script lang="ts">
	import { getContext } from 'svelte';
	import { KEY, type EditorState } from './state.svelte';
	import { allKeys, Keys, type KeyType } from './types';

	const context = getContext<EditorState>(KEY);

	let keysDown = $state<KeyType[]>([]);

	const toggleKey = (key: KeyType) => {
		if (!context.editor.ref) return;
		context.editor.ref.focus();

		if (key === Keys.Tab) {
			context.editor.ref.setRangeText(
				'  ',
				context.editor.ref.selectionStart,
				context.editor.ref.selectionEnd,
				'end'
			);

			return;
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
				if (curretKeys.includes(Keys.Ctrl) && curretKeys.length === 1) {
					if (e.data === 'c') {
						e.preventDefault();
						const currentSelection = context.editor.content.substring(
							context.editor.ref.selectionStart,
							context.editor.ref.selectionEnd
						);
						await navigator.clipboard.writeText(currentSelection);
						return;
					}

					if (e.data === 'v') {
						e.preventDefault();
						const paste = await navigator.clipboard.readText();
						context.editor.ref.setRangeText(
							paste,
							context.editor.ref.selectionStart,
							context.editor.ref.selectionEnd,
							'end'
						);
						return;
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
	{#each allKeys as key (key)}
		<button
			type="button"
			onclick={() => toggleKey(key as KeyType)}
			class={{ active: keysDown.includes(key as KeyType) }}>{key}</button
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

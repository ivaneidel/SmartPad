<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { saveTextToSession } from '../lib/utils/sessionStorage';

	// const context = getContext<EditorState>(KEY);

	let files: FileList | null = $state(null);

	// Automatically parse the file whenever a new one is selected
	$effect(() => {
		if (!files || !files[0]) return;

		const file = files[0];
		const reader = new FileReader();

		// Fired when the file reading operation successfully completes
		reader.onload = (event) => {
			const initialText = event.target?.result?.toString() || '';
			saveTextToSession(initialText);
			goto(resolve('/editor'));
		};

		reader.readAsText(file);
	});
</script>

<main>
	<div class="file-picker">
		<label for="FP1">Open File</label>
		<input type="file" name="File Picker" id="FP1" bind:files multiple={false} />
	</div>
</main>

<style>
	main {
		width: 100vw;
		height: 100dvh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		overflow: hidden;

		.file-picker {
			width: 7rem;
			height: 7rem;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			border-radius: 1rem;
			overflow: hidden;
			background-color: var(--background-color);
			box-shadow: 5px 5px 0 0 var(--background-color-dark);
			border: 1px solid var(--background-color-dark);
			&:active {
				box-shadow: 2px 2px 0 0 var(--background-color-dark);
			}

			label {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			input {
				visibility: hidden;
			}
		}
	}
</style>

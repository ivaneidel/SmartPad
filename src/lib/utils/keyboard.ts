import type { EditorState } from '../../routes/editor/state.svelte';

type KeyboardActionsProps = {
	e: Event;
	context: EditorState;
};

type InsertKeyActionsProps = {
	e: Event;
	context: EditorState;
	key: string;
};

export const copyToClipboard = async ({ e, context }: KeyboardActionsProps) => {
	if (!context.editor.ref || !navigator.clipboard) return;

	e.preventDefault();
	const currentSelection = context.editor.ref.value.substring(
		context.editor.ref.selectionStart,
		context.editor.ref.selectionEnd
	);
	await navigator.clipboard.writeText(currentSelection);
};

export const pasteFromClipboard = async ({ e, context }: KeyboardActionsProps) => {
	if (!context.editor.ref || !navigator.clipboard) return;

	e.preventDefault();
	const paste = await navigator.clipboard.readText();
	context.editor.ref.setRangeText(
		paste,
		context.editor.ref.selectionStart,
		context.editor.ref.selectionEnd,
		'end'
	);
};

export const selectAllText = async ({ e, context }: KeyboardActionsProps) => {
	if (!context.editor.ref) return;

	e.preventDefault();
	context.editor.ref.selectionStart = 0;
	context.editor.ref.selectionEnd = context.editor.ref.value.length;
};

export const insertKey = async ({ e, context, key }: InsertKeyActionsProps) => {
	if (!context.editor.ref) return;

	e.preventDefault();
	context.editor.ref.setRangeText(
		key,
		context.editor.ref.selectionStart,
		context.editor.ref.selectionEnd,
		'end'
	);
};

export const insertTab = async ({ e, context }: KeyboardActionsProps) =>
	insertKey({ e, context, key: '  ' });

export const dupplicateCurrentLine = async ({ e, context }: KeyboardActionsProps) =>
	insertKey({ e, context, key: `\n${context.lines[context.currentLine - 1]}` });

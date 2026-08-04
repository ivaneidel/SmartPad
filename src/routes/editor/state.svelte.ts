export const KEY = Symbol.for('EDITOR_STATE');

type EditorType = {
	ref: HTMLTextAreaElement | undefined;
	content: string;
	cursorPosition: number;
	currentLine: number;
	lines: { [x: number]: string };
};

export class EditorState {
	editor = $state<EditorType>({
		ref: undefined,
		content: '',
		cursorPosition: 0,
		currentLine: 1,
		lines: {}
	});

	get lineCount() {
		return this.editor.content.split('\n').length;
	}

	updateCursor = () => {
		if (!this.editor.ref) return;

		this.editor.cursorPosition = this.editor.ref.selectionStart;

		const lines = this.editor.content.substring(0, this.editor.cursorPosition).split('\n');
		lines.forEach((line, index) => (this.editor.lines[index] = line));
		this.editor.currentLine = lines.length;
	};
}

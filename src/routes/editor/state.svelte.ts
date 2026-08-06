export const KEY = Symbol.for('EDITOR_STATE');

type EditorType = {
	ref: HTMLTextAreaElement | undefined;
	content: string;
	cursorPosition: number;
	baseLineRef: HTMLDivElement | undefined;
	lineHeights: number[];
	mirror: { [x: number]: HTMLDivElement };
};

export class EditorState {
	editor = $state<EditorType>({
		ref: undefined,
		content: '',
		cursorPosition: 0,
		baseLineRef: undefined,
		lineHeights: [],
		mirror: {}
	});

	get lineCount() {
		return this.editor.content.split('\n').length;
	}

	get mirrorHeights() {
		return Object.values(this.editor.mirror).map((child) => {
			const height = (child as HTMLDivElement)?.offsetHeight || 0;
			if (height <= 0 || !this.editor.baseLineRef) return 0;

			console.log(height, this.editor.baseLineRef.offsetHeight);

			return height - this.editor.baseLineRef.offsetHeight;
		});
	}

	get lines() {
		const _lines: { [x: number]: string } = {};
		this.editor.content
			.substring(0, this.editor.ref?.selectionStart)
			.split('\n')
			.forEach((line, index) => (_lines[index] = line));
		return _lines;
	}

	get currentLine() {
		return Object.keys(this.lines).length;
	}
}

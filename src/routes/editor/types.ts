export const Keys = {
	Ctrl: 'Ctrl',
	Shift: 'Shift',
	Tab: 'Tab'
} as const;

export type KeyType = (typeof Keys)[keyof typeof Keys];
export const allKeys = Object.keys(Keys);

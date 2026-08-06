export const PhysicalKeys = {
	Ctrl: 'Ctrl',
	Shift: 'Shift',
	Tab: 'Tab'
} as const;

export type PhysicalKeyType = (typeof PhysicalKeys)[keyof typeof PhysicalKeys];

/**
 * Order here is how it's rendered on screen
 */
export const LogicalKeys = {
	Copy: 'Copy',
	Paste: 'Paste',
	Tab: 'Tab',
	SelectAll: 'SelectAll',
	DupplicateLine: 'DupplicateLine'
} as const;

export const logicalKeyToLabel = {
	[LogicalKeys.Copy]: '📋↑',
	[LogicalKeys.Paste]: '📋↓',
	[LogicalKeys.Tab]: '\\t',
	[LogicalKeys.SelectAll]: 'All',
	[LogicalKeys.DupplicateLine]: '⇊'
};

export type LogicalKeyType = (typeof LogicalKeys)[keyof typeof LogicalKeys];

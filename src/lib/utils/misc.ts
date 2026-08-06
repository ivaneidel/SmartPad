/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce<T extends (...args: any[]) => void>(
	func: T,
	delay: number
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	return function (this: any, ...args: Parameters<T>): void {
		// Clear the previous timer to reset the delay window
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
		}

		// Set a new timer to execute the function
		timeoutId = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
}

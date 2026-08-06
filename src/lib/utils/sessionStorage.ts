const SAVED_TEXT_KEY = 'SESSION_SAVED_TEXT_KEY';

export const saveTextToSession = (text: string) => {
	sessionStorage.setItem(SAVED_TEXT_KEY, text);
};

export const getTextFromSession = () => sessionStorage.getItem(SAVED_TEXT_KEY);

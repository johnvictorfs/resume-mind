export type ApiKeyType = "openai";

export function getApiKey(type: ApiKeyType = "openai") {
	if (typeof window === "undefined") {
		return null;
	}

	return localStorage.getItem(`${type}_api_key`);
}

export function saveApiKey(key: string, type: ApiKeyType = "openai") {
	localStorage.setItem(`${type}_api_key`, key);

	return key;
}

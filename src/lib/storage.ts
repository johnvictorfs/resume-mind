import type { ResumeData } from "~/schemas/resume";

export type ApiKeyType = "openai";

const storageKeys = {
	apiKey: {
		openai: "openai_api_key",
	},
	resumeData: "resume_data",
} as const;

export function getApiKey(type: ApiKeyType = "openai") {
	if (typeof window === "undefined") {
		return null;
	}

	return localStorage.getItem(storageKeys.apiKey[type]);
}

export function saveApiKey(key: string, type: ApiKeyType = "openai") {
	localStorage.setItem(storageKeys.apiKey[type], key);

	return key;
}

export function saveResumeData(data: ResumeData) {
	// TODO: Loose validation before saving
	localStorage.setItem(storageKeys.resumeData, JSON.stringify(data));
	return data;
}

export function getResumeData(): ResumeData | null {
	if (typeof window === "undefined") {
		return null;
	}

	const data = localStorage.getItem(storageKeys.resumeData);
	if (!data) {
		return null;
	}

	try {
		const parsed = JSON.parse(data);

		// TODO: Loose validation before returning
		return parsed;
	} catch {
		localStorage.removeItem(storageKeys.resumeData);
		return null;
	}
}

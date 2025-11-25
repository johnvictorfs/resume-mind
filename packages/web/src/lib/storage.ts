import { looseResumeSchema, type ResumeData } from "@local/schemas";
import { looseResumeToResume, resumeToLoose } from "~/adapters/resume";

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
  const {
    success,
    data: parsedData,
    error,
  } = looseResumeSchema.safeParse(resumeToLoose(data));

  if (success) {
    localStorage.setItem(storageKeys.resumeData, JSON.stringify(parsedData));

    return parsedData;
  }

  console.error("Failed to save resume data:", error);

  return data;
}

export function clearResumeData() {
  localStorage.removeItem(storageKeys.resumeData);
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

    const { success, data: validData } = looseResumeSchema.safeParse(parsed);

    if (!success) {
      clearResumeData();
      return null;
    }

    return looseResumeToResume(validData);
  } catch {
    clearResumeData();
    return null;
  }
}

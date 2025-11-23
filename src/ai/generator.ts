import { createOpenAI } from "@ai-sdk/openai";
import { generateObject, type LanguageModel } from "ai";
import { getApiKey } from "~/lib/config";
import { type ResumeData, resumeSchema } from "~/schemas/resume";

const instructions = `
- Use the user information below to build a structure resume
- Create appropriate bullet points for each experience
- Leave unknowns as null
- Input dates in ISO format like 2025-09-11T14:30:00Z
- Add https:// to links
`;

export const getModel = () => {
	const apiKey = getApiKey("openai");

	if (!apiKey) {
		throw new Error("OpenAI API key is not set");
	}

	const openai = createOpenAI({ apiKey });

	return openai("gpt-5-nano");
};

export const generateResumeData = async (
	prompt: string,
	model: LanguageModel,
): Promise<ResumeData> => {
	const { object, response, warnings } = await generateObject({
		model: model,
		schema: resumeSchema,
		prompt: `${instructions}\n${prompt}`,
	});

	console.debug("AI Response:", response);
	if (warnings) {
		console.warn("AI Warnings:", warnings);
	}

	return object;
};

export const _exampleResumeData: ResumeData = {
	name: "John Doe",
	email: "john.doe@email.com",
	contacts: {
		linkedin: "https://linkedin.com/in/johndoe",
		github: "https://github.com/johndoe",
	},
	phone: "+1 234 567 8901",
	skills: ["JavaScript", "TypeScript", "React", "Node.js"],
	experience: [
		{
			company: "Tech Corp",
			role: "Senior Software Engineer",
			startAt: new Date("2020-01-01"),
			endAt: null,
			bulletPoints: [
				"Led a team of 5 engineers to develop a scalable web application.",
				"Improved application performance by 30% through code optimization.",
			],
		},
		{
			company: "Web Solutions",
			role: "Frontend Developer",
			startAt: new Date("2018-06-01"),
			endAt: new Date("2019-12-01"),
			bulletPoints: [
				"Developed responsive user interfaces using React and Redux.",
				"Collaborated with designers to enhance UX/UI design.",
			],
		},
	],
	education: [
		{
			institution: "State University",
			degree: "B.Sc. in Computer Science",
			startAt: new Date("2015-09-01"),
			endAt: new Date("2019-06-01"),
			notes: "Graduated with Honors",
		},
	],
};

import { z } from "zod";

const experienceSchema = z.object({
	company: z.string(),
	role: z.string(),
	startAt: z.coerce.date(),
	endAt: z.coerce.date().nullable(),
	bulletPoints: z.array(z.string()),
});

const educationSchema = z.object({
	institution: z.string(),
	degree: z.string(),
	startAt: z.coerce.date(),
	endAt: z.coerce.date().nullable(),
	notes: z.string().nullable(),
});

export const resumeSchema = z.object({
	name: z.string(),
	summary: z.string().nullable(),
	email: z.string().email(),
	contacts: z.object({
		linkedin: z.string().url().nullable(),
		github: z.string().url().nullable(),
	}),
	phone: z.string().nullable(),
	skills: z.array(z.string()),
	experience: z.array(experienceSchema).nullable(),
	education: z.array(educationSchema).nullable(),
});

export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type ResumeData = z.infer<typeof resumeSchema>;

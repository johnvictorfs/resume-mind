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
	email: z.string().email().nullable(),
	contacts: z.object({
		linkedin: z.string().nullable(),
		github: z.string().nullable(),
	}),
	phone: z.string().nullable(),
	skills: z.array(z.string()),
	experience: z.array(experienceSchema).nullable(),
	education: z.array(educationSchema).nullable(),
});

export const looseResumeSchema = z.object({
	name: z.string().optional(),
	summary: z.string().nullable().optional(),
	email: z.string().nullable().optional(),
	contacts: z.object({
		linkedin: z.string().nullable().optional(),
		github: z.string().nullable().optional(),
	}),
	phone: z.string().nullable().optional(),
	skills: z.array(z.string()).optional(),
	experience: z.array(experienceSchema).nullable().optional(),
	education: z.array(educationSchema).nullable().optional(),
});

export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type ResumeData = z.infer<typeof resumeSchema>;

export type LooseResumeData = z.infer<typeof looseResumeSchema>;

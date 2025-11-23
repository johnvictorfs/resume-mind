import { z } from "zod";

const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date().optional().nullable(),
  bulletPoints: z.array(z.string()),
});

const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date().optional().nullable(),
  notes: z.string().optional(),
});

export const resumeSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  contacts: z.object({
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
  }),
  phone: z.string().optional(),
  skills: z.array(z.string()),
  experience: z.array(experienceSchema).optional(),
  education: z.array(educationSchema).optional(),
});

export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type ResumeData = z.infer<typeof resumeSchema>;

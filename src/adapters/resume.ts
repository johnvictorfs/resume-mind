import z from "zod";
import type { LooseResumeData, ResumeData } from "~/schemas/resume";

export function resumeToLoose(resumeData: ResumeData): LooseResumeData {
  return {
    contacts: {
      github: resumeData.contacts?.github || null,
      linkedin: resumeData.contacts?.linkedin || null,
    },
    skills: resumeData.skills || [],
    experience: resumeData.experience || [],
    education: resumeData.education || [],
    email: z.string().email().safeParse(resumeData.email)?.data || null,
    name: resumeData.name || "",
    phone: resumeData.phone || null,
    summary: resumeData.summary || null,
  };
}

export function looseResumeToResume(
  looseResumeData: LooseResumeData,
): ResumeData {
  return {
    contacts: {
      github: looseResumeData.contacts?.github || null,
      linkedin: looseResumeData.contacts?.linkedin || null,
    },
    skills: looseResumeData.skills || [],
    experience: looseResumeData.experience || [],
    education: looseResumeData.education || [],
    email: looseResumeData.email || null,
    name: looseResumeData.name || "",
    phone: looseResumeData.phone || null,
    summary: looseResumeData.summary || null,
  };
}

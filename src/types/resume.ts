export type ResumeData = {
  name: string;
  email: string;
  contacts: {
    linkedin?: string;
    github?: string;
  }
  phone: string;
  skills: string[];
  experience?: {
    company: string;
    role: string;
    startAt: Date;
    endAt: Date;
    bulletPoints: string[];
  }[];
  education?: {
    institution: string;
    degree: string;
    startAt: Date;
    endAt: Date;
    notes: string;
  }[];
};

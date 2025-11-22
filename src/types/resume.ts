export type Experience = {
  company: string;
  role: string;
  startAt: Date;
  endAt: Date | null;
  bulletPoints: string[];
};

export type ResumeData = {
  name: string;
  email: string;
  contacts: {
    linkedin?: string;
    github?: string;
  };
  phone: string;
  skills: string[];
  experience?: Experience[];
  education?: {
    institution: string;
    degree: string;
    startAt: Date;
    endAt: Date;
    notes: string;
  }[];
};

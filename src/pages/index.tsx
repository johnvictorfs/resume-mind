"use client";
import Head from "next/head";
import { Preview } from "~/components/pdf/preview";

import { authClient } from "~/server/better-auth/client";
import type { ResumeData } from "~/types/resume";

export default function Home() {
  const { data: sessionData } = authClient.useSession();

  const resumeData: ResumeData = {
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
        endAt: new Date("2022-01-01"),
        bulletPoints: [
          "Led a team of 5 engineers to develop a scalable web application.",
          "Improved application performance by 30% through code optimization.",
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

  return (
    <>
      <Head>
        <title>Resume Mind</title>
        <meta
          content="AI-powered tool to create your tailored resume"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-[#242948] to-[#151d2c]">
        {sessionData?.user?.name}

        <Preview resumeData={resumeData} />
      </main>
    </>
  );
}

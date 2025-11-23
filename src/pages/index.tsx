"use client";
import Head from "next/head";
import { useState } from "react";
import { Preview } from "~/components/pdf/resume/preview";

import { authClient } from "~/server/better-auth/client";
import { type ResumeData } from "~/schemas/resume";
import { generateResumeData } from "~/ai/generator";

const ResumePreview = ({ resumeData }: { resumeData: ResumeData | null }) => {
  if (!resumeData) {
    return null;
  }
  return <Preview resumeData={resumeData} />;
};

export default function Home() {
  const { data: sessionData } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [prompt, setPrompt] =
    useState(`My name is John Doe. I am a software engineer with 5 years of experience. https://linkedin.com/in/johndoe https://github.com/johndoe
  
  Skills: JavaScript, TypeScript, React, Node.js
  
  Experience:
  - Senior Software Engineer at Tech Corp starting jan 2020 to now Led a team of 5 engineers, developed a scalable web application, improved performance by 30% through code optimization.
  - Frontend Developer at Web Solutions from jun 2018 to dec 2019 Developed responsive user interfaces using React and Redux, collaborated with designers to enhance UX/UI design.

  my email is john.doe@mail.com
  
  Education:
  - B.Sc. in Computer Science from State University from sep 2015 to jun 2019 Graduated with Honors.`);

  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  const generate = async () => {
    setLoading(true);
    try {
      const data = await generateResumeData(openaiApiKey, prompt);

      setResumeData(data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
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

        <div className="mb-8 mt-4 flex flex-col items-start">
          <div className="mb-4">
            <label htmlFor="openai-api-key" className="text-white mr-2">
              OpenAI API Key:
            </label>
            <input
              type="password"
              id="openai-api-key"
              name="openai-api-key"
              className="rounded-md p-2 w-96 text-white bg-gray-800 border border-gray-600"
              placeholder="sk-..."
              value={openaiApiKey}
              onChange={({ target }) => setOpenaiApiKey(target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="prompt" className="text-white mr-2">
              Prompt
            </label>
            <textarea
              rows={6}
              id="prompt"
              name="prompt"
              className="rounded-md p-2 w-96 text-white bg-gray-800 border border-gray-600"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={({ target }) => setPrompt(target.value)}
            />
          </div>
        </div>

        <button
          onClick={generate}
          className="mb-8 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>

        <ResumePreview resumeData={resumeData} />
      </main>
    </>
  );
}

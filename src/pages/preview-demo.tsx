"use client";
import Head from "next/head";
import { useState } from "react";
import {
	_exampleResumeData,
	generateResumeData,
	getModel,
} from "~/ai/generator";
import { Preview } from "~/components/pdf/resume/preview";
import type { ResumeData } from "~/schemas/resume";
import { authClient } from "~/server/better-auth/client";

const ResumePreview = ({ resumeData }: { resumeData: ResumeData | null }) => {
	if (!resumeData) {
		return null;
	}

	return <Preview resumeData={resumeData} />;
};

export default function ResumePreviewPage() {
	const { data: sessionData } = authClient.useSession();
	const [loading, setLoading] = useState(false);
	const [openaiApiKey, setOpenaiApiKey] = useState("");
	const [prompt, setPrompt] =
		useState(`My name is John Doe. I am a software engineer with 5 years of experience. my lkd username is johndoe my github is johndoe

  Skills: JavaScript, TypeScript, React, Node.js

  Experience:
  - Senior Software Engineer at Tech Corp starting jan 2020 to now Led a team of 5 engineers, developed a scalable web application, improved performance by 30% through code optimization.
  - Frontend Developer at Web Solutions from jun 2018 to dec 2019 Developed responsive user interfaces using React and Redux, collaborated with designers to enhance UX/UI design.

  my email is john.doe@mail.com
  
  Education:
  - B.Sc. in Computer Science from State University from sep 2015 to jun 2019 Graduated with Honors.`);

	// TODO: Remove default example data
	const [resumeData, setResumeData] = useState<ResumeData | null>(
		_exampleResumeData,
	);

	const generate = async () => {
		setLoading(true);
		try {
			const model = getModel();
			const data = await generateResumeData(prompt, model);

			setResumeData(data);
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

				<div className="mt-4 mb-8 flex flex-col items-start">
					<div className="mb-4">
						<label className="mr-2 text-white" htmlFor="openai-api-key">
							OpenAI API Key:
						</label>
						<input
							className="w-96 rounded-md border border-gray-600 bg-gray-800 p-2 text-white"
							id="openai-api-key"
							name="openai-api-key"
							onChange={({ target }) => setOpenaiApiKey(target.value)}
							placeholder="sk-..."
							type="password"
							value={openaiApiKey}
						/>
					</div>

					<div className="mb-4">
						<label className="mr-2 text-white" htmlFor="prompt">
							Prompt
						</label>
						<textarea
							className="w-96 rounded-md border border-gray-600 bg-gray-800 p-2 text-white"
							id="prompt"
							name="prompt"
							onChange={({ target }) => setPrompt(target.value)}
							placeholder="Enter your prompt here..."
							rows={6}
							value={prompt}
						/>
					</div>
				</div>

				<button
					className="mb-8 cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
					disabled={loading}
					onClick={generate}
					type="button"
				>
					{loading ? "Generating..." : "Generate Resume"}
				</button>

				<ResumePreview resumeData={resumeData} />
			</main>
		</>
	);
}

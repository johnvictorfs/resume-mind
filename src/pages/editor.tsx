"use client";

import { Download, RefreshCw, Upload, Wand2 } from "lucide-react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import type { ResumeData } from "~/schemas/resume";
import { BackgroundEffect } from "~/widgets/background-effect";
import { Header } from "~/widgets/header";
import { ResumeForm } from "~/widgets/resume-form";
import { ResumeImport } from "~/widgets/resume-import";

export const Preview = dynamic(
	() => import("~/components/pdf/resume/preview").then((mod) => mod.Preview),
	{
		ssr: false,
		loading: () => (
			<div className="flex h-[800px] w-full items-center justify-center rounded border border-muted bg-muted/50">
				<p className="text-muted-foreground">Loading...</p>
			</div>
		),
	},
);

const initialData: ResumeData = {
	name: "Alex Chen",
	email: "alex.chen@example.com",
	contacts: {
		linkedin: "linkedin.com/in/alexchen",
		github: "github.com/alexchen",
	},
	summary:
		"Experienced Software Engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success. Proficient in technology and writing code to create reliable and user-friendly systems.",
	phone: "+1 (555) 012-3456",
	skills: [
		"React",
		"TypeScript",
		"Node.js",
		"Next.js",
		"AWS",
		"PostgreSQL",
		"System Design",
		"Docker",
	],
	experience: [
		{
			company: "TechFlow Inc.",
			role: "Senior Software Engineer",
			startAt: new Date("2021-03-01"),
			endAt: null, // Present
			bulletPoints: [
				"Led the migration of a monolithic architecture to microservices, reducing deployment time by 40%.",
				"Mentored junior developers and established code quality standards.",
			],
		},
	],
	education: [
		{
			institution: "University of Technology",
			degree: "B.S. Computer Science",
			startAt: new Date("2016-09-01"),
			endAt: new Date("2020-05-01"),
			notes: "Graduated Summa Cum Laude",
		},
	],
};

export default function ResumeBuilder() {
	const [data, setData] = useState<ResumeData>(initialData);
	const [isGenerating, setIsGenerating] = useState(false);
	const [showImport, setShowImport] = useState(false);

	const handleGenerate = () => {
		setIsGenerating(true);
		// Simulate AI Generation
		setTimeout(() => {
			setIsGenerating(false);
		}, 2000);
	};

	const handleImport = (newData: ResumeData) => {
		setData(newData);
		setShowImport(false);
	};

	if (showImport) {
		return (
			<ResumeImport
				onCancel={() => setShowImport(false)}
				onImport={handleImport}
			/>
		);
	}

	return (
		<>
			<Head>
				<title>Resume Mind - Editor</title>
				<meta
					content="AI-powered tool to create your tailored resume"
					name="description"
				/>
				<link href="/favicon.ico" rel="icon" />
			</Head>

			<main className="relative min-h-screen bg-background text-foreground">
				<BackgroundEffect />
				<Header />

				<div className="container mx-auto px-4 pt-24 pb-12">
					<div className="mx-auto max-w-7xl">
						<div className="grid h-[calc(100vh-8rem)] gap-8 lg:grid-cols-2">
							{/* Left Column: Input Form */}
							<div className="flex h-full flex-col gap-6">
								<div className="flex items-center justify-between">
									<h1 className="bg-linear-to-r from-white to-white/60 bg-clip-text font-bold text-2xl text-transparent">
										Editor
									</h1>
									<div className="flex items-center gap-2">
										<Button
											className="text-muted-foreground hover:text-white"
											onClick={() => setShowImport(true)}
											size="sm"
											variant="ghost"
										>
											<Upload className="mr-2 h-4 w-4" />
											Import
										</Button>
										<span className="text-muted-foreground text-xs">
											AI Powered & Autosaved
										</span>
									</div>
								</div>

								<div className="custom-scrollbar flex-1 overflow-y-auto rounded-xl border border-white/10 bg-card/50 p-1 pr-2">
									<ResumeForm data={data} onChange={setData} />
								</div>
							</div>

							{/* Right Column: Preview */}
							<div className="flex h-full flex-col gap-6">
								<div className="flex items-center justify-between">
									<h2 className="bg-linear-to-r from-white to-white/60 bg-clip-text font-bold text-2xl text-transparent">
										Preview
									</h2>
									<div className="flex gap-3">
										<Button
											className="border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:text-primary-foreground"
											disabled={isGenerating}
											onClick={handleGenerate}
											variant="outline"
										>
											{isGenerating ? (
												<RefreshCw className="mr-2 h-4 w-4 animate-spin" />
											) : (
												<Wand2 className="mr-2 h-4 w-4" />
											)}
											{isGenerating ? "Optimizing..." : "AI Enhance"}
										</Button>
										<Button className="bg-white text-black hover:bg-gray-200">
											<Download className="mr-2 h-4 w-4" />
											Export PDF
										</Button>
									</div>
								</div>

								<div className="group relative flex flex-1 justify-center overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1a] p-4">
									<Preview isGenerating={isGenerating} resumeData={data} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

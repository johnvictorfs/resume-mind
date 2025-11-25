"use client";

import { Download, RefreshCw, Upload, Wand2 } from "lucide-react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Preview } from "~/components/pdf/resume/preview";
import { Button } from "~/components/ui/button";
import { useDebounce } from "~/lib/input";
import { getApiKey, getResumeData, saveResumeData } from "~/lib/storage";
import type { ResumeData } from "~/schemas/resume";
import { BackgroundEffect } from "~/widgets/background-effect";
import { Header } from "~/widgets/header";
import { ResumeForm } from "~/widgets/resume-form";
import { ResumeImport } from "~/widgets/resume-import";

const DownloadLinkPDF = dynamic(
	() => import("~/lib/pdf").then((mod) => mod.DownloadLinkPDF),
	{ ssr: false },
);

const initialData: ResumeData = {
	contacts: {
		github: "",
		linkedin: "",
	},
	skills: [],
	experience: [],
	education: [],
	email: "",
	name: "",
	phone: "",
	summary: "",
} as const;

export default function ResumeBuilder() {
	const [data, setData] = useState<ResumeData>(initialData);
	const [isGenerating, setIsGenerating] = useState(false);
	const [showImport, setShowImport] = useState(false);
	const debouncedData = useDebounce(data, 800);
	const debouncedGenerating = useDebounce(isGenerating, 800);
	const router = useRouter();

	useEffect(() => {
		const existingResumeData = getResumeData();

		if (existingResumeData) {
			setData(existingResumeData);
		}
	}, []);

	function handleGenerate() {
		setIsGenerating(true);
		// Simulate AI Generation
		setTimeout(() => {
			setIsGenerating(false);
		}, 2000);
	}

	function handleImport(newData: ResumeData) {
		setData(newData);
		setShowImport(false);
	}

	function updateData(newData: ResumeData) {
		setData(newData);
		saveResumeData(newData);
	}

	function goToImport() {
		const apiKey = getApiKey();

		if (!apiKey) {
			router.push("/");
		} else {
			setShowImport(true);
		}
	}

	const { document, domRender: PreviewRender } = Preview({
		resumeData: debouncedData,
		isGenerating: debouncedGenerating,
	});

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

			<main className="relative bg-background text-foreground">
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
											onClick={goToImport}
											size="sm"
											variant="ghost"
										>
											<Upload className="mr-2 h-4 w-4" />
											Fill automatically from resume or text
										</Button>
									</div>
								</div>

								<div className="custom-scrollbar flex-1 overflow-y-auto rounded-xl border border-white/10 bg-card/50 p-1 pr-2">
									<ResumeForm data={data} onChange={updateData} />
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
										<Button
											className="bg-white text-black hover:bg-gray-200"
											disabled={!document}
										>
											<DownloadLinkPDF document={document}>
												<div className="flex items-center">
													<Download className="mr-2 h-4 w-4" />
													Export PDF
												</div>
											</DownloadLinkPDF>
										</Button>
									</div>
								</div>

								<div className="group relative flex flex-1 justify-center overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1a] p-4">
									{PreviewRender}
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

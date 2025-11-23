"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	AlertCircle,
	FileText,
	Loader2,
	Sparkles,
	Type,
	Upload,
} from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import type { ResumeData } from "~/schemas/resume";

function generateResumeFromText(text: string) {
	// TODO: Placeholder
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(null);
		}, 2000);
	});
}

function generateResumeFromPdf(formData: FormData) {
	// TODO: Placeholder
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(null);
		}, 2000);
	});
}

interface ResumeImportProps {
	onImport: (data: ResumeData) => void;
	onCancel: () => void;
}

export function ResumeImport({ onImport, onCancel }: ResumeImportProps) {
	const [activeTab, setActiveTab] = useState<"upload" | "text">("upload");
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [text, setText] = useState("");

	const handleTextSubmit = async () => {
		if (!text.trim()) return;

		setIsProcessing(true);
		setError(null);

		try {
			const data = await generateResumeFromText(text);
			onImport(data as ResumeData);
		} catch (err) {
			setError("Failed to generate resume. Please try again.");
			console.error(err);
		} finally {
			setIsProcessing(false);
		}
	};

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsProcessing(true);
		setError(null);

		const formData = new FormData();
		formData.append("file", file);

		try {
			const data = await generateResumeFromPdf(formData);
			onImport(data as ResumeData);
		} catch (err) {
			setError("Failed to parse PDF. Please try copying the text instead.");
			console.error(err);
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<div className="mx-auto w-full max-w-2xl p-6">
			<div className="mb-8 space-y-2 text-center">
				<h2 className="bg-gradient-to-r from-white to-white/60 bg-clip-text font-bold text-3xl text-transparent">
					How would you like to start?
				</h2>
				<p className="text-muted-foreground">
					Import your existing resume or paste your experience to let AI build
					your resume.
				</p>
			</div>

			<div className="mb-8 grid grid-cols-2 gap-4">
				<button
					className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all duration-200 ${
						activeTab === "upload"
							? "border-primary bg-primary/10 text-primary"
							: "border-white/10 text-muted-foreground hover:border-white/20 hover:bg-white/5"
					}`}
					onClick={() => setActiveTab("upload")}
					type="button"
				>
					<Upload className="h-8 w-8" />
					<span className="font-semibold">Upload PDF</span>
				</button>
				<button
					className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all duration-200 ${
						activeTab === "text"
							? "border-primary bg-primary/10 text-primary"
							: "border-white/10 text-muted-foreground hover:border-white/20 hover:bg-white/5"
					}`}
					onClick={() => setActiveTab("text")}
					type="button"
				>
					<Type className="h-8 w-8" />
					<span className="font-semibold">Paste Text</span>
				</button>
			</div>

			<div className="flex min-h-[300px] flex-col rounded-xl border border-white/10 bg-card/50 p-6">
				<AnimatePresence mode="wait">
					{activeTab === "upload" ? (
						<motion.div
							animate={{ opacity: 1, y: 0 }}
							className="flex flex-1 flex-col items-center justify-center space-y-4 text-center"
							exit={{ opacity: 0, y: -10 }}
							initial={{ opacity: 0, y: 10 }}
							key="upload"
						>
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
								<FileText className="h-10 w-10 text-muted-foreground" />
							</div>
							<div className="space-y-2">
								<p className="font-medium text-lg">Drop your PDF resume here</p>
								<p className="text-muted-foreground text-sm">
									or click to browse
								</p>
							</div>
							<Input
								accept=".pdf"
								className="hidden"
								disabled={isProcessing}
								id="file-upload"
								onChange={handleFileUpload}
								type="file"
							/>
							<Button
								className="mt-4"
								disabled={isProcessing}
								onClick={() => document.getElementById("file-upload")?.click()}
							>
								{isProcessing ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Analyzing PDF...
									</>
								) : (
									"Select PDF File"
								)}
							</Button>
						</motion.div>
					) : (
						<motion.div
							animate={{ opacity: 1, y: 0 }}
							className="flex flex-1 flex-col space-y-4"
							exit={{ opacity: 0, y: -10 }}
							initial={{ opacity: 0, y: 10 }}
							key="text"
						>
							<Label>Paste your resume text or experience</Label>
							<Textarea
								className="min-h-[200px] flex-1 font-mono text-sm"
								onChange={(e) => setText(e.target.value)}
								placeholder="I am a software engineer with 5 years of experience..."
								value={text}
							/>
							<Button
								className="w-full"
								disabled={!text.trim() || isProcessing}
								onClick={handleTextSubmit}
							>
								{isProcessing ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Generating Resume...
									</>
								) : (
									<>
										<Sparkles className="mr-2 h-4 w-4" />
										Generate with AI
									</>
								)}
							</Button>
						</motion.div>
					)}
				</AnimatePresence>

				{error && (
					<div className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400 text-sm">
						<AlertCircle className="h-4 w-4" />
						{error}
					</div>
				)}
			</div>

			<div className="mt-6 flex justify-center">
				<Button
					className="text-muted-foreground hover:text-white"
					onClick={onCancel}
					variant="ghost"
				>
					Skip and start from scratch
				</Button>
			</div>
		</div>
	);
}

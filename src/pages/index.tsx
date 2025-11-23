"use client";
import { Sparkles } from "lucide-react";
import Head from "next/head";
import { useState } from "react";
import { ApiKeyInput } from "~/components/api-key-input";
import { getApiKey, saveApiKey } from "~/lib/config";

const Header = () => (
	<header className="fixed top-0 z-50 w-full border-white/5 border-b bg-background/80 backdrop-blur-md">
		<div className="container mx-auto flex h-16 items-center justify-between px-4">
			<div className="flex items-center gap-2">
				<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-blue-600">
					<Sparkles className="h-5 w-5 text-white" />
				</div>
				<span className="font-bold text-xl tracking-tight">Resume Mind</span>
			</div>
		</div>
	</header>
);

const BackgroundEffect = () => (
	<>
		<div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />
		<div className="-top-40 -right-40 pointer-events-none absolute h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
		<div className="-left-20 pointer-events-none absolute top-40 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
	</>
);

export default function Homepage() {
	const [apiKey, setApiKey] = useState<string | null>(getApiKey);

	function updateApiKey(key: string) {
		setApiKey(saveApiKey(key));
	}

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

			<main className="relative min-h-screen overflow-hidden bg-background text-foreground">
				<BackgroundEffect />

				<Header />

				<div className="container mx-auto px-4 pt-24 pb-12">
					<div className="mx-auto max-w-7xl">
						{apiKey ? (
							<p>Your OpenAI API Key is set.</p>
						) : (
							<ApiKeyInput onComplete={updateApiKey} />
						)}
					</div>
				</div>
			</main>
		</>
	);
}

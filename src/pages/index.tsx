import Head from "next/head";
import { useState } from "react";
import { ApiKeyInput } from "~/components/api-key-input";
import { BackgroundEffect } from "~/components/background-effect";
import { Header } from "~/components/header";
import { getApiKey, saveApiKey } from "~/lib/config";

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

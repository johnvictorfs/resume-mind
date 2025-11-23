import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getApiKey, saveApiKey } from "~/lib/storage";
import { ApiKeyInput } from "~/widgets/api-key-input";
import { BackgroundEffect } from "~/widgets/background-effect";
import { Header } from "~/widgets/header";

export default function Homepage() {
	const router = useRouter();

	function updateApiKey(key: string) {
		saveApiKey(key);
		router.push("/editor");
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: get around ssr
	useEffect(() => {
		const key = getApiKey();

		if (key) {
			updateApiKey(key);
		}
	}, []);

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
						<ApiKeyInput onComplete={updateApiKey} />
					</div>
				</div>
			</main>
		</>
	);
}

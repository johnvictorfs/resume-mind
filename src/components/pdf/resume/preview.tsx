import { useEffect, useRef } from "react";
import type { ResumeData } from "~/schemas/resume";
import { PDFViewer } from "../viewer";
import { Resume } from "./resume";

export const Preview = ({
	resumeData,
	isGenerating,
}: {
	resumeData: ResumeData;
	isGenerating: boolean;
}) => {
	// Workaround for a react-pdf rendering issue
	// https://stackoverflow.com/a/79653680
	const count = useRef(0);
	// biome-ignore lint/correctness/useExhaustiveDependencies: Hack
	useEffect(() => {
		count.current++;
	}, [resumeData]);

	if (isGenerating) {
		return (
			<div className="flex h-[800px] w-full items-center justify-center rounded border border-muted bg-muted/50">
				<p className="text-muted-foreground">Generating preview...</p>
			</div>
		);
	}

	return (
		<div className="h-[800px] w-full">
			<PDFViewer height={800} key={count.current} width="90%">
				<Resume resumeData={resumeData} />
			</PDFViewer>
		</div>
	);
};

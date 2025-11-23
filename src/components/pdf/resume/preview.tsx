import { useEffect, useRef } from "react";
import type { ResumeData } from "~/schemas/resume";
import { PDFViewer } from "../viewer";
import { Resume } from "./resume";

export const Preview = ({ resumeData }: { resumeData: ResumeData }) => {
	// Workaround for a react-pdf rendering issue
	// https://stackoverflow.com/a/79653680
	const count = useRef(0);
	// biome-ignore lint/correctness/useExhaustiveDependencies: Hack
	useEffect(() => {
		count.current++;
	}, [resumeData]);

	return (
		<PDFViewer height={800} key={count.current} width="90%">
			<Resume resumeData={resumeData} />
		</PDFViewer>
	);
};

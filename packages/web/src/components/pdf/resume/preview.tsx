import type { ResumeData } from "@local/schemas";
import { useEffect, useMemo, useRef } from "react";
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

  const Document = useMemo(
    () => <Resume resumeData={resumeData} />,
    [resumeData],
  );

  if (isGenerating) {
    return {
      domRender: (
        <div className="flex h-[800px] w-full items-center justify-center rounded border border-muted bg-muted/50">
          <p className="text-muted-foreground">Generating preview...</p>
        </div>
      ),
      document: null,
    };
  }

  return {
    domRender: (
      <div className="h-[800px] w-full">
        <PDFViewer height={900} key={count.current} width="100%">
          {Document}
        </PDFViewer>
      </div>
    ),
    document: Document,
  };
};

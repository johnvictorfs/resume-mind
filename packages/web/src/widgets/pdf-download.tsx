"use client";
import { Download } from "lucide-react";
import type React from "react";
import { useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";
import { DownloadLinkPDF } from "~/lib/pdf";

export function PDFDownload({
  document,
  resumeData,
}: {
  document: React.ComponentProps<typeof DownloadLinkPDF>["document"];
  resumeData: unknown;
}) {
  // Workaround for a react-pdf rendering issue
  // https://stackoverflow.com/a/79653680
  const count = useRef(0);
  // biome-ignore lint/correctness/useExhaustiveDependencies: Hack
  useEffect(() => {
    count.current++;
  }, [resumeData]);

  return (
    <Button
      className="bg-white text-black hover:bg-gray-200"
      disabled={!document}
      key={count.current}
    >
      <DownloadLinkPDF document={document}>
        <div className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </div>
      </DownloadLinkPDF>
    </Button>
  );
}

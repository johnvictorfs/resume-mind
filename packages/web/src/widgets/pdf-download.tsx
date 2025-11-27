"use client";
import { Download } from "lucide-react";
import type React from "react";
import { Button } from "~/components/ui/button";
import { DownloadLinkPDF } from "~/lib/pdf";

export function PDFDownload({
  document,
}: {
  document: React.ComponentProps<typeof DownloadLinkPDF>["document"];
}) {
  return (
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
  );
}

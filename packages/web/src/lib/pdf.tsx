import { type DocumentProps, PDFDownloadLink } from "@react-pdf/renderer";

export function DownloadLinkPDF({
  children,
  document,
}: {
  document: React.ReactElement<DocumentProps> | null;
  children?: React.ReactNode;
}) {
  if (!document) {
    return children;
  }

  return (
    <PDFDownloadLink document={document} fileName="resume.pdf">
      {children}
    </PDFDownloadLink>
  );
}

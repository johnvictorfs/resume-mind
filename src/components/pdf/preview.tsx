import type { ResumeData } from "~/types/resume";
import { PDFViewer } from "./viewer";
import { Resume } from "./resume";

export const Preview = ({ resumeData }: { resumeData: ResumeData }) => (
  <PDFViewer height={800} width="90%">
    <Resume resumeData={resumeData} />
  </PDFViewer>
);

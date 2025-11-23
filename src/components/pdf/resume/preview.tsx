import type { ResumeData } from "~/schemas/resume";
import { Resume } from "./resume";
import { PDFViewer } from "../viewer";

export const Preview = ({ resumeData }: { resumeData: ResumeData }) => (
  <PDFViewer height={800} width="90%">
    <Resume resumeData={resumeData} />
  </PDFViewer>
);

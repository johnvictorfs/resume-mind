import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "~/types/resume";
import { Contacts } from "./contacts";
import { Experiences } from "./experiences";

const styles = StyleSheet.create({
  document: {
    height: 800,
  },
  page: {
    backgroundColor: "#E4E4E4",
    padding: 20,
    flexDirection: "column",
  },
  name: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

const ResumeHeader = ({ resumeData }: { resumeData: ResumeData }) => (
  <View>
    <View style={styles.name}>
      <Text>{resumeData.name}</Text>
    </View>

    <Contacts resumeData={resumeData} />
  </View>
);

export const Resume = ({ resumeData }: { resumeData: ResumeData }) => (
  <Document style={styles.document}>
    <Page size="A4" style={styles.page}>
      <ResumeHeader resumeData={resumeData} />

      <Experiences resumeData={resumeData} />
    </Page>
  </Document>
);

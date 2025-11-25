import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ResumeData } from "~/schemas/resume";
import { Contacts } from "./contacts";
import { EducationSection } from "./education";
import { Experiences } from "./experiences";
import { SkillsSection } from "./skills";

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
      <View style={{ marginBottom: 20 }}>
        <ResumeHeader resumeData={resumeData} />
      </View>

      {!!resumeData.skills?.length && (
        <View>
          <SkillsSection skills={resumeData.skills} />
        </View>
      )}

      {!!resumeData.experience?.length && (
        <View style={{ marginBottom: 20 }}>
          <Experiences experience={resumeData.experience} />
        </View>
      )}

      {!!resumeData.education?.length && (
        <View style={{ marginBottom: 20 }}>
          <EducationSection education={resumeData.education} />
        </View>
      )}
    </Page>
  </Document>
);

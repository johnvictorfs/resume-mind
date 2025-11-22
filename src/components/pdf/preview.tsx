"use client";
import { Page, Text, Link, View, Document, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "~/types/resume";
import { PDFViewer } from "./viewer";

const styles = StyleSheet.create({
  document: {
    height: 800,
  },
  page: {
    backgroundColor: "#E4E4E4",
    padding: 20,
    flexDirection: "column",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  contacts: {
    fontSize: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
    // start at center
    alignSelf: "center",
  },
});

const ResumeHeader = ({ resumeData }: { resumeData: ResumeData }) => (
  <View style={styles.header}>
    <Text>{resumeData.name}</Text>
  </View>
);

const Contacts = ({ resumeData }: { resumeData: ResumeData }) => (
  <View style={styles.contacts}>
    <Link src={resumeData.contacts?.linkedin}>{resumeData.contacts?.linkedin}</Link>

    <Link src={resumeData.contacts?.github}>{resumeData.contacts?.github}</Link>
  </View>
);

export const Preview = ({ resumeData }: { resumeData: ResumeData }) => (
  <PDFViewer height={800} width="90%">
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        <ResumeHeader resumeData={resumeData} />
        <Contacts resumeData={resumeData} />
      </Page>
    </Document>
  </PDFViewer>
);

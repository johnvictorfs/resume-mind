import {
  Page,
  Text,
  Link,
  View,
  Document,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResumeData } from "~/types/resume";

Font.register({
  family: "FontAwesomeBrands",
  src: "/fonts/fontawesome/fa-brands-400.ttf",
});
Font.register({
  family: "FontAwesome",
  src: "/fonts/fontawesome/fa-regular-400.ttf",
});

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
    fontFamily: ["Helvetica", "FontAwesome", "FontAwesomeBrands"],
    fontSize: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    gap: 10,
  },
});

const ResumeHeader = ({ resumeData }: { resumeData: ResumeData }) => (
  <View style={styles.header}>
    <Text>{resumeData.name}</Text>
  </View>
);

const fontIcons = {
  github: "",
  linkedin: "",
  email: "",
};

const Contacts = ({ resumeData }: { resumeData: ResumeData }) => (
  <View style={styles.contacts}>
    {!!resumeData.contacts?.linkedin && (
      <Link src={resumeData.contacts.linkedin}>
        {fontIcons.linkedin} {resumeData.contacts?.linkedin}
      </Link>
    )}

    {!!resumeData.contacts?.github && (
      <Link src={resumeData.contacts.github}>
        {fontIcons.github} {resumeData.contacts.github}
      </Link>
    )}

    <Link src={resumeData.email}>
      {fontIcons.email} {resumeData.email}
    </Link>
  </View>
);

export const Resume = ({ resumeData }: { resumeData: ResumeData }) => (
  <Document style={styles.document}>
    <Page size="A4" style={styles.page}>
      <ResumeHeader resumeData={resumeData} />
      <Contacts resumeData={resumeData} />
    </Page>
  </Document>
);

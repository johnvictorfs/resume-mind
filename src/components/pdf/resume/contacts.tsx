import { Link, View, Font, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "~/types/resume";
import { getBaseFontFamily } from "./config";

Font.register({
  family: "FontAwesomeBrands",
  src: "/fonts/fontawesome/fa-brands-400.ttf",
});
Font.register({
  family: "FontAwesome",
  src: "/fonts/fontawesome/fa-regular-400.ttf",
});

const styles = StyleSheet.create({
  contacts: {
    fontFamily: [getBaseFontFamily(), "FontAwesome", "FontAwesomeBrands"],
    fontSize: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    gap: 10,
  },
});

export const fontIcons = {
  github: "",
  linkedin: "",
  email: "",
};

export const Contacts = ({ resumeData }: { resumeData: ResumeData }) => (
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

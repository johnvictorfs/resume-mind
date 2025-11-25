import { Font, Link, StyleSheet, View } from "@react-pdf/renderer";
import type { ResumeData } from "~/schemas/resume";
import { fontIcons, fontSize, getBaseFontFamily } from "../styles";

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
    fontSize: fontSize.normal,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    gap: 10,
  },
});

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

    {!!resumeData.email && (
      <Link src={resumeData.email}>
        {fontIcons.email} {resumeData.email}
      </Link>
    )}
  </View>
);

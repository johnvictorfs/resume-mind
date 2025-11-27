import type { Education } from "@local/schemas";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { formatResumeDateRange } from "~/logic/date";
import { baseStyles, fontSize } from "../styles";

const styles = StyleSheet.create({
  educationContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  institution: {
    fontSize: fontSize.large,
    fontWeight: "bold",
  },
  degree: {
    fontSize: fontSize.normal,
    fontStyle: "italic",
  },
  dateRange: {
    fontSize: fontSize.small,
    marginBottom: 5,
  },
});

const EducationItem = ({ education }: { education: Education }) => (
  <View>
    <Text style={styles.institution}>{education.institution}</Text>
    <Text style={styles.degree}>{education.degree}</Text>
    <Text style={styles.dateRange}>
      {formatResumeDateRange(education.startAt, education.endAt)}
    </Text>
  </View>
);

export const EducationSection = ({
  education,
}: {
  education: Education[] | null;
}) => {
  if (!education?.length) {
    return null;
  }

  return (
    <View>
      <View style={baseStyles.sectionHeader}>
        <Text>Education</Text>
      </View>

      <View style={styles.educationContainer}>
        {education.map((educationItem) => (
          <EducationItem
            education={educationItem}
            key={educationItem.degree + educationItem.institution}
          />
        ))}
      </View>
    </View>
  );
};

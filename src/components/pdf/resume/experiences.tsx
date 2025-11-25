import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { formatDateRange } from "~/logic/date";
import type { Experience } from "~/schemas/resume";
import { baseStyles, fontSize } from "../styles";

const styles = StyleSheet.create({
  experiencesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  company: {
    fontSize: fontSize.large,
    fontWeight: "bold",
  },
  role: {
    fontSize: fontSize.normal,
    fontStyle: "italic",
  },
  dateRange: {
    fontSize: fontSize.small,
    marginBottom: 5,
  },
  bulletPointContainer: {
    marginLeft: 10,
  },
  bulletPoint: {
    fontSize: fontSize.small,
  },
});

const ExperienceItem = ({ experience }: { experience: Experience }) => (
  <View>
    <Text style={styles.company}>{experience.company}</Text>
    <Text style={styles.role}>{experience.role}</Text>
    <Text style={styles.dateRange}>
      {formatDateRange(experience.startAt, experience.endAt)}
    </Text>

    {experience.bulletPoints.length > 0 && (
      <View style={styles.bulletPointContainer}>
        {experience.bulletPoints.map((point) => (
          <Text key={point} style={styles.bulletPoint}>
            • {point}
          </Text>
        ))}
      </View>
    )}
  </View>
);

export const Experiences = ({
  experience,
}: {
  experience: Experience[] | null;
}) => {
  if (!experience?.length) {
    return null;
  }

  return (
    <View>
      <View style={baseStyles.sectionHeader}>
        <Text>Experience</Text>
      </View>

      <View style={styles.experiencesContainer}>
        {experience.map((experienceItem) => (
          <ExperienceItem
            experience={experienceItem}
            key={experienceItem.company + experienceItem.role}
          />
        ))}
      </View>
    </View>
  );
};

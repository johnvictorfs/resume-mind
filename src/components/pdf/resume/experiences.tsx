import { View, StyleSheet, Text } from "@react-pdf/renderer";
import type { Experience, ResumeData } from "~/schemas/resume";
import { getBaseFontFamily } from "./config";

const styles = StyleSheet.create({
  header: {
    fontFamily: getBaseFontFamily(),
    fontSize: 18,
    fontWeight: "bold",
    borderBottom: 1,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  experiencesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  company: {
    fontSize: 14,
    fontWeight: "bold",
  },
  role: {
    fontSize: 12,
    fontStyle: "italic",
  },
  dateRange: {
    fontSize: 10,
    marginBottom: 5,
  },
  bulletPointContainer: {
    marginLeft: 10,
  },
  bulletPoint: {
    fontSize: 10,
  },
});

const formatDate = (date?: Date | null) => {
  if (!date) {
    return "Present"; // TODO: User locale
  }

  // TODO: User locale
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

const ExperienceItem = ({ experience }: { experience: Experience }) => (
  <View>
    <Text style={styles.company}>{experience.company}</Text>
    <Text style={styles.role}>{experience.role}</Text>
    <Text style={styles.dateRange}>
      {formatDate(experience.startAt)} - {formatDate(experience.endAt)}
    </Text>

    {experience.bulletPoints.length > 0 && (
      <View style={styles.bulletPointContainer}>
        {experience.bulletPoints.map((point, index) => (
          <Text key={index} style={styles.bulletPoint}>
            • {point}
          </Text>
        ))}
      </View>
    )}
  </View>
);

export const Experiences = ({ resumeData }: { resumeData: ResumeData }) => {
  if (!resumeData.experience?.length) {
    return null;
  }

  return (
    <View>
      <View style={styles.header}>
        <Text>Experience</Text>
      </View>

      <View style={styles.experiencesContainer}>
        {resumeData.experience.map((exp, index) => (
          <ExperienceItem key={index} experience={exp} />
        ))}
      </View>
    </View>
  );
};

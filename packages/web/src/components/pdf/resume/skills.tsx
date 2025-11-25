import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { baseStyles, fontSize } from "../styles";

const styles = StyleSheet.create({
  skillItem: {
    fontSize: fontSize.normal,
    marginBottom: 6,
  },
});

export const SkillsSection = ({ skills }: { skills: string[] }) => (
  <View>
    {/* TODO: Improve this section, add optional skill categories? */}
    <Text style={baseStyles.sectionHeader}>Skills</Text>
    <Text style={styles.skillItem}>{skills.join(", ")}</Text>
  </View>
);

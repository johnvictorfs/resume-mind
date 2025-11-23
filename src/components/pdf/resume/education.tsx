import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { formatDateRange } from "~/logic/date";
import type { Education } from "~/schemas/resume";
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
	educationContainer: {
		display: "flex",
		flexDirection: "column",
		gap: 10,
	},
	institution: {
		fontSize: 14,
		fontWeight: "bold",
	},
	degree: {
		fontSize: 12,
		fontStyle: "italic",
	},
	dateRange: {
		fontSize: 10,
		marginBottom: 5,
	},
});

const EducationItem = ({ education }: { education: Education }) => (
	<View>
		<Text style={styles.institution}>{education.institution}</Text>
		<Text style={styles.degree}>{education.degree}</Text>
		<Text style={styles.dateRange}>
			{formatDateRange(education.startAt, education.endAt)}
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
			<View style={styles.header}>
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

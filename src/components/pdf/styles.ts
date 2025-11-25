import { StyleSheet } from "@react-pdf/renderer";

export const BASE_FONT_FAMILY = "Helvetica";

export const getBaseFontFamily = () => BASE_FONT_FAMILY;

export const fontSize = {
  small: 10,
  normal: 12,
  large: 14,
  extraLarge: 18,
};

export const baseStyles = StyleSheet.create({
  sectionHeader: {
    fontFamily: getBaseFontFamily(),
    fontSize: fontSize.extraLarge,
    fontWeight: "bold",
    borderBottom: 1,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export const fontIcons = {
  github: "",
  linkedin: "",
  email: "",
};

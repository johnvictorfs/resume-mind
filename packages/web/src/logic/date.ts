export const formatFormDate = (date: Date | null, locale = "en-US") => {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
  });
};

export const formatResumeDate = (date?: Date | null, locale = "en-US") => {
  if (!date) {
    return "Present"; // TODO: User locale
  }

  // TODO: User locale
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
  });
};

export const formatResumeDateRange = (
  startDate?: Date | null,
  endDate?: Date | null,
  locale = "en-US",
) => {
  const start = formatResumeDate(startDate, locale);
  const end = formatResumeDate(endDate, locale);

  return `${start} - ${end}`;
};

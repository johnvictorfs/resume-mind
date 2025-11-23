export const formatDate = (date?: Date | null, locale = "en-US") => {
	if (!date) {
		return "Present"; // TODO: User locale
	}

	// TODO: User locale
	return date.toLocaleDateString(locale, {
		year: "numeric",
		month: "short",
	});
};

export const formatDateRange = (
	startDate?: Date | null,
	endDate?: Date | null,
	locale = "en-US",
) => {
	const start = formatDate(startDate, locale);
	const end = formatDate(endDate, locale);

	return `${start} - ${end}`;
};

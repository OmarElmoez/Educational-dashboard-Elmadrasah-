const formatDateIntoArabic = (date: Date) => {
return date.toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export default formatDateIntoArabic;
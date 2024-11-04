const turnDaysIntoEnglishString = (arabicDays: string[] | undefined) => {
  const weekdays: { [key: string]: string } = {
    "الأحد": "Sunday",
    "الأثنين": "Monday",
    "الثلاثاء": "Tuesday",
    "الأربعاء": "Wednesday",
    "الخميس": "Thursday",
    "الجمعة": "Friday",
    "السبت": "Saturday"
  };

  return arabicDays?.map((arabicDay: string) => weekdays[arabicDay]).join(', ');
}

export default turnDaysIntoEnglishString;
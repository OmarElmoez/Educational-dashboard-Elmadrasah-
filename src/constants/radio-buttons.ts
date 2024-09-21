const CALENDAR_SETTINGS_OPTIONS = [
  { label: "شهر", value: "Month" },
  { label: "اسبوع", value: "Week" },
  { label: "يوم", value: "Day" },
];

const CALENDAR_COLOR_BY_OPTIONS = [
  { label: "طالب", value: "Student" },
  { label: "موقع", value: "Website" },
  { label: "درس", value: "Lesson" },
];

const RADIO_FIELDS_FOR_CALENDAR = [
  {
    label: "إعدادات التقويم",
    name: "calendar_setting",
    options: CALENDAR_SETTINGS_OPTIONS,
  },
  {
    label: "درس التقويم اللون حسب ",
    name: "calendar_color_by",
    options: CALENDAR_COLOR_BY_OPTIONS,
  }
]


export  {
  RADIO_FIELDS_FOR_CALENDAR,
};
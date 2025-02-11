const STATUS_INFO = {
  Attended:
    {
      label: "تم الحضور",
      colors: {
        outer_bg: "#B2CCEC4D",
        inner_bg: "#B2CCEC",
        text: "#0650A7",
        border: "#1B84FF33"
      }
    },
  Scheduled:
    {
      label: "لم تبدأ بعد",
      colors: {
        outer_bg: "#D6DDD880",
        inner_bg: "#CCCCCC",
        text: "#828684",
        border: "#1B84FF33",
      }
    },
  Missed:
    {
      label: "متغيب",
      colors: {
        outer_bg: "#FFEEEE",
        inner_bg: "#FBCBD0",
        text: "#F64E60",
        border: "#CE122580"
      }
    },
  Progressing:
    {
      label: "الانضمام",
      colors: {
        outer_bg: "#1C8A4426",
        inner_bg: "#1C8A444D",
        text: "var(--main-color)",
        border: "#1C8A4480",
      }
    },
  Cancelled:
    {
      label: "ملغاة",
      colors: {
        outer_bg: "#FF880033",
        inner_bg: "#FBCBD0",
        text: "#F64E60",
        border: "#CE122580"
      }
    },
};

export default STATUS_INFO;
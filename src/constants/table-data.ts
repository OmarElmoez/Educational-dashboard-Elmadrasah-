const TABLE_HEAD_DATA = {
  students: [
    { name: "id", label: "الكود" },
    { name: "first_name", label: "الاسم الاول" },
    { name: "last_name", label: "الاسم الأخير" },
    { name: "email", label: "البريد الإلكتروني" },
    { name: "mobile_phone", label: "الهاتف المحمول" },
    { name: "home_phone", label: "هاتف المنزل" },
    { name: "student_type", label: "النوع" },
    { name: "action", label: "أكشن" },
  ],
  parents: [
    "الكود",
    "الاسم",
    "البريد الإلكتروني",
    "الهاتف المحمول",
    "هاتف المنزل",
    "المدينة",
    "أكشن",
  ],
  teachers: [
    "صورة شخصية",
    "الاسم/الهاتف",
    "البريد الإلكتروني",
    "المدينة",
    "النوع",
    "المواد",
    "أكشن",
  ],
};

const TABLE_SEARCH_END_POINTS = {
  students:
    "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/students/?first_name=",
};

export { TABLE_HEAD_DATA, TABLE_SEARCH_END_POINTS };

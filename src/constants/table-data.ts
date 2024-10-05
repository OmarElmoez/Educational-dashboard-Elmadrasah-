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
  invoices: [
    { name: "id", label: "الكود" },
    { name: "formatted_number", label: "الرقم " },
    { name: "date", label: " تاريخ" },
    { name: "due_date", label: " تاريخ الاستحقاق" },
    { name: "sent_at", label: " اخر ارسال" },
    { name: "customer_name", label: " عميل " },
    { name: "invoice_type", label: "النوع" },
    { name: "total", label: " المجموع  " },
    { name: "amount_due", label: "توازن" },
  ],
  // ***** update again
  payments: [
    { name: "id", label: "الكود" },
    { name: "first_name", label: "الرقم " },
    { name: "date", label: " تاريخ" },
    { name: "email", label: " تاريخ الاستحقاق" },
    { name: "mobile_phone", label: " اخر ارسال" },
    { name: "customer_name", label: " عميل " },
    { name: "type", label: "النوع" },
    { name: "home_phone", label: " المجموع  " },
    { name: "student_type", label: "توازن" },
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

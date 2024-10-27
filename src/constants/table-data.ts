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
  balance: [
    { name: "customer_first_name", label: "الاسم الاول" },
    { name: "customer_last_name", label: "الاسم الاخير " },
    { name: "service_name", label: " نوع الخدمة" },
    { name: "purchased", label: "تم الشراء" },
    { name: "scheduled", label: "مجدولة " },
    { name: "unscheduled", label: " غير مجدولة " },
    { name: "over_scheduled", label: "مجدول أكثر من اللازم" },
    { name: "used", label: "مستخدمة" },
    { name: "unused", label: "غير مستخدمة" },
    { name: "over_used", label: " مستخدم أكثر من اللازم" },
  ],


   unscheduled: [
    { name: "name", label: "الاسم" },
    // { name: "name_last", label: "الاسم الاخير " },
    { name: "subscription_date", label: "تاريخ الاشتراك" },
    { name: "service_name", label: "نوع الباقة" },
    { name: "grade  ", label: "الصف " },
    { name: "unscheduled  ", label: "غير مجدولة " },
    { name: "action", label: "" },
    
  ],
  unscheduledFamily: [
    { name: "name2", label: "اسم العائلة" },
    { name: "subscription_date2", label: "تاريخ الاشتراك" },
    { name: "service_name2", label: "نوع الباقة" },
    { name: "grade2", label: "الصف " },
    { name: "unscheduled2", label: "غير مجدولة " },
    { name: "dropdown", label: "" },
    { name: "actions", label: "" },

  ],
  scheduledStatus: [
    { name: "avatar", label: "صورة شخصية" },
    { name: "name", label: "الاسم الأول/الأخير / الهاتف" },
    { name: "subject", label: "المادة " },
    { name: "status", label: "الحالة " },
    { name: "sent_time", label: " وقت الإرسال " },
    { name: "accept_time", label: "وقت القبول" },
    { name: "actions", label: "أكشن    " },

  ],
  scheduledStatusWinners: [
    { name: "avatar", label: "صورة شخصية" },
    { name: "name", label: "الاسم الأول/الأخير / الهاتف" },
    { name: "subject", label: "المادة " },
    { name: "status", label: "الحالة " },
    { name: "sent_time", label: " وقت الإرسال " },
    { name: "accept_time", label: "وقت القبول" },
    { name: "class ", label: "عدد الحصص" },

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
    "customer/students/?first_name=",
  balances:
    "customer/balance/?name=",
};

export { TABLE_HEAD_DATA, TABLE_SEARCH_END_POINTS };

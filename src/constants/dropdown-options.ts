const generateValesForSchema = (arr: { label: string; value: string }[]) => {
  return arr.map((type) => type.value);
};

const EMPLOYEE_TYPES = [
  { label: "إداري", value: "Staff" },
  { label: "مُعلم", value: "Teacher" },
];

const EmployeeTypesForSchema = generateValesForSchema(EMPLOYEE_TYPES);

const STATUS_OPTIONS = [
  { label: "نشط", value: "true" },
  { label: "غير نشط", value: "false" },
];
const PACKAGE_STATUS_OPTIONS = [
  { label: "مستخدم", value: "used" },
  { label: "غير مستخدم", value: "unused" },
];

const StatusOptionsForSchema = generateValesForSchema(STATUS_OPTIONS);

// ********************** SHOULD BE Miss/  *****************************
const EMPLOYEE_TITLES = [
  {
    label: "Mr",
    value: "Mr",
  },
  {
    label: "Ms",
    value: "Ms",
  },
];

const EmployeeTitleForSchema = generateValesForSchema(EMPLOYEE_TITLES);

const WAGE_TYPES = [
  {
    label: "استخدام قائمة الخدمات ",
    value: "service",
  },
  {
    label: "تعيين الاجر علي الملف الشخصي",
    value: "wage",
  },
];

const WageTypesForSchema = generateValesForSchema(WAGE_TYPES);

const WORK_WAGE_TYPES = [
  {
    label: "استخدام قائمة الخدمات ",
    value: "work",
  },
  {
    label: "تعيين الاجر علي الملف الشخصي",
    value: "wage",
  },
];

const WorkWageTypesForSchema = generateValesForSchema(WORK_WAGE_TYPES);

const DAYS_OPTIONS = [
  { label: "الأحد ", value: "0" },
  { label: "الأثنين ", value: "1" },
  { label: "الثلاثاء ", value: "2" },
  { label: "الاربعاء ", value: "3" },
  { label: "الخميس ", value: "4" },
  { label: "الجمعه ", value: "5" },
  { label: "السبت ", value: "6" },
];

const DaysOptinsForSchema = generateValesForSchema(DAYS_OPTIONS);

const SERVICE_OPTIONS = [
  {
    label: "Use Service List Price",
    value: "Use Service List Price",
  },
  {
    label: "Use Student Profile Price",
    value: "Use Student Profile Price",
  },
  {
    label: "Charge Flat Fee",
    value: "Charge Flat Fee",
  },
  {
    label: "Package",
    value: "Package",
  },
];

const ServicesOptionsForSchema = generateValesForSchema(SERVICE_OPTIONS);

const   PAYMENT_OPTIONS = [
  {
    label: "Cash",
    value: "cash",
  },
  {
    label: "Check",
    value: "check",
  },
  {
    label: "Credit Card",
    value: "credit_card",
  },
  {
    label: "Debit Card",
    value: "debit_card",
  },
  {
    label: "Bank Transfer",
    value: "bank_transfer",
  },
  {
    label: "e-Transfer ",
    value: "e-transfer",
  },
  {
    label: "Paypal ",
    value: "paypal",
  },
  {
    label: "Venmo ",
    value: "venmo",
  },
  {
    label: "Square ",
    value: "square",
  },
  {
    label: "Zelle ",
    value: "zelle",
  },
 
  {
    label: "Other",
    value: "other",
  },
];

const paymentOptionsForSchema = generateValesForSchema(PAYMENT_OPTIONS);


const ADD_SERVICE_OPTIONS = [
  { label: "أضف رصيد", value: "charges" },
  { label: "أضف باقة", value: "packages" },
  { label: "الدروس حسب التاريخ", value: "lessons" },
];

const AddServiceOptionsForSchema = generateValesForSchema(ADD_SERVICE_OPTIONS);

const TAX_TREATMENT_OPTIONS = [
  { label: 'غير شامل الضريبة', value: 'Tax Exclusive' },
  { label: "شامل الضريبة", value: "Tax Inclusive" },
  { label: 'معفى من الضرائب', value: 'Tax Exempt' },
];
// const AddTaxTreatmentOptionsForSchema = generateValesForSchema(TAX_TREATMENT_OPTIONS);

// : Missed, Attended, Scheduled and All

const REPORT_OPTIONS = [
  { label: ' الكل', value: 'All' },
  { label: 'مجدولة', value: 'Scheduled' },
  { label: " حضور", value: "Attended" },
  { label: 'متغيب', value: 'Missed' },
];



export {
  EMPLOYEE_TYPES,
  EmployeeTypesForSchema,
  STATUS_OPTIONS,
  StatusOptionsForSchema,
  EMPLOYEE_TITLES,
  EmployeeTitleForSchema,
  WAGE_TYPES,
  WageTypesForSchema,
  DAYS_OPTIONS,
  DaysOptinsForSchema,
  SERVICE_OPTIONS,
  ServicesOptionsForSchema,
  WORK_WAGE_TYPES,
  WorkWageTypesForSchema,
  ADD_SERVICE_OPTIONS,
  AddServiceOptionsForSchema,
  TAX_TREATMENT_OPTIONS,
  REPORT_OPTIONS,
  PAYMENT_OPTIONS,
  paymentOptionsForSchema,
  PACKAGE_STATUS_OPTIONS,
  // AddTaxTreatmentOptionsForSchema,
};

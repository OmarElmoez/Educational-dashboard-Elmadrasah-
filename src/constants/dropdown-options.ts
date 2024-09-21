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

// const FAMILY_STATUS = [
//   { label: "نشط", value: 'Active' },
//   { label: "غير نشط", value: "not-active" },
// ];

// const FamilyStatusForSchema = generateValesForSchema([
//   { label: "نشط", value: "family" },
// ]);

// const STUDENT_STATUS = [
//   { label: "نشط", value: "Active" },
//   { label: "غير نشط", value: "" },
// ];

// const StudentStatusForSchema = generateValesForSchema([
//   { label: "نشط", value: "Active" },
// ]);

const SERVICE_OPTIONS = [
  {
    label: "Use Service List Price",
    value: "Service List Cost",
  },
  {
    label: "Use Student Profile Price",
    value: "Use Student Profile Price",
  },
  {
    label: "Charge Flat Fee",
    value: "Flat Fee",
  },
  {
    label: "Package",
    value: "Package",
  },
];



const ServicesOptionsForSchema = generateValesForSchema(SERVICE_OPTIONS);

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
};

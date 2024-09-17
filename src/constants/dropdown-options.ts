const generateValesForSchema = (arr: { label: string; value: string }[]) => {
  return arr.map((type) => type.value);
};

const EMPLOYEE_TYPES = [
  { label: "إداري", value: "Staff" },
  { label: "مُعلم", value: "Teacher" },
];

const EmployeeTypesForSchema = generateValesForSchema(EMPLOYEE_TYPES);

const EMPLOYEE_STATUS = [
  { label: "نشط", value: "true" },
  { label: "غير نشط", value: "false" },
];

const EmployeeStatusForSchema = generateValesForSchema(EMPLOYEE_STATUS);

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
    label: "استخدام قائمة العمل و الأجور",
    value: "استخدام قائمة العمل و الأجور",
  },
  {
    label: "تعيين الاجر علي الملف الشخصي",
    value: "تعيين الاجر علي الملف الشخصي",
  },
];

const WageTypesForSchema = generateValesForSchema(WAGE_TYPES);



const DAYS_OPTIONS = [
  { label: "كل الأيام", value: "0" },
  { label: "السبت ", value: "1" },
  { label: "الأحد ", value: "2" },
  { label: "الأثنين ", value: "3" },
  { label: "الثلاثاء ", value: "4" },
  { label: "الاربعاء ", value: "5" },
  { label: "الخميس ", value: "6" },
  { label: "الجمعه ", value: "7" },
]

const DaysOptinsForSchema = generateValesForSchema(DAYS_OPTIONS);


export {
  EMPLOYEE_TYPES,
  EmployeeTypesForSchema,
  EMPLOYEE_STATUS,
  EmployeeStatusForSchema,
  EMPLOYEE_TITLES,
  EmployeeTitleForSchema,
  WAGE_TYPES,
  WageTypesForSchema,
  DAYS_OPTIONS,
  DaysOptinsForSchema
};
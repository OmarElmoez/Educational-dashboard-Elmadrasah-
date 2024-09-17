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
    label: "استخدام قائمةالخدمات ",
    value: "service",
  },
  {
    label: "تعيين الاجر علي الملف الشخصي",
    value: "wage",
  },
];

// const WORK_WAGE_TYPES = [
//   {
//     label: "استخدام قائمة العمل",
//     value: "work",
//   },
//   {
//     label: "تعيين الاجر علي الملف الشخصي",
//     value: "wage",
//   },
// ];

const WageTypesForSchema = generateValesForSchema(WAGE_TYPES);



const DAYS_OPTIONS = [
  // { label: "كل الأيام", value: "0" },
  { label: "الأحد ", value: "0" },
  { label: "الأثنين ", value: "1" },
  { label: "الثلاثاء ", value: "2" },
  { label: "الاربعاء ", value: "3" },
  { label: "الخميس ", value: "4" },
  { label: "الجمعه ", value: "5" },
  { label: "السبت ", value: "6" },
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
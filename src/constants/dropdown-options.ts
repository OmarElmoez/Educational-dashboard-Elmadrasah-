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

const WORK_WAGE_TYPES = [
  {
    label: "استخدام قائمة العمل",
    value: "work",
  },
  {
    label: "تعيين الاجر علي الملف الشخصي",
    value: "wage",
  },
];

const WageTypesForSchema = generateValesForSchema(WAGE_TYPES);

export {
  EMPLOYEE_TYPES,
  EmployeeTypesForSchema,
  EMPLOYEE_STATUS,
  EmployeeStatusForSchema,
  EMPLOYEE_TITLES,
  EmployeeTitleForSchema,
  WAGE_TYPES,
  WageTypesForSchema,
};
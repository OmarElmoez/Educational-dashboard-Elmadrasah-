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
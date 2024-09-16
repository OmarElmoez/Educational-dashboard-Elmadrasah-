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

export {
  EMPLOYEE_TYPES,
  EmployeeTypesForSchema,
  EMPLOYEE_STATUS,
  EmployeeStatusForSchema,
  EMPLOYEE_TITLES,
  EmployeeTitleForSchema,
};
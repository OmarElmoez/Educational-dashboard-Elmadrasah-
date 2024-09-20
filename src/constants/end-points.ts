import { TAddEmployeeFormDataForServer } from "@/schemas/AddEmployeeSchema";
import { TAddParentFormData } from "@/schemas/AddParentSchema";

const END_POINTS = {
  subject_choices: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/employee/subject/?ordering=-id",
    placeholder: "المواد",
  },
  initial_students: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/employee/student/",
    placeholder: "الطلاب",
  },
};

const POST_END_POINTS = {
  add_employee: {
    url: "http://127.0.0.1:8000/employee/modify/",
    dataType: {} as TAddEmployeeFormDataForServer,
  },
  add_family: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/family/",
    dataType: {} as TAddParentFormData,
  },
  add_individual_student: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/individual/",
    // Should change for individual student schema type
    dataType: {} as TAddParentFormData, 
  },
};

type TPurpose = keyof typeof POST_END_POINTS;

type TPostEndPoints = typeof POST_END_POINTS;

export type { TPurpose, TPostEndPoints };

export { END_POINTS, POST_END_POINTS };

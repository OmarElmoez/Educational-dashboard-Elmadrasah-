import { TAddEmployeeFormDataForServer } from "@/schemas/AddEmployeeSchema";
import { TAddParentFormData } from "@/schemas/AddParentSchema";
import { TAddStudentFormData } from "@/schemas/AddStudentSchema";
import { TAddStudentToFamilyFormData } from "@/schemas/AddStudentToFamilySchema";

const END_POINTS = {
  subject_choices: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/employee/subject/?ordering=-id",
    placeholder: "المواد",
  },
  initial_students: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/employee/student/",
    placeholder: "الطلاب",
  },
  "students_attributes.subject_choices": {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/employee/subject/?ordering=-id",
    placeholder: "المواد",
  },
  "students_attributes.initial_services": {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/dashboard/service/?paginate=false",
    placeholder: "الخدمات الإفتراضية",
  },
  "students_attributes.initial_teachers": {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/default-teachers?paginate=false",
    placeholder: "المعلمون ",
  },
  "students_attributes.student_curriculum": {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/curriculum?paginate=false",
    placeholder: " منهج الطالب  ",
  },
  "students_attributes.initial_location": {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/dashboard/location/?paginate=false",
    placeholder: " الموقع الافتراضي",
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
    dataType: {} as TAddStudentFormData,
  },
  add_family_student: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/family-student/",
    dataType: {} as TAddStudentToFamilyFormData,
  },
};

type TPurpose = keyof typeof POST_END_POINTS;

type TPostEndPoints = typeof POST_END_POINTS;

export type { TPurpose, TPostEndPoints };

export { END_POINTS, POST_END_POINTS };

const END_POINTS = {
  subject_choices: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/employee/subject/?ordering=-id",
    placeholder: "المواد",
  },
  "students_attributes.subject_choices": {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/employee/subject/?ordering=-id",
    placeholder: "المواد",
  },
  initial_students: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/employee/student/",
    placeholder: "الطلاب",
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
      url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/curriculum/?paginate=false",
      placeholder: " منهج الطالب  ",

  },
  "students_attributes.initial_location": {
      url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/dashboard/location/?paginate=false",
      placeholder: " الموقع الافتراضي",

  },
  
};

export default END_POINTS;

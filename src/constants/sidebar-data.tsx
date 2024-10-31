import {
  BoyIcon,
  CalendarIcon,
  Lesson,
  UnscheduledIcon,
  CalendarMiniIcon,
  HomeIcon,
  PH_boyIcon,
  PH_calendarIcon,
  PH_homeIcon,
  PH_reportsIcon,
  PH_teacherIcon,
  ReportsIcon,
  TeacherIcon,
  EmployeeHoursIcon,
  AddEmployeIcon,
  EmployePaymentsIcon,
  EmployeesIcon,
  InvoiceIcon,
  ClientCreditsIcon,
  ClientSubbsIcon,
  ClientpaymentsIcon,
  ClientInvoicesIcon,
  CreateInvoicesIcon,
  CreateInvoicesIcon_2,
  ClientReportIcon,

  StudentsIcon,
  FamiliesIcon,
  AddStdFamilyIcon,
  AddStdIcon,
} from "@/assets/nav-icons";

import StudentIcon from "@/assets/student.svg?react";
import UploadIcon from "@/assets/upload_icon.svg?react";

const SIDEBAR_DATA = {
  Student: [
    {
      title: "الرئيسية",
      path: "/student",
      icon: <HomeIcon />,
      phone_icon: <PH_homeIcon />,
    },
    {
      title: "الجدول",
      path: "calendar",
      icon: <CalendarIcon />,
      phone_icon: <PH_calendarIcon />,
    },
  ],

  Admin: [
    {
      title: "الرئيسية",
      path: "/admin",
      icon: <HomeIcon />,
      phone_icon: <PH_homeIcon />,
    },
    {
      title: "التقويم",
      path: "calendar",
      icon: <CalendarIcon />,
      phone_icon: <PH_calendarIcon />,
      children: [
        {
          title: "دخول الحصة للطالب** ",
          path: "classes",
          icon: <CalendarMiniIcon />,
          phone_icon: <PH_calendarIcon />,
        },
        {
          title: "**دخول الحصة للمدرس",
          path: "classes",
          icon: <CalendarMiniIcon />,
          phone_icon: <PH_calendarIcon />,
        },
        {
          title: "**الدرس كامل",
          path: "classes",
          icon: <Lesson />,
          phone_icon: <PH_calendarIcon />,
        },
        {
          title: "الطلاب الغير مجدولين",
          path: "calendar/all-unscheduled-list",
          icon: <UnscheduledIcon />,
        },
        {
          title: "جدولي",
          path: "calendar/classes",
          icon: <CalendarMiniIcon />,
          phone_icon: <PH_calendarIcon />,
        },
      ],
    },
    {
      title: "الطلاب",
      path: "students",
      icon: <StudentIcon />,
      phone_icon: <PH_boyIcon />,
      children: [
        {
          title: " الطلاب",
          path: "students/students-list",
          icon: <StudentsIcon />,
        },
        {
          title: "العائلات **",
          path: "students/students-list",
          icon: <FamiliesIcon />,
        },
        {
          title: "إضافة عائلة",
          path: "students/add-family",
          icon: <FamiliesIcon />,
        },
        {
          title: "إضافة طالب الى عائلة",
          path: "students/add-family-student",
          icon: <AddStdFamilyIcon />,
        },
        {
          title: " إضافة طالب منفصل",
          path: "students/add-student",
          icon: <AddStdIcon />,
        },
      ],
    },
    {
      title: "الموظفين",
      path: "employees",
      icon: <TeacherIcon />,
      phone_icon: <PH_teacherIcon />,
      children: [
        {
          title: "** الموظفين",
          path: "employees/teachers",
          icon: <EmployeesIcon />,
          phone_icon: <PH_teacherIcon />,
        },
        {
          title: "** ساعات عمل الموظفين",
          path: "employees/teachers",
          icon: <EmployeeHoursIcon />,
          phone_icon: <PH_teacherIcon />,
        },
        {
          title: "إضافة موظف",
          path: "employees/add-employee",
          icon: <AddEmployeIcon />,
        },
        {
          title: "**مدفوعات الموظفين ",
          path: "employees/teachers",
          icon: <EmployePaymentsIcon />,
          phone_icon: <PH_teacherIcon />,
        },
        {
          title: "** استيراد الموظفين",
          path: "employees/teachers",
          icon: <UploadIcon />,
          phone_icon: <PH_teacherIcon />,
        },
      ],
    },
    {
      title: " الفواتير",
      path: "invoices",
      icon: <InvoiceIcon />,
      children: [
        {
          title: "**أرصدة العملاء ",
          path: "invoices/invoices-list",
          icon: <ClientCreditsIcon />,
        },
        {
          title: "أرصدة الاشتراكات ",
          path: "invoices/balance-list",
          icon: <ClientSubbsIcon />,
        },
        {
          title: "المدفوعات",
          path: "invoices/invoices-list",
          icon: <ClientpaymentsIcon />,
        },
        {
          title: "الفواتير",
          path: "invoices/invoices-list",
          icon: <ClientInvoicesIcon />,
        },
        {
          title: "إنشاء فاتورة واحدة ",
          path: "invoices/create-invoice",
          icon: <CreateInvoicesIcon />,
        },
        {
          title: "إنشاء فواتير متعددة** ",
          path: "invoices/invoices-list",
          icon: <CreateInvoicesIcon_2 />,
        },
        {
          title: "إصدار مذكرة ائتمان **",
          path: "invoices/invoices-list",
          icon: <ClientReportIcon />,
        },
      ],
    },

    {
      title: "التقارير",
      path: "reports",
      icon: <ReportsIcon />,
      phone_icon: <PH_reportsIcon />,
    },


 
  ],

  Teacher: [
    {
      title: "الرئيسية",
      path: "/teacher",
      icon: <HomeIcon />,
      phone_icon: <PH_homeIcon />,
    },
    {
      title: "الحصص",
      path: "classes",
      icon: <CalendarIcon />,
      phone_icon: <PH_calendarIcon />,
    },
    {
      title: "الطلاب",
      path: "students",
      icon: <BoyIcon />,
      phone_icon: <PH_boyIcon />,
    },
    {
      title: "التقارير",
      path: "reports",
      icon: <ReportsIcon />,
      phone_icon: <PH_reportsIcon />,
    },
  ],

  Family: [
    {
      title: "الرئيسية",
      path: "/family",
      icon: <HomeIcon />,
      phone_icon: <PH_homeIcon />,
    },
    {
      title: "الجدول",
      path: "calendar",
      icon: <CalendarIcon />,
      phone_icon: <PH_calendarIcon />,
    },
    {
      title: "الملاحظات",
      path: "notes",
      icon: <ReportsIcon />,
      phone_icon: <PH_reportsIcon />,
    },
  ],
};

export default SIDEBAR_DATA;

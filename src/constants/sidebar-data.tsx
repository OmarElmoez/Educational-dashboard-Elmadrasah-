import {
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
import RolesIcon from "@/assets/roles.svg?react"

const SIDEBAR_DATA = {
  Student: [
    {
      title: "الرئيسية",
      path: "/student",
      icon: <HomeIcon />,
      phone_icon: <PH_homeIcon />,
      children: undefined
    },
    {
      title: "الجدول",
      path: "calendar",
      icon: <CalendarIcon />,
      phone_icon: <PH_calendarIcon />,
      children: undefined
    },
  ],

  Admin: [
    {
      title: "الرئيسية",
      path: "/admin",
      icon: <HomeIcon />,
      phone_icon: <PH_homeIcon />,
      children: undefined
    },
    {
      title: "التقويم",
      path: "calendar",
      icon: <CalendarIcon />,
      phone_icon: <PH_calendarIcon />,
      children: [
        {
          title: "دخول الحصة للطالب",
          path: "calendar/join-student",
          icon: <CalendarMiniIcon />,
          phone_icon: <PH_calendarIcon />,
        },
        {
          title: "دخول الحصة للمدرس",
          path: "join-teacher",
          icon: <CalendarMiniIcon />,
          phone_icon: <PH_calendarIcon />,
        },
        {
          title: "الدرس كامل",
          path: "all-lesson",
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
          title: "الطلاب",
          path: "students/students-list",
          icon: <StudentsIcon />,
        },
        {
          title: "العائلات",
          path: "students/families-list",
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
          title: "إضافة طالب منفصل",
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
          title: "الموظفين",
          path: "employees/teachers",
          icon: <EmployeesIcon />,
          phone_icon: <PH_teacherIcon />,
        },
        {
          title: "ساعات عمل الموظفين",
          path: "employees/work-hours",
          icon: <EmployeeHoursIcon />,
          phone_icon: <PH_teacherIcon />,
        },
        {
          title: "إضافة موظف",
          path: "employees/add-employee",
          icon: <AddEmployeIcon />,
        },
        {
          title: "مدفوعات الموظفين",
          path: "employees/purchases",
          icon: <EmployePaymentsIcon />,
          phone_icon: <PH_teacherIcon />,
        },
        {
          title: "استيراد الموظفين",
          path: "employees/import",
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
          title: "أرصدة العملاء",
          path: "invoices/customer-balances",
          icon: <ClientCreditsIcon />,
        },
        {
          title: "أرصدة الاشتراكات",
          path: "invoices/balance-list",
          icon: <ClientSubbsIcon />,
        },
        {
          title: "المدفوعات",
          path: "invoices/payments",
          icon: <ClientpaymentsIcon />,
        },
        {
          title: "الفواتير",
          path: "invoices/invoices-list",
          icon: <ClientInvoicesIcon />,
        },
        {
          title: "إنشاء فاتورة واحدة",
          path: "invoices/create-invoice",
          icon: <CreateInvoicesIcon />,
        },
        {
          title: "إنشاء فواتير متعددة",
          path: "invoices/create-multiple-invoices",
          icon: <CreateInvoicesIcon_2 />,
        },
        {
          title: "إصدار مذكرة ائتمان",
          path: "invoices/create-credit-memo",
          icon: <ClientReportIcon />,
        },
      ],
    },

    {
      title: "التقارير",
      path: "reports",
      icon: <ReportsIcon />,
      phone_icon: <PH_reportsIcon />,
      children: undefined
    },

    {
      title: "الادوار",
      path: "roles",
      icon: <RolesIcon />,
      children: undefined
    }
 
  ],

  Teacher: [
    {
      title: "الرئيسية",
      path: "/teacher",
      icon: <HomeIcon />,
      phone_icon: <PH_homeIcon />,
      children: undefined
    },
    {
      title: "الحصص",
      path: "classes",
      icon: <CalendarIcon />,
      phone_icon: <PH_calendarIcon />,
      children: undefined
    },
    {
      title: "الطلاب",
      path: "students",
      icon: <StudentIcon />,
      phone_icon: <PH_boyIcon />,
      children: undefined
    },
    {
      title: "التقارير",
      path: "reports",
      icon: <ReportsIcon />,
      phone_icon: <PH_reportsIcon />,
      children: undefined
    },
  ],

  Family: [
    {
      title: "الرئيسية",
      path: "/family",
      icon: <HomeIcon />,
      phone_icon: <PH_homeIcon />,
      children: undefined
    },
    {
      title: "الجدول",
      path: "calendar",
      icon: <CalendarIcon />,
      phone_icon: <PH_calendarIcon />,
      children: undefined
    },
    {
      title: "الملاحظات",
      path: "notes",
      icon: <ReportsIcon />,
      phone_icon: <PH_reportsIcon />,
      children: undefined
    },
  ],
};

export default SIDEBAR_DATA;

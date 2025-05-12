import {
  CalendarIcon,
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
import RolesIcon from "@/assets/roles.svg?react";
import NewOrdersIcon from "@/assets/new-orders.svg?react";
import InboxIcon from "@/assets/inbox_icon.svg?react";

const SIDEBAR_DATA = {
  Student: [
    // {
    //   title: "الرئيسية",
    //   path: "/student",
    //   icon: <HomeIcon />,
    //   phone_icon: <PH_homeIcon />,
    //   page_title: "الجدول",
    //   children: undefined
    // },
    {
      title: "الجدول",
      path: "/student",
      icon: <CalendarIcon />,
      phone_icon: <PH_calendarIcon />,
      page_title: "جدولي",
      children: undefined
    },
  ],

  Admin: [
    {
      title: "الرئيسية",
      path: "/admin",
      icon: <HomeIcon />,
      phone_icon: <PH_homeIcon />,
      page_title: "الجدول",
      children: undefined
    },
    {
      title: "التقويم",
      path: "calendar",
      icon: <CalendarIcon />,
      phone_icon: <PH_calendarIcon />,
      page_title: "الجدول",
      children: [
        // {
        //   title: "دخول الحصة للطالب",
        //   path: "calendar/join-student",
        //   icon: <CalendarMiniIcon />,
        //   phone_icon: <PH_calendarIcon />,
        //   page_title: "دخول الحصة",
        // },
        // {
        //   title: "دخول الحصة للمدرس",
        //   path: "join-teacher",
        //   icon: <CalendarMiniIcon />,
        //   phone_icon: <PH_calendarIcon />,
        //   page_title: "دخول الحصة",
        // },
        // {
        //   title: "الدرس كامل",
        //   path: "all-lesson",
        //   icon: <Lesson />,
        //   phone_icon: <PH_calendarIcon />,
        //   page_title: "دخول الحصة",
        // },
        {
          title: "الطلاب الغير مجدولين",
          path: "calendar/all-unscheduled-list",
          icon: <UnscheduledIcon />,
          page_title: "الطلاب الغير مجدولين",
        },
        {
          title: "الجدول",
          path: "calendar/classes",
          icon: <CalendarMiniIcon />,
          phone_icon: <PH_calendarIcon />,
          page_title: "الجدول",
        },
      ],
    },
    {
      title: "الطلاب",
      path: "students",
      icon: <StudentIcon />,
      phone_icon: <PH_boyIcon />,
      page_title: "الطلاب",
      children: [
        {
          title: "الطلاب",
          path: "students/students-list",
          icon: <StudentsIcon />,
          page_title: "الطلاب",
        },
        {
          title: "العائلات",
          path: "students/families-list",
          icon: <FamiliesIcon />,
          page_title: "العائلات",
        },
        {
          title: "إضافة عائلة",
          path: "students/add-family",
          icon: <FamiliesIcon />,
          page_title: "إضافة عائلة",
        },
        {
          title: "إضافة طالب الى عائلة",
          path: "students/add-family-student",
          icon: <AddStdFamilyIcon />,
          page_title: "إضافة طالب الى عائلة",
        },
        {
          title: "إضافة طالب مستقل",
          path: "students/add-student",
          icon: <AddStdIcon />,
          page_title: "إضافة طالب مستقل",
        },
      ],
    },
    {
      title: "الموظفين",
      path: "employees",
      icon: <TeacherIcon />,
      phone_icon: <PH_teacherIcon />,
      page_title: "الموظفين",
      children: [
        {
          title: "الموظفين",
          path: "employees/teachers",
          icon: <EmployeesIcon />,
          phone_icon: <PH_teacherIcon />,
          page_title: "الموظفين",
        },
        {
          title: "ساعات عمل الموظفين",
          path: "employees/work-hours",
          icon: <EmployeeHoursIcon />,
          phone_icon: <PH_teacherIcon />,
          page_title: "ساعات عمل الموظفين",
        },
        {
          title: "إضافة موظف",
          path: "employees/add-employee",
          icon: <AddEmployeIcon />,
          page_title: "إضافة موظف",
        },
        {
          title: "مدفوعات الموظفين",
          path: "employees/purchases",
          icon: <EmployePaymentsIcon />,
          phone_icon: <PH_teacherIcon />,
          page_title: "مدفوعات الموظفين",
        },
        {
          title: "استيراد الموظفين",
          path: "employees/import",
          icon: <UploadIcon />,
          phone_icon: <PH_teacherIcon />,
          page_title: "استيراد الموظفين",
        },
      ],
    },
    {
      title: "الفواتير",
      path: "invoices",
      icon: <InvoiceIcon />,
      page_title: "الفواتير",
      children: [
        {
          title: "أرصدة العملاء",
          path: "invoices/customer-balances",
          icon: <ClientCreditsIcon />,
          page_title: "أرصدة العملاء",
        },
        {
          title: "أرصدة الاشتراكات",
          path: "invoices/balance-list",
          icon: <ClientSubbsIcon />,
          page_title: "أرصدة الاشتراكات",
        },
        {
          title: "المدفوعات",
          path: "invoices/payments",
          icon: <ClientpaymentsIcon />,
          page_title: "المدفوعات",
        },
        {
          title: "الفواتير",
          path: "invoices/invoices-list",
          icon: <ClientInvoicesIcon />,
          page_title: "الفواتير",
        },
        {
          title: "إنشاء فاتورة واحدة",
          path: "invoices/create-invoice",
          icon: <CreateInvoicesIcon />,
          page_title: "إنشاء فاتورة واحدة",
        },
        {
          title: "إنشاء فواتير متعددة",
          path: "invoices/create-multiple-invoices",
          icon: <CreateInvoicesIcon_2 />,
          page_title: "إنشاء فواتير متعددة",
        },
        {
          title: "إصدار مذكرة ائتمان",
          path: "invoices/create-credit-memo",
          icon: <ClientReportIcon />,
          page_title: "إصدار مذكرة ائتمان",
        },
        {
          title: "الطلبات الجديدة",
          path: "invoices/new-orders",
          icon: <NewOrdersIcon />,
          page_title: "الطلبات الجديدة",
        },
      ],
    },
    {
      title: "الادوار",
      path: "roles",
      icon: <RolesIcon />,
      page_title: "الادوار",
      children: undefined
    },
    {
      title: "التقارير",
      path: "reports",
      icon: <ReportsIcon />,
      phone_icon: <PH_reportsIcon />,
      page_title: "التقارير",
      children: [
        {
          title: "تقارير اليوم",
          path: "reports/daily",
          icon: <ReportsIcon />,
          page_title: "تقارير اليوم",
        }
      ]
    },
    {
      title: "العمليات",
      path: "inbox",
      icon: <InboxIcon />,
      page_title: "العمليات",
      children: undefined
      //  [
      //   {
      //     title: "الملفات",
      //     path: "inbox/files",
      //     icon: <UploadIcon />,
      //     page_title: "الملفات"
      //   },
      //   {
      //     title: "الريفيوهات",
      //     path: "inbox/reviews",
      //     icon: <UploadIcon />,
      //     page_title: "ريفيوهات"
      //   },
      //   {
      //     title: "الملاحظات",
      //     path: "inbox/notes",
      //     icon: <UploadIcon />,
      //     page_title: "الملاحظات"
      //   }
      // ]
    }
  ],

  Teacher: [
    // {
    //   title: "الرئيسية",
    //   path: "/teacher",
    //   icon: <HomeIcon />,
    //   phone_icon: <PH_homeIcon />,
    //   page_title: "الجدول",
    //   children: undefined
    // },
    {
      title: "الحصص",
      path: "/teacher",
      icon: <CalendarIcon />,
      phone_icon: <PH_calendarIcon />,
      page_title: "جدولي",
      children: undefined
    },
    // {
    //   title: "الطلاب",
    //   path: "students",
    //   icon: <StudentIcon />,
    //   phone_icon: <PH_boyIcon />,
    //   page_title: "الطلاب",
    //   children: undefined
    // },
    // {
    //   title: "التقارير",
    //   path: "reports",
    //   icon: <ReportsIcon />,
    //   phone_icon: <PH_reportsIcon />,
    //   page_title: "التقارير",
    //   children: undefined
    // },
  ],

  Family: [
    // {
    //   title: "الرئيسية",
    //   path: "/family",
    //   icon: <HomeIcon />,
    //   phone_icon: <PH_homeIcon />,
    //   page_title: "الجدول",
    //   children: undefined
    // },
    {
      title: "الجدول",
      path: "/family",
      icon: <CalendarIcon />,
      phone_icon: <PH_calendarIcon />,
      page_title: "الجدول",
      children: undefined
    },
    // {
    //   title: "الملاحظات",
    //   path: "notes",
    //   icon: <ReportsIcon />,
    //   phone_icon: <PH_reportsIcon />,
    //   page_title: "الملاحظات",
    //   children: undefined
    // },
  ],
};

export const INNER_ROUTES_TITLES = {
  "/admin/calendar/classes/hourly-lessons": "تقارير اليوم"
}

export default SIDEBAR_DATA;

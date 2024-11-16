import {ClassesDates, Notes, Summary, UploadFiles} from "@/components/tabs/sub-components";


const STUDENT_TABS = [
  {
    id: 0,
    label: "ملخص",
    content: <Summary />
  },
  {
    id: 1,
    label: "تواريخ الحصص",
    content: <ClassesDates />
  },
  {
    id: 2,
    label: "ملفات",
    content: <UploadFiles />
  },
  {
    id: 3,
    label: "ملاحظات الإدارة",
    content: <Notes />
  },
]

export {
  STUDENT_TABS,
}
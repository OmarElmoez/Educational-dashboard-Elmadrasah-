import {ClassesDates, Notes, NotesAboutStudent, Summary, UploadFiles} from "@/components/tabs/sub-components";
import {TTab} from "@/components/tabs/Tabs.tsx";
import {TLesson} from "@/schemas/LessonSchema.ts";

type TGenerateTabsProps = {
  lessonData: TLesson | undefined;
  classId: string | undefined;
  isTeacher: boolean
}

const generateTabs = ({lessonData, classId, isTeacher}: TGenerateTabsProps) => {
  const DEFAULT_TABS: TTab[] = [
    {
      id: 0,
      label: "ملخص",
      content: Summary,
      page: "join-class",
      contentProps: {classId}
    },
    {
      id: 1,
      label: "تواريخ الحصص",
      content: ClassesDates,
      page: "join-class",
      contentProps: {classId}
    },
    {
      id: 2,
      label: "ملفات",
      content: UploadFiles,
      page: "join-class",
      contentProps: {classId}
    },
    {
      id: 3,
      label: "ملاحظات الإدارة",
      page: "join-class",
      content: Notes
    },
  ]

  if (isTeacher) {
    DEFAULT_TABS.push({
      id: 4,
      label: 'ملاحظات عن الطالب',
      content: NotesAboutStudent,
      page: "join-class",
      contentProps: {desc: lessonData?.description}
    })
  }
  return DEFAULT_TABS;
}

export default generateTabs;
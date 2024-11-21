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
      contentProps: {classId}
    },
    {
      id: 1,
      label: "تواريخ الحصص",
      content: ClassesDates,
      contentProps: {classId}
    },
    {
      id: 2,
      label: "ملفات",
      content: UploadFiles,
      contentProps: {classId}
    },
    {
      id: 3,
      label: "ملاحظات الإدارة",
      content: Notes
    },
  ]

  if (isTeacher) {
    DEFAULT_TABS.push({
      id: 4,
      label: 'ملاحظات عن الطالب',
      content: NotesAboutStudent,
      contentProps: {desc: lessonData?.description}
    })
  }
  return DEFAULT_TABS;
}

export default generateTabs;
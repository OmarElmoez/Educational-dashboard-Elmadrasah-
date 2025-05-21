import {ClassesDates, Notes, NotesAboutStudent, Summary, UploadFiles} from "@/components/tabs/sub-components";
import {TTab} from "@/components/tabs/Tabs.tsx";
import {TLesson} from "@/schemas/LessonSchema.ts";
import store from "@/store";

type TGenerateTabsProps = {
  lessonData: TLesson | undefined;
  classId: string | undefined;
}

const generateTabs = ({lessonData, classId}: TGenerateTabsProps) => {

  const state = store.getState();
  const role = state.auth.credintials?.role;

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

  if (role === 'Teacher') {
    DEFAULT_TABS.push({
      id: 4,
      label: 'ملاحظات عن الطالب',
      content: NotesAboutStudent,
      page: "join-class",
      contentProps: {desc: lessonData?.description}
    })
  }

  if (role === 'Admin') {
    DEFAULT_TABS.push({
      id: 4,
      label: 'التقييمات',
      content: NotesAboutStudent,
      page: "join-class",
      contentProps: {desc: lessonData?.description}
    })
  }
  return DEFAULT_TABS;
}

export default generateTabs;
import {ClassesForDay, ScheduleForDay} from "@/components";

import Calendar from "@/components/calendar/Calendar.tsx";
import {TTab} from "@/components/tabs/Tabs.tsx";
import {AllHours, CurrentHour, Overview} from "@/components/tabs/sub-components";

const ADMIN_TABS: TTab[] = [
  {
    id: 0,
    label: "الساعة الحالية",
    content: CurrentHour,
  },
  {
    id: 1,
    label: "نظرة عامة",
    content: Overview,
  },
  {
    id: 2,
    label: "جميع الساعات",
    content: AllHours,
  }
]

const AdminClassesPage = () => {

  return (
    <>
      <section className='calendar_wrapper'>
        <Calendar />
        <ScheduleForDay tabs={ADMIN_TABS} />
      </section>

      <ClassesForDay />
    </>
  );
};

export default AdminClassesPage;
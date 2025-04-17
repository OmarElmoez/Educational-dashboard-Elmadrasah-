import { useState } from "react";
import styles from "../lists.module.css";
import { Row } from "@/components";
import UnscheduledFamilyList from "./UnscheduledFamilyList";
import UnscheduledSeparateStudentsTable from "@/components/table/unscheduled-tables/UnscheduledSeparateStudentsTable";
const {
  balance_container,
  balance_right,
  balance_right_header,
  balance_right_header_title,
  tab_button,
  active_tab_button,
  divider,
} = styles;

// -----------------------------------------------------------------------------------------
const GeneralUnscheduledLists = () => {
  const [activeTab, setActiveTab] = useState<string>("family");
  const [familiesCount, setFamiliesCount] = useState<number>(0);
  const [studentsCount, setStudentsCount] = useState<number>(0);
  const TABS = [
    {
      id: "family",
      title: "طلاب عائلات",
      component: UnscheduledFamilyList({ setFamiliesCount }),
    },
    {
      id: "independent",
      title: "طلاب مستقلين",
      component: UnscheduledSeparateStudentsTable({ setStudentsCount }),
    },
  ];

  return (
    <>
      <section className={balance_container}>
        <div className={balance_right}>
          <h3 className={balance_right_header_title}>
            الطلاب الغير مجدولين ({(studentsCount || 0) + (familiesCount || 0)})
          </h3>
          <div className={balance_right_header} style={{ alignItems: "end" }}>
            <Row style={{ marginBottom: ".4rem" }}>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={
                    activeTab === tab.id ? active_tab_button : tab_button
                  }
                >
                  {tab.title} (
                  {tab.id === "family"
                    ? familiesCount || 0
                    : studentsCount || 0}
                  )
                </button>
              ))}
            </Row>
          </div>
          <hr className={divider} style={{ marginTop: 0 }} />
          <div className="main_page_container">
            {TABS.map(
              (tab) =>
                tab.id === activeTab && <div key={tab.id}>{tab.component}</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default GeneralUnscheduledLists;

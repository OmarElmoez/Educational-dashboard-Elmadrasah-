import { useEffect, useState } from "react";
import styles from "../lists.module.css";
import { Row } from "@/components";
import {
  getUnscheduledFamilyList,
  getUnscheduledList,
} from "@/services/unscheduled";
import WinnersList from "./WinnersTableList";
import ParticipantList from "./ParticipantList";
// -----------------------------------------------------------------------------------------
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
const GeneralScheduledEmployeesLists = () => {
  // table data states:
  const [studentsCount, setStudentsCount] = useState<number>(0);
  const [familiesCount, setFamiliesCount] = useState<number>(0);

  const [activeTab, setActiveTab] = useState<string>("winners");

  const TABS = [
    {
      id: "winners",
      title: "المدرسين الفائزين بالقرعه",
      component: WinnersList,
    },
    {
      id: "losers",
      title: "طلاب مستقلين",
      component: ParticipantList,
    },
  ];



  useEffect(() => {
    // get All Data length
    getUnscheduledList(1, null).then((res) => {
      setStudentsCount(res.count);
    });

    getUnscheduledFamilyList(1, null).then((res) => {
      setFamiliesCount(res.count);
    });
  }, []);



  return (
    <>
      <section className={balance_container}>
        <div className={balance_right}>
          <h3 className={balance_right_header_title}>
           التقويم
          </h3>
          <div className={balance_right_header} style={{ alignItems: "end" }}>
            {/* TABS BAR */}
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
                  {tab.id === "winners" ? familiesCount : studentsCount})
                </button>
              ))}
            </Row>

          </div>

          <hr className={divider} style={{ marginTop: 0 }} />

          <div className="main_page_container">
            {TABS.map(
              (tab) =>
                tab.id === activeTab && (
                  <div key={tab.id}>
                    <tab.component />
                  </div>
                )
            )}
          </div>
        </div>

       
      </section>
    </>
  );
};

export default GeneralScheduledEmployeesLists;

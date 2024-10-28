import { useState } from "react";
import styles from "../lists.module.css";
import { Row } from "@/components";
import WinnersList from "./WinnersTableList";
import ParticipantList from "./ParticipantList";
import { useParams } from "react-router-dom";
// -----------------------------------------------------------------------------------------
const {
  balance_right,
  balance_right_header,
  balance_right_header_title,
  tab_button,
  active_tab_button,
  divider,
} = styles;


// -----------------------------------------------------------------------------------------
const GeneralScheduledEmployeesLists = () => {

  const [activeTab, setActiveTab] = useState<string>("winners");
  const {std_id, id} = useParams();
console.log("std_id, id", std_id, id);



  const TABS = [
    {
      id: "winners",
      title: "المدرسين الفائزين بالقرعه",
      component: WinnersList,
    },
    {
      id: "losers",
      title: "المدرسين المشاركين  ",
      component: ParticipantList,
    },
  ];

  return (
    <>
      <section>
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
                  {tab.title}
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

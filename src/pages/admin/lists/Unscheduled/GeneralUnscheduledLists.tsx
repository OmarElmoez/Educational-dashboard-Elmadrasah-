import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../lists.module.css";
import { TModalRef } from "@/types/shared";
import FilterIcon from "@/assets/filter_icon.svg?react";
import AddStudentIcon from "@/assets/add_user_icon.svg?react";
import FamilyIcon from "@/assets/family_icon.svg?react";
import Download from "@/assets/download.svg?react";
import UploadIcon from "@/assets/upload_icon.svg?react";
import { Row, SearchSection } from "@/components";
import {
  getUnscheduledFamilyList,
  getUnscheduledList,
} from "@/services/unscheduled";
import UnscheduledFamilyList from "./UnscheduledFamilyList";
import UnscheduledList from "./UnscheduledList";

// -----------------------------------------------------------------------------------------
const LIST_OPTIONS = [
  { id: 1, link: "", title: "إضافة عائلة جديدة", icon: <FamilyIcon /> },
  { id: 2, link: "", title: "تنزيل الطلاب", icon: <UploadIcon /> },
  { id: 3, link: "", title: "استيراد الطلاب", icon: <Download /> },
  { id: 4, link: "", title: "إضافة طالب جديد", icon: <AddStudentIcon /> },
];

// -----------------------------------------------------------------------------------------
const {
  balance_container,
  balance_left,
  balance_right,
  balance_right_header,
  balance_right_header_title,
  tab_button,
  active_tab_button,
  header_filter,
  search_bar,
  filter_button,
  link_item,
  divider,
} = styles;

// -----------------------------------------------------------------------------------------
const GeneralUnscheduledLists = () => {
  const filterStudentFormRef = useRef<TModalRef>(null);
  const filterFamilyFormRef = useRef<TModalRef>(null);

  // table data states:
  const [allDataCount, setAllDataCount] = useState<number>(0);
  const [studentsCount, setStudentsCount] = useState<number>(0);
  const [familiesCount, setFamiliesCount] = useState<number>(0);

  const [activeTab, setActiveTab] = useState<string>("family");

  const TABS = [
    {
      id: "family",
      title: "طلاب عائلات",
      component: UnscheduledFamilyList,
      formRef: filterFamilyFormRef,
    },
    {
      id: "independent",
      title: "طلاب مستقلين",
      component: UnscheduledList,
      formRef: filterStudentFormRef,
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

  useEffect(() => {
    setAllDataCount(studentsCount + familiesCount);
  }, [studentsCount, familiesCount]);

  return (
    <>
      <section className={balance_container}>
        <div className={balance_right}>
          <h3 className={balance_right_header_title}>
            {" "}
            الطلاب الغير مجدولين ({allDataCount})
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
                  {tab.id === "family" ? familiesCount : studentsCount})
                </button>
              ))}
            </Row>

            <div className={header_filter}>
              <SearchSection searchFor="balances" classNames={search_bar} />

              <button
                className={filter_button}
                onClick={() => filterFamilyFormRef?.current?.open()}
              >
                <FilterIcon />
              </button>
            </div>

            
          </div>

          <hr className={divider} style={{ marginTop: 0 }} />

          <div className="main_page_container">
            {TABS.map(
              (tab) =>
                tab.id === activeTab && (
                  <div key={tab.id}>
                    <tab.component formRef={tab.formRef} />
                  </div>
                )
            )}
          </div>
        </div>

        <div className={balance_left}>
          <ul>
            {LIST_OPTIONS.map((item) => (
              <li key={item.id}>
                <Link to={item.link} className={link_item}>
                  {item.icon}
                  <p>{item.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default GeneralUnscheduledLists;

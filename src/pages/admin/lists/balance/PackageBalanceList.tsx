import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TABLE_HEAD_DATA } from "@/constants";
import MainTable from "@/components/table/MainTable";
import FilterForm, { FilterFormData } from "./FilterForm";
import BasicModal from "@/components/add-new-subject-model/BasicModal";
import BalanceTableRow from "@/components/table/BalanceTableRow";
import styles from "../lists.module.css";
import filterStyles from "../filterForm.module.css";
import { TModalRef } from "@/types/shared";
import FilterIcon from "@/assets/filter_icon.svg?react";
import FilterIconSmall from "@/assets/filter_icon_small.svg?react";
// import SearchIcon from "@/assets/search.svg?react";
import Archive from "@/assets/archive.svg?react";
import Download from "@/assets/download.svg?react";
import List from "@/assets/list.svg?react";
import { Row, DebounceSearchBox } from "@/components";
import { getPackageBalanceList } from "@/services/packageBalance";
import { TBalance } from "@/types/table";

// -----------------------------------------------------------------------------------------
const LIST_OPTIONS = [
  { id: 1, link: "", title: "أرشيف الأرصدة", icon: <Archive /> },
  { id: 2, link: "", title: "تنزيل الأرصدة", icon: <Download /> },
  { id: 3, link: "", title: "الأرصدة الفردية", icon: <List /> },
  { id: 4, link: "", title: "تحويل المستقلين", icon: <List /> },
];

// -----------------------------------------------------------------------------------------
const {
  actions,
  balance_container,
  balance_left,
  balance_right,
  balance_right_header,
  search_bar,
  filter_button,
  link_item,
  divider,
} = styles;
const {
  modal_header_container,
  modal_header_title,
} = filterStyles;
// -----------------------------------------------------------------------------------------
const PackageBalanceList = () => {
  const filterFormRef = useRef<TModalRef>(null);

  // table data states:
  const [tableData, setTableData] = useState<TBalance[] | null>(null);
  const [allDataCount, setAllDataCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<FilterFormData | null>(null);

  // handle change pages:
  const handleNextPage = () => {
    const pageNum = currentPage + 1;
    const totalPages = Math.ceil(allDataCount / 10);
    if (pageNum <= totalPages)
      getPackageBalanceList(pageNum, searchTerm).then((res) =>
        setTableData(res.results)
      );
    setCurrentPage(pageNum);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      getPackageBalanceList(currentPage - 1, searchTerm).then((res) =>
        setTableData(res.results)
      );
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterSubmit = (filters: FilterFormData | null) => {
    setSearchTerm(filters);
    filterFormRef.current?.close();
    console.log("filters", filters);
    
  };

  // Debounce Function
  const handleSearch = (debouncedSearchTerm: string | null) => {
    getPackageBalanceList(1, {name: debouncedSearchTerm, email: debouncedSearchTerm}).then((res) => {
      setTableData(res.results);
      setAllDataCount(res.count);
    });
  }

  useEffect(() => {
    // get All Data
    getPackageBalanceList(currentPage, searchTerm).then((res) => {
      setTableData(res.results);
      setAllDataCount(res.count);
    });
  }, [currentPage, searchTerm]);

  return (
    <>
      <BasicModal
        ref={filterFormRef}
        header={
          <div className={modal_header_container}>
            <FilterIconSmall />
            <p className={modal_header_title}>التصفية</p>
          </div>
        }
      >
        <FilterForm onSubmit={handleFilterSubmit} />
      </BasicModal>
      <section className={balance_container}>
        <div className={balance_right}>
          <div className={balance_right_header}>
            <h3>أرصدة الاشتراكات ( {allDataCount})</h3>

            <Row style={{gap: '1.6rem'}}>
              <DebounceSearchBox classNames={search_bar} handleSearch={handleSearch} />
              {/* 
              <div className={search_bar}>

                 <input type="text" placeholder="بحث" className={inputbox} /> 
                <div className={icon}>
                  <SearchIcon />
                </div> 
              </div>
                */}

              <button
                className={filter_button}
                onClick={() => filterFormRef?.current?.open()}
              >
                <FilterIcon />
              </button>
            </Row>
          </div>
          <hr className={divider} />

          <MainTable headData={TABLE_HEAD_DATA["balance"]} isCheckbox={false}>
            {tableData &&
              tableData?.map((row, i) => (
                <BalanceTableRow
                  key={i}
                  rowData={row}
                  headData={TABLE_HEAD_DATA["balance"]}
                />
              ))}
          </MainTable>

          <section className={actions}>
            <button
              onClick={() => {
                handlePreviousPage();
              }}
              disabled={currentPage <= 1}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.76906 11.8159C5.53939 11.577 5.54683 11.1972 5.7857 10.9675L8.9359 8L5.7857 5.0325C5.54683 4.80282 5.53939 4.423 5.76906 4.18413C5.99874 3.94527 6.37857 3.93782 6.61743 4.1675L10.2174 7.5675C10.3351 7.68062 10.4016 7.83679 10.4016 8C10.4016 8.16321 10.3351 8.31938 10.2174 8.4325L6.61743 11.8325C6.37857 12.0622 5.99874 12.0547 5.76906 11.8159Z"
                  fill="#626262"
                />
              </svg>
              <span>الرجوع</span>
            </button>
            {currentPage}
            <button
              onClick={() => {
                handleNextPage();
              }}
              disabled={currentPage + 1 > Math.ceil(allDataCount / 10)}
            >
              <span>التالي</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.2309 4.18414C10.4606 4.423 10.4532 4.80282 10.2143 5.0325L7.0641 8L10.2143 10.9675C10.4532 11.1972 10.4606 11.577 10.2309 11.8159C10.0013 12.0547 9.62143 12.0622 9.38257 11.8325L5.78257 8.4325C5.66492 8.31938 5.59844 8.16321 5.59844 8C5.59844 7.83679 5.66492 7.68062 5.78257 7.5675L9.38257 4.1675C9.62143 3.93782 10.0013 3.94527 10.2309 4.18414Z"
                  fill="#626262"
                />
              </svg>
            </button>
          </section>
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

export default PackageBalanceList;

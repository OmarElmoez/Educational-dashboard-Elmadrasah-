import { useCallback, useEffect, useRef, useState } from "react";
import { Link,  } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  decrementBalancePage,
   getBalanceData,
  incrementBalancePage,
 } from "@/store/table/TableSlice";

import { TABLE_HEAD_DATA } from "@/constants";
import MainTable from "@/components/table/MainTable";
import FilterForm, { FilterFormData } from "./FilterForm";
import BasicModal from "@/components/add-new-subject-model/BasicModal";
import BalanceTableRow from "@/components/table/BalanceTableRow";
import styles from "../studentsList.module.css";
import balancestyles from "./balance.module.css";
import { TModalRef } from "@/types/shared";
import FilterIcon from "@/assets/filter_icon.svg?react";
import FilterIconSmall from "@/assets/filter_icon_small.svg?react";
import SearchIcon from "@/assets/search.svg?react";
import Archive from "@/assets/archive.svg?react";
import Download from "@/assets/download.svg?react";
import List from "@/assets/list.svg?react";

// -----------------------------------------------------------------------------------------
const LIST_OPTIONS = [
  { id: 1, link: "", title: "أرشيف الأرصدة", icon: <Archive /> },
  { id: 2, link: "", title: "تنزيل الأرصدة", icon: <Download /> },
  { id: 3, link: "", title: "الأرصدة الفردية", icon: <List /> },
  { id: 4, link: "", title: "تحويل المستقلين", icon: <List /> },
];

// -----------------------------------------------------------------------------------------
const { actions } = styles;
const {
  balance_container,
  balance_left,
  balance_right,
  balance_right_header,
  header_filter,
  modal_header_container,
  modal_header_title,
  search_bar,
  filter_button,
  inputbox,
  icon,
  link_item,
  divider,
} = balancestyles;
// -----------------------------------------------------------------------------------------
const PackageBalanceList = () => {
  const dispatch = useAppDispatch();
  const { balance } = useAppSelector((state) => state.table);

  const filterFormRef = useRef<TModalRef>(null);

  const [searchTerm, setSearchTerm] = useState<FilterFormData | null>(null);

  const handleFilterSubmit = (filters: FilterFormData | null) => {
    setSearchTerm(filters);
  };

  const getNewtPage = useCallback(
    ({
      next,
      previous,
    }: {
      next?: string | null;
      previous?: string | null;
    }) => {

      let page = balance?.page;
      dispatch(
        getBalanceData({
          url: "/customer/balance/",
          page: page,
          searchTerm 
        })
      );
      if (next) {
        dispatch(incrementBalancePage());
      } else if (previous && balance.page > 0) {
        dispatch(decrementBalancePage());
      }
    },
    [dispatch, balance.page, searchTerm]
  );

  useEffect(() => {
    getNewtPage({});
  }, [getNewtPage]);

  return (
    <>
      <BasicModal
        ref={filterFormRef}
        header={
          <div className={modal_header_container}>
            <FilterIconSmall />
            <p className={modal_header_title}>التصفية </p>
          </div>
        }
      >
        <FilterForm onSubmit={handleFilterSubmit} />
      </BasicModal>
      <section className={balance_container}>
        <div className={balance_right}>
          <div className={balance_right_header}>
            <h3>أرصدة الاشتراكات ( {balance?.data?.length})</h3>

            <div className={header_filter}>
              <div className={search_bar}>
                <input type="text" placeholder="بحث" className={inputbox} />
                <div className={icon}>
                  <SearchIcon />
                </div>
              </div>

              <button
                className={filter_button}
                onClick={() => filterFormRef?.current?.open()}
              >
                <FilterIcon />
              </button>
            </div>
          </div>
          <hr className={divider} />

          <MainTable headData={TABLE_HEAD_DATA["balance"]} isCheckbox={false}>
            {balance.data &&
              balance.data.map((pack, i) => (
                <BalanceTableRow
                  key={i}
                  rowData={pack}
                  headData={TABLE_HEAD_DATA["balance"]}
                />
              ))}
          </MainTable>

          <section className={actions}>
            <button
              onClick={() => {
                getNewtPage({ previous: balance.previous });
              }}
              disabled={!balance.previous}
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
            {balance.page}
            <button
              onClick={() => {
                getNewtPage({ next: balance.next });
              }}
              disabled={!balance.next}
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
                 <p>  
                   {item.title}
                  </p>
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

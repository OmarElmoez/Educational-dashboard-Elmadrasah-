import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  decrementPage,
  getBalanceData,
  incrementPage,
} from "@/store/table/TableSlice";

import { TABLE_HEAD_DATA } from "@/constants";
import styles from "./studentsList.module.css";
import istyles from "./invoice/invoiceDetails.module.css";
import MainTable from "@/components/table/MainTable";
import MainTableRow from "@/components/table/MainTableRow";
import FilterForm from "./invoice/FilterForm";
import { TStatus } from "@/types/Dropdown";

// -----------------------------------------------------------------------------------------
// {
//   "customer_first_name": "Aya",
//   "customer_last_name": "Essam",
//   "service_name": "New test service",
//   "purchased": 2.5,
//   "scheduled": 0,
//   "unscheduled": 2.5,
//   "over_scheduled": 0.0,
//   "used": 0.0,
//   "unused": 2.5,
//   "over_used": 0.0
// },
// -----------------------------------------------------------------------------------------
const { actions } = styles;
const { filterFormEnd } = istyles;
// -----------------------------------------------------------------------------------------
const PackageBalanceList = () => {
  const dispatch = useAppDispatch();
  const { balance } = useAppSelector((state) => state.table);
  const navigate = useNavigate();


  const [searchTerm, setSearchTerm] = useState<{
    startDate: string;
    endDate: string;
    status: TStatus;
  } | null>(null);

  const handleFilterSubmit = (filters: {
    startDate: string;
    endDate: string;
    status: TStatus;
  }| null) => {
    setSearchTerm(filters);

    console.log("fil", filters);
    
  };
  
  const getNewtPage = useCallback(
    ({
      next,
      previous,
    }: {
      next?: string | null;
      previous?: string | null;
    }) => {
      console.log("fil2222", searchTerm);
      let page = balance?.page;
      dispatch(getBalanceData({
        url: '/customer/balance/',
        page: page,
       
      }));
      if (next) {
        dispatch(incrementPage());
      } else if (previous && balance.page > 0) {
        dispatch(decrementPage());
      }
    },
    [dispatch,  balance.page, searchTerm]
  );

  useEffect(() => {
    getNewtPage({});
  }, [getNewtPage]);



  const handlView = (id: number) => {
    navigate(`/admin/invoice-details/${id}`);
  };

  const handlEdit = (id: number) => {
    navigate(`/admin/edit-invoice/${id}`);
  };

  return (
    <section>
      <div className={filterFormEnd}>
        <FilterForm onSubmit={handleFilterSubmit} />
      </div>
      <MainTable
        headData={TABLE_HEAD_DATA["balance"]}
        isCheckbox={false}
      >
        {balance.data &&
          balance.data.map((pack) => (
            <MainTableRow
              key={pack.customer_first_name}
              rowData={pack}
              headData={TABLE_HEAD_DATA["balance"]}
              onViewRow={() => handlView(1)}
              onEditRow={() => handlEdit(1)}
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
    </section>
  );
};

export default PackageBalanceList;

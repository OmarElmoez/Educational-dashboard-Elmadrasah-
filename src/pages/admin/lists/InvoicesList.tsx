import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetInvoices, decrementPage, incrementPage } from "@/store/table/TableSlice";
import { TStatus } from "@/types/Dropdown";
import { MuiTable } from "@/components";
import { GridColDef } from "@mui/x-data-grid";
import formatFullArabicDate from "@/utils/formatFullArabicDate.ts";
import EditPenIcon from "@/assets/edit_pen.svg?react";
import SearchIcon from "@/assets/search_icon.svg?react";
import FilterForm from "@/pages/admin/lists/invoice/FilterForm.tsx";
import { useComponentLoading } from "@/hooks";

export type TFilterData = {
  startDate: string;
  endDate: string;
  status: TStatus;
}
// -----------------------------------------------------------------------------------------
const InvoicesList = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state) => state.auth);
  const {invoices} = useAppSelector((state) => state.table);
  const navigate = useNavigate();
  const {setPending, setSucceeded, isPending} = useComponentLoading();

  const [searchTerm, setSearchTerm] = useState<TFilterData | null>(null);

  const getNewtPage = useCallback(
    () => {
      let page = invoices?.page;
      setPending()
      dispatch(actGetInvoices({token: user?.token, page, searchTerm})).unwrap().then(() => setSucceeded());
    },
    [invoices.page, setPending, dispatch, user?.token, searchTerm, setSucceeded]
  );

  useEffect(() => {
    getNewtPage();
  }, [getNewtPage]);


  const initialColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      filterable: false,
    },
    {
      field: "customer_name",
      headerName: "عميل",
      renderCell: (params) => params.value || "لا يوجد",
      flex: 1.5,
    },
    {
      field: "formatted_number",
      headerName: "الرقم",
      flex: 0.75,
    },
    {
      field: "date",
      headerName: "تاريخ",
      flex: 1,
    },
    {
      field: "due_date",
      headerName: "تاريخ الاستحقاق",
      flex: 1,
    },
    {
      field: "sent_at",
      headerName: "اخر ارسال",
      flex: 2,
      renderCell: (params) => formatFullArabicDate(params.value)
    },
    {
      field: "status",
      headerName: "الحالة",
      flex: 0.75,
    },
    {
      field: "total",
      headerName: "المجموع",
      flex: 0.75,
    },
    {
      field: "amount_due",
      headerName: "توازن",
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "أكشن",
      flex: 1,
      filterable: false,
      renderCell: (params) => (
        <div className="w-full flex items-center justify-center gap-[3rem]">
          <button
            style={{cursor: params.row.id ? "pointer" : "not-allowed"}}
            disabled={!params.row.id}
            onClick={() => navigate(`/admin/invoices/invoice-details/${params.row.id}`)}
          >
            <SearchIcon/>
          </button>
          <button
            style={{cursor: params.row.id ? "pointer" : "not-allowed"}}
            disabled={!params.row.id}
            onClick={() => navigate(`/admin/edit-invoice/${params.row.id}`)}
          >
            <EditPenIcon/>
          </button>
        </div>
      ),
      cellClassName: "edit-cell",
    },
  ];


  return (
    <MuiTable
      rows={invoices.data}
      columns={initialColumns}
      loading={isPending}
      filterForm={<FilterForm submitFn={(filters) => setSearchTerm(filters)}/>}
      nextFn={() => dispatch(incrementPage())}
      previousFn={() => dispatch(decrementPage())}
      next={invoices?.next}
      previous={invoices?.previous}
    />
  );
};

export default InvoicesList;

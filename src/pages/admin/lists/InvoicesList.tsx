import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TStatus } from "@/types/Dropdown";
import { MuiTable } from "@/components";
import { GridColDef } from "@mui/x-data-grid";
import formatFullArabicDate from "@/utils/formatFullArabicDate.ts";
import EditPenIcon from "@/assets/edit_pen.svg?react";
import SearchIcon from "@/assets/search_icon.svg?react";
import FilterForm from "@/pages/admin/lists/invoice/FilterForm.tsx";
import useTanStackQuery from "../../../hooks/useTanStackQuery.ts";
import { getInvoices } from "@/services/invoices.ts";
import { Error } from "@/pages/shared";
export type TFilterData = {
  date: string;
  due_date: string;
  status: TStatus;
};
// -----------------------------------------------------------------------------------------
const InvoicesList = () => {

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<TFilterData | null>(null);

  const {data: invoices, isPending, increasePage, decreasePage, setPage} = useTanStackQuery(
    {queryKeyPrefix: "invoices", fetchFn: getInvoices, filters: searchTerm});

  const onSearchHandler = (data: TFilterData) => {
    setSearchTerm(data);
    setPage(1)
  };

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
      renderCell: (params) => formatFullArabicDate(params.value),
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
            style={{ cursor: params.row.id ? "pointer" : "not-allowed" }}
            disabled={!params.row.id}
            onClick={() =>
              navigate(`/admin/invoices/invoice-details/${params.row.id}`)
            }
          >
            <SearchIcon />
          </button>
          <button
            style={{cursor: params.row.id ? "pointer" : "not-allowed", visibility: params.row.status !== "Paid" ? "visible" : 'hidden'}}
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
    <>
    {!isPending && invoices?.status === 403 ? (
      <Error type="noAccess" />
    ) : (<> <MuiTable
      rows={invoices?.results}
      rowCount={invoices?.count}
      columns={initialColumns}
      loading={isPending}
      filterForm={<FilterForm submitFn={onSearchHandler} />}
      nextFn={() => increasePage()}
      previousFn={() => decreasePage()}
      next={invoices?.next || ""}
      previous={invoices?.previous || ""}
      /></>)}
   
      </>
  );
};

export default InvoicesList;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TStatus } from "@/types/Dropdown";
import { MuiTable } from "@/components";
import { GridColDef } from "@mui/x-data-grid";
import formatFullArabicDate from "@/utils/formatFullArabicDate.ts";
import EditPenIcon from "@/assets/edit_pen.svg?react";
import SearchIcon from "@/assets/search_icon.svg?react";
import FilterForm from "@/pages/admin/lists/invoice/FilterForm.tsx";
import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "@/services/invoices";
import { queryClient } from "@/main";

export type TFilterData = {
  startDate: string;
  endDate: string;
  status: TStatus;
};
// -----------------------------------------------------------------------------------------
const InvoicesList = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<TFilterData | null>(null);

  const [page, setPage] = useState(1);

  const { data: invoices, isPending } = useQuery({
    queryKey: ["invoices", { page, searchTerm }],
    queryFn: () => getInvoices({ page, searchTerm }),
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (invoices?.next) {
      const nextPageNumber = page + 1;
      const nextPageQueryKey = [
        "invoices",
        { page: nextPageNumber, searchTerm },
      ];

      if (!queryClient.getQueryData(nextPageQueryKey)) {
        queryClient.prefetchQuery({
          queryKey: nextPageQueryKey,
          queryFn: () => getInvoices({ page: nextPageNumber, searchTerm }),
        });
      }
    }
  }, [invoices, page, searchTerm]);

  const increasePage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const decreasePage = () => {
    setPage((prevPage) => prevPage - 1);
  };

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
            style={{ cursor: params.row.id ? "pointer" : "not-allowed" }}
            disabled={!params.row.id}
            onClick={() => navigate(`/admin/edit-invoice/${params.row.id}`)}
          >
            <EditPenIcon />
          </button>
        </div>
      ),
      cellClassName: "edit-cell",
    },
  ];

  return (
    <MuiTable
      rows={invoices?.results}
      columns={initialColumns}
      loading={isPending}
      filterForm={<FilterForm submitFn={onSearchHandler} />}
      nextFn={() => increasePage()}
      previousFn={() => decreasePage()}
      next={invoices?.next || ""}
      previous={invoices?.previous || ""}
    />
  );
};

export default InvoicesList;

import { useEffect, useState } from "react";
import {
  GridColDef,
} from "@mui/x-data-grid";
import EditPenIcon from "@/assets/edit_pen.svg?react";
import { useNavigate } from "react-router-dom";
import { MuiTable } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { getFamilies } from "@/services/families.ts";
import { queryClient } from "@/main.tsx";

const FamiliesList = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const increasePage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const decreasePage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const { data: families, isPending } = useQuery({
    queryKey: ["families", { page }],
    queryFn: () => getFamilies({ page }),
    staleTime: 0.5 * 60 * 1000
  });

  useEffect(() => {
    if (families?.next) {
      const nextPageNumber = page + 1;
      const nextPageQueryKey = [
        "families",
        { page: nextPageNumber },
      ];

      if (!queryClient.getQueryData(nextPageQueryKey)) {
        queryClient.prefetchQuery({
          queryKey: nextPageQueryKey,
          queryFn: () => getFamilies({ page: nextPageNumber }),
        });
      }
    }
  }, [families, page]);

  const initialColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      filterable: false,
    },
    {
      field: "first_name",
      headerName: "الاسم الأول",
      flex: 1,
      renderCell: (params) => (
        <button
          style={{ cursor: params.row.id ? "pointer" : "not-allowed" }}
          disabled={!params.row.id}
          onClick={() =>
            navigate(`/admin/students/families-list/${params.row.id}`)
          }
        >
          {params.value}
        </button>
      ),
    },
    {
      field: "last_name",
      headerName: "الاسم الأخير",
      flex: 1,
    },
    {
      field: "country",
      headerName: "الدولة",
      flex: 1,
    },
    {
      field: "email",
      headerName: "البريد الإلكتروني",
      flex: 1.5,
      renderCell: (params) => {
        if (!params.value) return "لا يوجد";
        return params.value;
      },
    },
    {
      field: "mobile_phone",
      flex: 1,
      headerName: "الهاتف المحمول",
      renderCell: (params) => {
        return params.value || "لا يوجد";
      },
      cellClassName: "phone-cell",
    },
    {
      field: "home_phone",
      flex: 1,
      headerName: "هاتف المنزل",
      renderCell: (params) => {
        return params.value || "لا يوجد";
      },
      cellClassName: "phone-cell",
    },
    {
      field: "action",
      headerName: "أكشن",
      flex: 0.5,
      filterable: false,
      renderCell: (params) => (
        <button
          style={{ cursor: params.row.id ? "pointer" : "not-allowed" }}
          disabled={!params.row.id}
          onClick={() =>
            navigate(`/admin/students/families-list/${params.row.id}/edit`)
          }
        >
          <EditPenIcon />
        </button>
      ),
      cellClassName: "edit-cell",
    },
  ];

  return (
    <MuiTable
      rows={families?.results}
      columns={initialColumns}
      loading={isPending}
      nextFn={() => increasePage()}
      previousFn={() => decreasePage()}
      next={families?.next || ""}
      previous={families?.previous || ""}
    />
  );
};

export default FamiliesList;

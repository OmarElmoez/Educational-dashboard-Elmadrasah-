import { useEffect, useState } from "react";
import {
  GridColDef,
} from "@mui/x-data-grid";
import EditPenIcon from "@/assets/edit_pen.svg?react";
import { useNavigate } from "react-router-dom";
import "./newStudentsList.css";
import { MuiTable } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { getStudents } from "@/services/students";
import { queryClient } from "@/main";

const NewStudentsList = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const increasePage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const decreasePage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const { data: students, isPending } = useQuery({
    queryKey: ["students", { page }],
    queryFn: () => getStudents({ page }),
    staleTime: 0.5 * 60 * 1000
  });

  useEffect(() => {
    if (students?.next) {
      const nextPageNumber = page + 1;
      const nextPageQueryKey = [
        "students",
        { page: nextPageNumber },
      ];

      if (!queryClient.getQueryData(nextPageQueryKey)) {
        queryClient.prefetchQuery({
          queryKey: nextPageQueryKey,
          queryFn: () => getStudents({ page: nextPageNumber }),
        });
      }
    }
  }, [students, page]);

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
          onClick={() => navigate(`/admin/students/profile/${params.row.id}`)}
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
      renderCell: (params) => (params.value ? params.value : "لا يوجد"),
    },
    {
      field: "mobile_phone",
      flex: 1,
      headerName: "الهاتف المحمول",
      renderCell: (params) => params.value || "لا يوجد",
      cellClassName: "phone-cell",
    },
    {
      field: "home_phone",
      flex: 1,
      headerName: "هاتف المنزل",
      renderCell: (params) => params.value || "لا يوجد",
      cellClassName: "phone-cell",
    },
    {
      field: "student_type",
      flex: 1,
      headerName: "النوع",
      renderCell: (params) => params.value || "لا يوجد",
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
            navigate(`/admin/students/profile/${params.row.id}/edit`)
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
      rows={students?.results}
      columns={initialColumns}
      loading={isPending}
      nextFn={() => increasePage()}
      previousFn={() => decreasePage()}
      next={students?.next as string}
      previous={students?.previous as string}
    />
  );
};

export default NewStudentsList;

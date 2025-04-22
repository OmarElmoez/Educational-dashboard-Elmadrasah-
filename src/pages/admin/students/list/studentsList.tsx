import {
  GridColDef,
} from "@mui/x-data-grid";
import EditPenIcon from "@/assets/edit_pen.svg?react";
import { useNavigate } from "react-router-dom";
import "./studentsList.css";
import { MuiTable } from "@/components";
import { getStudents } from "@/services/students";
import useTanStackQuery from "@/hooks/useTanStackQuery.ts";

const NewStudentsList = () => {

  const navigate = useNavigate();

  const {data: students, isPending, increasePage, decreasePage} = useTanStackQuery(
    {queryKeyPrefix: 'students', fetchFn: getStudents});

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
      rowCount={students?.count}
      columns={initialColumns}
      loading={isPending}
      nextFn={() => increasePage()}
      previousFn={() => decreasePage()}
      next={students?.next || ""}
      previous={students?.previous || ""}
    />
  );
};

export default NewStudentsList;

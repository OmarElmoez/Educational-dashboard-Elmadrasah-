import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { MuiTable } from "@/components";
import { getTeachersReports } from "@/services/teachersReports";
import useTanStackQuery from "@/hooks/useTanStackQuery.ts";
import { Error } from "@/pages/shared";
import formatFullArabicDate from './../../../utils/formatFullArabicDate';
const TeachersDailyReport = () => {
  const navigate = useNavigate();

  const {
    data: teachersReportData,
    isPending,
    increasePage,
    decreasePage,
  } = useTanStackQuery({
    queryKeyPrefix: "teachersReportData",
    fetchFn: getTeachersReports,
  });
  const initialColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.4,
      filterable: false,
    },
    {
      field: "employee_name",
      headerName: "اسم المُعلم",
      flex: 1,
      renderCell: (params) => (
        <button
          style={{ cursor: params.row.id ? "pointer" : "not-allowed", }}
          disabled={!params.row.id}
          onClick={() =>
            navigate(`/admin/reports/daily/${params.row.id}`)
          }
        >
          {params.value}
        </button>
      ),
    },
    {
      field: "monthly_lesson_count",
      headerName: "عدد الحصص الشهرية",
      flex: 1,
    },
    {
      field: "lesson_count_today",
      headerName: "عدد الحصص اليوم",
      flex: 1,
    },
    {
      field: "attended_lesson_count",
      headerName: "عدد الحصص التي حضرها",
      flex: 1,
    },
    {
      field: "last_activity",
      headerName: "تاريخ أخر نشاط",
      flex: 1.5,
      renderCell: (params) => (params.value ? formatFullArabicDate(params.value) : "لا يوجد"),
    },
    {
      field: "last_login",
      headerName: "تاريخ أخر دخول",
      flex: 1.5,
      renderCell: (params) => (params.value ? formatFullArabicDate(params.value) : "لا يوجد"),
    },
  ];
  return (
    <>
      {teachersReportData?.status === 403 ? (
        <Error type="noAccess" />
      ) : (
        <>
        <div>
           إجمالي عدد الحصص اليومية : {" "}
          {teachersReportData?.total_lessons_today || 0 }
        </div>
        <MuiTable
          rows={teachersReportData?.results}
          rowCount={teachersReportData?.count}
          columns={initialColumns}
          loading={isPending}
          nextFn={() => increasePage()}
          previousFn={() => decreasePage()}
          next={teachersReportData?.next || ""}
          previous={teachersReportData?.previous || ""}
          />
          </>
      )}
    </>
  );
};

export default TeachersDailyReport;

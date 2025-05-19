import { getSpecificTeacherReport } from "@/services/teachersReports.ts";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MuiTable } from "@/components";
import { GridColDef } from "@mui/x-data-grid";
import convert24HourToArabic from "@/utils/convert24HourToArabic.ts";

const SpecificTeacherReport = () => {

  const {id} = useParams()

  const {data: specificReportData, isPending} = useQuery({
    queryKey: ["specificTeacherReport", id],
    queryFn: () => getSpecificTeacherReport({id}),
  })

  const initialColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      filterable: false,
    },
    {
      field: "name",
      headerName: "الحصة",
      flex: 1.5,
    },
    {
      field: "status",
      headerName: "الحالة",
      flex: 1,
    },
    {
      field: "from_time",
      headerName: "الوقت",
      flex: 1,
      renderCell: (params) => (params.value ? convert24HourToArabic(params.value) : "لا يوجد"),
    },
    {
      field: "time_zone",
      headerName: "المنطقة الزمنية",
      flex: 1,
    },
  ];

  return (
    <MuiTable
      rows={specificReportData?.results}
      columns={initialColumns}
      loading={isPending}
    />
  )
}

export default SpecificTeacherReport;
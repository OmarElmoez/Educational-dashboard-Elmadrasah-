// HourlyTable.tsx
import {
  GridColDef,
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { StatusBullet } from "@/components/UI";
import styles from "../../../pages/admin/tables/hourlyTables/HourlyTable.module.css";
import "./overrideHourlyTable.css"

const { status_wrapper } = styles;

interface HourlyTableProps {
  hourlyLessons: any[];
}

const columns: GridColDef[] = [
  {
    field: "from_date",
    headerName: "التاريخ",
    width: 180,
    headerAlign: "center",
  },
  {
    field: "start_time_employee",
    headerName: "وقت الدخول المدرس",
    width: 180,
    headerAlign: "center",
    renderCell: (params) => {
      let employeeTime = params.value;
      if (employeeTime === null) {
        employeeTime = "لا يوجد";
      }
      return <div>{employeeTime}</div>;
    },
  },
  {
    field: "start_time_student",
    headerName: "وقت الدخول الطالب",
    width: 180,
    headerAlign: "center",
    renderCell: (params) => {
      let studentTime = params.value;
      if (studentTime === null) {
        studentTime = "لا يوجد";
      }
      return <div>{studentTime}</div>;
    },
  },
  {
    field: "student_name",
    headerName: "اسم الطالب",
    width: 280,
    headerAlign: "center",
  },
  {
    field: "employee_name",
    headerName: "اسم المدرس",
    width: 280,
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "الحالة",
    width: 180,
    headerAlign: "center",
    renderCell: (params) => {
      const status = params.value;
      let color = "black";
      if (status === "Attended") {
        color = "#0650A7";
      } else if (status === "Scheduled") {
        color = "#1C8A44";
      } else if (status === "Progressing") {
        color = "#828684";
      } else if (status === "Missed") {
        color = "#F64E60";
      } else if (status === "Cancelled") {
        color = "#F64E60";
      }
      return <div style={{ color }}>{status}</div>;
    },
  },
];

const paginationModel = { page: 0, pageSize: 10 };

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarExport />
    <GridToolbarFilterButton />
    <GridToolbarColumnsButton />
  </GridToolbarContainer>
);

const localeToolbarText = {
  toolbarColumns: "",
  toolbarFilters: "",
  toolbarExport: "",
};

const HourlyTableAdmin = ({ hourlyLessons }: HourlyTableProps) => {
  return (
    <>
      <section>
        <div className={status_wrapper}>
          <StatusBullet
            color="#0650A7"
            label="30 طالب حضر"
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="var(--main-color)"
            label="30 طالب مجدول"
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="#F64E60"
            label="30 طالب غائب"
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="#F64E60"
            label="30 مدرس غائب"
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="#E90A0A"
            label="30 مدرس ألغى"
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="#E4B341E4"
            label="10 طالب تأخر"
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="#BB83DB"
            label="10 مدرس تأخر"
            size={8}
            fontSize={14}
          />
        </div>
      </section>
      <Paper sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={hourlyLessons}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 50]}
          checkboxSelection
          sx={{ border: 0 }}
          localeText={localeToolbarText}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </Paper>
    </>
  );
};

export default HourlyTableAdmin;

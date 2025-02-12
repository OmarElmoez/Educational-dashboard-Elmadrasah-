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
import convertAppTime from "@/utils/convertAppTime.ts";
import { Typography, Box } from '@mui/material';
import { THourLesson } from "@/components/tabs/sub-components/all-hours/AllHours";
import "./overrideHourlyTable.css";

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
      let formattedEmployeeTime;
      if (employeeTime === null) {
        employeeTime = "لا يوجد";
        return <div>{employeeTime}</div>;
      } else {
        formattedEmployeeTime = convertAppTime(employeeTime);
        return <div>{formattedEmployeeTime}</div>;
      }
    },
  },
  {
    field: "start_time_student",
    headerName: "وقت الدخول الطالب",
    width: 180,
    headerAlign: "center",
    renderCell: (params) => {
      let studentTime = params.value;
      let formattedStudentTime;
      if (studentTime === null) {
        studentTime = "لا يوجد";
        return <div>{studentTime}</div>;
      } else {
        formattedStudentTime = convertAppTime(studentTime);
        return <div>{formattedStudentTime}</div>;
      }
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

const HourlyTableAdmin = ({ hourlyLessons, loading}:{hourlyLessons : THourLesson[], loading: boolean}) => {
const CustomNoRowsOverlay = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Typography variant="h6" color="textSecondary">
        لا توجد حصص متاحة فى هذا التوقيت
      </Typography>
    </Box>
  );
};
const CustomNoResultsOverlay = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Typography variant="h6" color="textSecondary">
        لا توجد نتائج متاحة لهذا التصنيف
      </Typography>
    </Box>
  );
};
  return (
    <>
      <Paper sx={{ height: "auto", width: "100%" }}>
        <DataGrid
        // className="custom-data-grid"
          rows={hourlyLessons}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 50]}
          checkboxSelection
          sx={{
            border: 0,
            paddingTop: "1rem",
            "& .MuiDataGrid-toolbarContainer": {
              "justify-content": "flex-end"
            },
            // "& .MuiPickersArrowSwitcher-root": {
            //   "direction": "ltr"
            // }
        }}
          localeText={localeToolbarText}
          slots={{
            toolbar: CustomToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
            noResultsOverlay: CustomNoResultsOverlay,
          }}
          loading= {loading}
          slotProps={{
            loadingOverlay: {
              variant: 'skeleton',
              noRowsVariant: 'skeleton',
            },
          }}
        />
      </Paper>
    </>
  );
};

export default HourlyTableAdmin;

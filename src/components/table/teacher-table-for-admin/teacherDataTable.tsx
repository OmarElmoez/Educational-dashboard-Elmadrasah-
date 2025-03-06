import { useState } from "react";
import {
  GridColDef,
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridPaginationModel,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Typography, Box } from "@mui/material";
import { TEmployeesData } from "@/types/table";
import "./teacherDataTable.css";
import avatar from "@/assets/avatar.png";
import EditPenIcon from "@/assets/edit_pen.svg?react";
import { useNavigate } from "react-router-dom";
type Subject = {
  id: number;
  name_ar: string;
  name_en: string;
};

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarExport
      csvOptions={{
        fileName: "El Madrasah Dashboard",
        utf8WithBom: true,
      }}
    />
    <GridToolbarFilterButton />
    <GridToolbarColumnsButton />
  </GridToolbarContainer>
);

const localeToolbarText = {
  toolbarColumns: "",
  toolbarFilters: "",
  toolbarExport: "",
};
const TeacherDataTable = ({
  employeesData,
  loading,
  next,
  previous,
  rowCount,
  dispatchGetAllEmployees,
}: {
  employeesData: TEmployeesData[];
  loading: boolean;
  next: string | null | undefined;
  previous: string | null | undefined;
  rowCount: number;
  dispatchGetAllEmployees: ({
    next,
    previous,
  }: {
    next?: string | null;
    previous?: string | null;
  }) => void;
}) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 20,
  });
  const navigate = useNavigate();
  const editEmployee = (id:number) => {
    navigate(`/admin/employees/employee-profile/${id}`);
  };
  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "صورة شخصية",
      width: 100,
      headerAlign: "center",
      renderCell: (params) => {
        if (params.value) {
          return (
            <div className="image-container">
              <img
                className="cell-profile-image"
                src={params.value}
                alt="صورة شخصية"
              />
            </div>
          );
        } else {
          return (
            <div className="image-container">
              <img
                className="cell-profile-icon"
                src={avatar}
                alt="صورة شخصية"
              />
            </div>
          );
        }
      },
    },
    {
      field: "full_name",
      headerName: "الاسم الكامل",
      width: 150,
      headerAlign: "center",
      renderCell: (params) => {
        return `${params.row.first_name} ${params.row.last_name}`;
      },
    },
    {
      field: "phone",
      headerName: "الهاتف",
      width: 150,
      headerAlign: "center",
      cellClassName: "cell-phone",
      renderCell: (params) => {
        if (params.formattedValue) {
          return params.formattedValue;
        } else {
          return "لا يوجد";
        }
      },
    },
    {
      field: "email",
      headerName: "البريد الإلكترونى",
      width: 200,
      headerAlign: "center",
      editable: true,
      renderCell: (params) => {
        if (params.formattedValue) {
          return params.formattedValue;
        } else {
          return "لا يوجد";
        }
      },
    },
    {
      field: "city",
      headerName: "المدينة",
      width: 100,
      headerAlign: "center",
      renderCell: (params) => {
        if (params.formattedValue) {
          return params.formattedValue;
        } else {
          return "لا يوجد";
        }
      },
    },
    {
      field: "employee_type",
      headerName: "النوع",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "subject_choices_response",
      headerName: "المواد",
      width: 280,
      headerAlign: "center",
      renderCell: (params) => {
        if (params.formattedValue.length > 0) {
          return params.formattedValue.map((subject: Subject) => {
            return `${subject.name_ar},`;
          });
        } else {
          return "لا توجد مواد مختارة حتى الآن";
        }
      },
    },
    {
      field: "id",
      headerName: "تعديل بيانات",
      width: 100,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <button
            onClick={(event) => {
              event.stopPropagation();
              editEmployee(params.formattedValue);
            }}
          >
            <p style={{color:"#1c8a44"}}>View Profile</p>
            <EditPenIcon />
          </button>
        );
      },
    },
  ];
  const CustomNoRowsOverlay = () => {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="h6" color="textSecondary">
          لا توجد بيانات موظفين متاحة
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
  const handlePaginationModelChange = (
    newPaginationModel: GridPaginationModel
  ) => {
    const { page } = newPaginationModel;
    if (page > paginationModel.page && next) {
      dispatchGetAllEmployees({ next });
    } else if (page < paginationModel.page && previous) {
      dispatchGetAllEmployees({ previous });
    }
    setPaginationModel(newPaginationModel);
  };
  return (
    <>
      <Paper sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={employeesData}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          pageSizeOptions={[10]}
          checkboxSelection
          rowCount={rowCount}
          paginationMode="server"
          sx={{
            border: 0,
            paddingTop: "1rem",
          }}
          localeText={localeToolbarText}
          slots={{
            toolbar: CustomToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
            noResultsOverlay: CustomNoResultsOverlay,
          }}
          loading={loading}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
        />
      </Paper>
    </>
  );
};

export default TeacherDataTable;

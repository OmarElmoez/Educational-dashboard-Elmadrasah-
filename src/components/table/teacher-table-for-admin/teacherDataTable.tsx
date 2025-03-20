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
import Button from "@mui/material/Button";
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

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "صورة شخصية",
      flex: 0.65,
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
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => (
        <button
          style={{ cursor: params.row.id ? "pointer" : "not-allowed" }}
          disabled={!params.row.id}
          onClick={() =>
            navigate(`/admin/employees/employee-profile/${params.row.id}`)
          }
        >
          {params.row.first_name} {params.row.last_name}
        </button>
      ),
    },
    {
      field: "phone",
      headerName: "الهاتف",
      flex: 0.75,
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
      flex: 1.5,
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
      flex: 0.75,
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
      flex: 0.75,
      headerAlign: "center",
    },
    {
      field: "subject_choices_response",
      headerName: "المواد",
      flex: 1.25,
      headerAlign: "center",
      renderCell: (params) => {
        if (params.formattedValue.length > 0) {
          return params.formattedValue.map((subject: Subject) => {
            return `${subject.name_ar},`;
          });
        } else {
          return "لا توجد مواد مختارة";
        }
      },
    },
    {
      field: "id",
      headerName: "تعديل",
      flex: 0.5,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <button
            onClick={() =>
              navigate(`/admin/employees/edit-employee/${params.row.id}`)
            }
          >
            <EditPenIcon />
          </button>
        );
      },
      cellClassName: "edit-cell",
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
  // const handlePaginationModelChange = (
  //   newPaginationModel: GridPaginationModel
  // ) => {
  //   const { page } = newPaginationModel;
  //   if (page > paginationModel.page && next) {
  //     dispatchGetAllEmployees({ next });
  //   } else if (page < paginationModel.page && previous) {
  //     dispatchGetAllEmployees({ previous });
  //   }
  //   setPaginationModel(newPaginationModel);
  // };
  const handleNext = () => {
    if (next) {
      dispatchGetAllEmployees({ next });
    }
  };

  const handlePrevious = () => {
    if (previous) {
      dispatchGetAllEmployees({ previous });
    }
  };
  return (
    <>
      <Paper sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={employeesData}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection
          disableRowSelectionOnClick
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
      <Box
        sx={{ display: "flex", justifyContent: "center", gap: 2, padding: 2 }}
      >
        <Button
          variant="contained"
          onClick={handlePrevious}
          disabled={!previous}
        >
          المجموعة السابقة
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={!next}>
          المجموعة التالية
        </Button>
      </Box>
    </>
  );
};

export default TeacherDataTable;

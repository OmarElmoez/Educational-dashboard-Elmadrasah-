import { useCallback, useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import { actGetStudents } from "@/store/table/TableSlice.ts";
import EditPenIcon from "@/assets/edit_pen.svg?react";
import { useNavigate } from "react-router-dom";
import "./newStudentsList.css";
import Paper from '@mui/material/Paper';
import ReloadIcon from '@/assets/reload.svg?react';



const NewStudentsList = () => {
  const {students} = useAppSelector((state) => state.table);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleGetStudentData = useCallback(() => {
    setLoading(true);
    dispatch(actGetStudents({}))
    .unwrap()
    .then((res) => {
      setLoading(false);
      setNext(res.next);
      setPrevious(res.previous);
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error fetching students:", error);
    });
  }, [dispatch]);


  useEffect(() => {
    setLoading(true);
    dispatch(actGetStudents({}))
    .unwrap()
    .then((res) => {
      setLoading(false);
      setNext(res.next);
      setPrevious(res.previous);
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error fetching students:", error);
    });
  }, [dispatch]);


  const handleNext = () => {
    if (next) {
      setLoading(true);
      dispatch(actGetStudents({next}))
      .unwrap()
      .then((res) => {
        setLoading(false);
        setNext(res.next);
        setPrevious(res.previous);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching next page:", error);
      });
    }
  };

  const handlePrevious = () => {
    if (previous) {
      setLoading(true);
      dispatch(actGetStudents({previous}))
      .unwrap()
      .then((res) => {
        setLoading(false);
        setNext(res.next);
        setPrevious(res.previous);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching previous page:", error);
      });
    }
  };

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
          style={{cursor: params.row.id ? "pointer" : "not-allowed"}}
          disabled={!params.row.id}
          onClick={() => navigate(`/admin/students/profile/${params.row.id}`)}
        >
          {params.value}
        </button>
      )
    },
    {
      field: "last_name",
      headerName: "الاسم الأخير",
      flex: 1,
    },
    // {
    //   field: "country",
    //   headerName: "الدولة",
    //   flex: 1,
    // },
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
          style={{cursor: params.row.id ? "pointer" : "not-allowed"}}
          disabled={!params.row.id}
          onClick={() => navigate(`/admin/students/profile/${params.row.id}/edit`)}
        >
          <EditPenIcon/>
        </button>
      ),
      cellClassName: "edit-cell",
    },
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarExport
        csvOptions={{
          fileName: "El Madrasah Dashboard",
          utf8WithBom: true,
        }}
      />
      <GridToolbarFilterButton/>
      <GridToolbarColumnsButton/>
    </GridToolbarContainer>
  );

  const arabicLocaleText = {
    // Sorting options
    columnMenuSortAsc: 'ترتيب تصاعدي',
    columnMenuSortDesc: 'ترتيب تنازلي',

    // Filter option
    columnMenuFilter: 'تصفية',

    // Column visibility
    columnMenuHideColumn: 'إخفاء العمود',
    columnMenuManageColumns: 'إدارة الأعمدة',

    // Additional context-specific translations
    columnMenuLabel: 'قائمة العمود',
    columnMenuShowColumns: 'إظهار الأعمدة',
    columnMenuUnsort: 'إلغاء الترتيب',

    // Email example from the image
    noRowsLabel: 'لا توجد بيانات',

    toolbarColumns: "",
    toolbarFilters: "",
    toolbarExport: "",
  };


  return (
    <Box component="section">
        <button className="reload-button" onClick={handleGetStudentData}>
        <ReloadIcon />
        <span> إعادة تحميل البيانات</span>
      </button>
      <Paper sx={{height: "auto", width: "100%"}}>
        <DataGrid
          sx={{
            border: 0,
            paddingTop: "1rem",
          }}
          localeText={arabicLocaleText}
          rows={students.data}
          pageSizeOptions={[10, 20, 50]}
          columns={initialColumns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          checkboxSelection
          disableRowSelectionOnClick
          // localeText={localeToolbarText}
          slots={{toolbar: CustomToolbar}}
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
        sx={{display: "flex", justifyContent: "center", gap: 2, padding: 2}}
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
    </Box>
  );
};

export default NewStudentsList;

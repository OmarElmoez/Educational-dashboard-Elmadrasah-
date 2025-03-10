import { useEffect, useState } from "react";
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

import "./newStudentsList.css";
import { useNavigate } from "react-router-dom";

const NewStudentsList = () => {
  const { students } = useAppSelector((state) => state.table);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 20,  
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

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
      dispatch(actGetStudents({ next }))
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
      dispatch(actGetStudents({ previous }))
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

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "first_name",
      headerName: "الاسم الأول",
      width: 140,
    },
    {
      field: "last_name",
      headerName: "الاسم الأخير",
      width: 140,
    },
    {
      field: "email",
      headerName: "البريد الإلكتروني",
      width: 260,
      renderCell: (params) => {
        if (!params.value) return "لا يوجد";
        return params.value;
      },
    },
    {
      field: "mobile_phone",
      width: 160,
      headerName: "الهاتف المحمول",
      renderCell: (params) => {
        return params.value || "لا يوجد";
      },
      cellClassName: "phone-cell",
    },
    {
      field: "home_phone",
      width: 150,
      headerName: "هاتف المنزل",
      renderCell: (params) => {
        return params.value || "لا يوجد";
      },
      cellClassName: "phone-cell",
    },
    {
      field: "student_type",
      width: 100,
      headerName: "النوع",
      renderCell: (params) => {
        return params.value || "لا يوجد";
      },
    },
    {
      field: "action",
      headerName: "أكشن",
      width: 90,
      renderCell: (params) => (
        <button
          style={{ cursor: params.row.id ? "pointer" : "not-allowed" }}
          disabled={!params.row.id}
          onClick={() => navigate(`/admin/students/profile/${params.row.id}`)}
        >
          <EditPenIcon />
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
      <GridToolbarFilterButton />
      <GridToolbarColumnsButton />
    </GridToolbarContainer>
  );

  const localeToolbarText = {
    toolbarColumns: "",
    toolbarFilters: "",
    toolbarExport: "",
  };

  return (
    <Box component="section">
      <DataGrid
        sx={{
          paddingTop: "1rem",
        }}
        rows={students.data}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 20, 50]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: CustomToolbar }}
        localeText={localeToolbarText}
        loading={loading}
        rowCount={students.data.length}
        paginationMode="client"
      />

      <Box sx={{display: "flex", justifyContent: "center", gap: 2, padding: 2}}>
        <Button
          variant="contained"
          onClick={handlePrevious}
          disabled={!previous}
        >
          المجموعة السابقة
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!next}
        >
          المجموعة التالية
        </Button>
      </Box>
    </Box>
  );
};

export default NewStudentsList;
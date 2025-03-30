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
import EditPenIcon from "@/assets/edit_pen.svg?react";
import { useNavigate } from "react-router-dom";
import { actGetAllFamilies } from "@/store/families/FamiliesSlice.ts";
import Paper from "@mui/material/Paper";

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

const FamiliesList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { families } = useAppSelector((state) => state.families);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 20,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    dispatch(actGetAllFamilies({}))
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
      dispatch(actGetAllFamilies({ next }))
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
      dispatch(actGetAllFamilies({ previous }))
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
          onClick={() =>
            navigate(`/admin/students/families-list/${params.row.id}`)
          }
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
      field: "email",
      headerName: "البريد الإلكتروني",
      flex: 1.5,
      renderCell: (params) => {
        if (!params.value) return "لا يوجد";
        return params.value;
      },
    },
    {
      field: "mobile_phone",
      flex: 1,
      headerName: "الهاتف المحمول",
      renderCell: (params) => {
        return params.value || "لا يوجد";
      },
      cellClassName: "phone-cell",
    },
    {
      field: "home_phone",
      flex: 1,
      headerName: "هاتف المنزل",
      renderCell: (params) => {
        return params.value || "لا يوجد";
      },
      cellClassName: "phone-cell",
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
            navigate(`/admin/students/families-list/${params.row.id}/edit`)
          }
        >
          <EditPenIcon />
        </button>
      ),
      cellClassName: "edit-cell",
    },
  ];

  return (
    <Box component="section">
      <Paper sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          sx={{
            border: 0,
            paddingTop: "1rem",
          }}
          rows={families.familiesData}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{ toolbar: CustomToolbar }}
          localeText={localeToolbarText}
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
    </Box>
  );
};

export default FamiliesList;

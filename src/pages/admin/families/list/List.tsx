import { useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import EditPenIcon from "@/assets/edit_pen.svg?react";
import { useNavigate } from "react-router-dom";
import { actGetAllFamilies } from "@/store/families/FamiliesSlice.ts";

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

  const {familiesData, loading} = useAppSelector(state => state.families);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actGetAllFamilies());
  }, [dispatch]);

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
      width: 280,
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
      field: "action",
      headerName: "أكشن",
      width: 90,
      renderCell: (params) => (
        <button
          style={{ cursor: params.row.id ? "pointer" : "not-allowed" }}
          disabled={!params.row.id}
          onClick={() => navigate(`/admin/students/families-list/${params.row.id}`)}
        >
          <EditPenIcon />
        </button>
      ),
      cellClassName: "edit-cell",
    },
  ];

  return (
    <Box component="section">
      <DataGrid
        sx={{
          paddingTop: "1rem",
        }}
        rows={familiesData}
        columns={columns}
        onPaginationModelChange={() => console.log("paginationModelChange")}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: CustomToolbar }}
        localeText={localeToolbarText}
        loading={loading === "pending"}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
      />
    </Box>
  );
};

export default FamiliesList;

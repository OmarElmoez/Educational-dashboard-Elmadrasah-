import { useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton
} from "@mui/x-data-grid";
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import { actGetStudents } from "@/store/table/TableSlice.ts";

import EditPenIcon from "@/assets/edit_pen.svg?react";

import './newStudentsList.css'
import { useNavigate } from "react-router-dom";

const NewStudentsList = () => {

  const {students, loading} = useAppSelector((state) => state.table);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actGetStudents({}));
  }, [dispatch]);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 80,
    },
    {
      field: 'first_name',
      headerName: 'الاسم الأول',
      width: 180,
    },
    {
      field: 'last_name',
      headerName: 'الاسم الأخير',
      width: 180,
    },
    {
      field: 'email',
      headerName: 'البريد الإلكتروني',
      width: 280,
      renderCell: params => {
        if (!params.value) return "لا يوجد"
        return params.value
      }
    },
    {
      field: 'mobile_phone',
      width: 160,
      headerName: 'الهاتف المحمول',
      renderCell: params => {
        return params.value || "لا يوجد"
      },
      cellClassName: 'phone-cell'
    },
    {
      field: 'home_phone',
      width: 180,
      headerName: 'هاتف المنزل',
      renderCell: params => {
        return params.value || "لا يوجد"
      },
      cellClassName: 'phone-cell'
    },
    {
      field: 'student_type',
      width: 120,
      headerName: 'النوع',
      renderCell: params => {
        return params.value || "لا يوجد"
      },
    },
    {
      field: 'action',
      headerName: 'أكشن',
      width: 100,
      renderCell: (params) => <button style={{cursor: params.row.id ? "pointer" : "not-allowed"}} disabled={!params.row.id}
                                      onClick={() => navigate(`/admin/students/profile/${params.row.id}`)}>
        <EditPenIcon/>
      </button>,
      cellClassName: 'edit-cell'
    }
  ]

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarExport csvOptions={{
        fileName: 'El Madrasah Dashboard',
        utf8WithBom: true,
      }}/>
      <GridToolbarFilterButton/>
      <GridToolbarColumnsButton/>
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
        initialState={{pagination: {paginationModel: {page: 0, pageSize: 20}}}}
        onPaginationModelChange={() => console.log("paginationModelChange")}
        pageSizeOptions={[10, 20, 50]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{toolbar: CustomToolbar}}
        localeText={localeToolbarText}
        loading={loading === 'pending'}
        slotProps={{
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton',
          },
        }}
      />
    </Box>
  )
}

export default NewStudentsList;
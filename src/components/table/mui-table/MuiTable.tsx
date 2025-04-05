import { ReactNode, useState } from "react";
import Paper from "@mui/material/Paper";
import Drawer from '@mui/material/Drawer';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";

const arabicLocaleText = {
  columnMenuSortAsc: 'ترتيب تصاعدي',
  columnMenuSortDesc: 'ترتيب تنازلي',

  columnMenuFilter: 'تصفية',

  columnMenuHideColumn: 'إخفاء العمود',
  columnMenuManageColumns: 'إدارة الأعمدة',

  columnMenuLabel: 'قائمة العمود',
  columnMenuShowColumns: 'إظهار الأعمدة',
  columnMenuUnsort: 'إلغاء الترتيب',

  noRowsLabel: 'لا توجد بيانات',

  toolbarColumns: "",
  toolbarFilters: "",
  toolbarExport: "",
};

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

type TTableProps<T extends Record<string, unknown>, U extends GridColDef> = {
  rows: T[],
  columns: U[],
  loading: boolean,
  filterForm?: ReactNode,
  nextFn: () => void,
  next: string | null,
  previous: string | null,
  previousFn: () => void,
}

const MuiTable = <T extends Record<string, unknown>, U extends GridColDef>({
                                                                             rows,
                                                                             columns,
                                                                             loading,
                                                                             filterForm,
                                                                             nextFn,
                                                                             previousFn,
                                                                             next,
                                                                             previous,
                                                                           }: TTableProps<T, U>) => {

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const [openDrawer, setOpenDrawer] = useState(false)

  const toggleDrawer = (status: boolean) => () => {
    setOpenDrawer(status);
  }

  return (
    <>
      {filterForm && <>
        <div className="text-left">
          <Button onClick={toggleDrawer(true)}>+ بحث متقدم</Button>
        </div>
        <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
          {filterForm}
        </Drawer>
      </>}
      <Paper sx={{height: "auto", width: "100%"}}>
        <DataGrid
          sx={{
            border: 0,
            paddingTop: "1rem",
          }}
          localeText={arabicLocaleText}
          rows={rows}
          pageSizeOptions={[10, 20, 50]}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          checkboxSelection
          disableRowSelectionOnClick
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
          onClick={previousFn}
          disabled={!previous}
        >
          المجموعة السابقة
        </Button>
        <Button variant="contained"
                onClick={nextFn}
                disabled={!next}
        >
          المجموعة التالية
        </Button>
      </Box>
    </>
  )
}

export default MuiTable;
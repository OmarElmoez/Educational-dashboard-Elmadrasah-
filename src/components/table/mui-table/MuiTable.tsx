import { ReactNode, useState } from "react";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";

const arabicLocaleText = {
  columnMenuSortAsc: "ترتيب تصاعدي",
  columnMenuSortDesc: "ترتيب تنازلي",

  columnMenuFilter: "تصفية",

  columnMenuHideColumn: "إخفاء العمود",
  columnMenuManageColumns: "إدارة الأعمدة",

  columnMenuLabel: "قائمة العمود",
  columnMenuShowColumns: "إظهار الأعمدة",
  columnMenuUnsort: "إلغاء الترتيب",

  noRowsLabel: "لا توجد بيانات",

  columnHeaderSortIconLabel: "ترتيب",

  toolbarExport: "",
  toolbarExportLabel: "تحميل",
  toolbarExportCSV: "تحميل بصيغة CSV",
  toolbarExportPrint: "طباعة",

  toolbarFilters: "",
  toolbarFiltersTooltipShow: "اظهار الفلاتر",
  toolbarFiltersTooltipHide: "اخفاء الفلاتر",
  toolbarFiltersLabel: "اظهار الفلاتر",

  toolbarColumns: "",
  filterPanelColumns: "الاعمدة",
  toolbarColumnsLabel: "تحديد الاعمدة",

  filterPanelOperator: "المعامل",
  filterOperatorContains: "يحتوي على",
  filterOperatorEquals: "يساوي",
  filterOperatorStartsWith: "يبدأ بـ",
  filterOperatorEndsWith: "ينتهي بـ",
  filterOperatorIs: "هو",
  filterOperatorNot: "ليس",
  filterOperatorAfter: "بعد",
  filterOperatorOnOrAfter: "في أو بعد",
  filterOperatorBefore: "قبل",
  filterOperatorOnOrBefore: "في أو قبل",
  filterOperatorIsEmpty: "فارغ",
  filterOperatorIsNotEmpty: "غير فارغ",
  filterOperatorIsAnyOf: "أي من",

  filterPanelInputLabel: "القيمة",
  filterPanelInputPlaceholder: "ادخل قيمة",
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

type TTableProps<T extends Record<string, unknown>, U extends GridColDef> = {
  rows: T[] | undefined;
  rowCount?: number;
  columns: U[];
  loading: boolean;
  filterForm?: ReactNode;
  nextFn: () => void;
  next?: string | null;
  previous?: string | null;
  previousFn: () => void;
};

const MuiTable = <T extends Record<string, unknown>, U extends GridColDef>({
  rows,
  rowCount,
  columns,
  loading,
  filterForm,
  nextFn,
  previousFn,
}: TTableProps<T, U>) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 100,
  });
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (status: boolean) => () => {
    setOpenDrawer(status);
  };
  const handlePaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
    if (model.page > paginationModel.page) {
      nextFn();
    } else if (model.page < paginationModel.page) {
      previousFn();
    }
  };

  return (
    <>
      {filterForm && (
        <>
          <div className="text-left">
            <Button onClick={toggleDrawer(true)}>+ بحث متقدم</Button>
          </div>
          <Drawer
            open={openDrawer}
            onClose={toggleDrawer(false)}
            SlideProps={{
              direction: "right",
            }}
            keepMounted
          >
            {filterForm}
          </Drawer>
        </>
      )}
      <Paper sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          sx={{
            border: 0,
            paddingTop: "1rem",
          }}
          localeText={arabicLocaleText}
          rows={rows}
          pageSizeOptions={[100]}
          rowCount={rowCount}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={handlePaginationModelChange}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{ toolbar: CustomToolbar }}
          loading={loading}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
            panel: {
              placement: "auto-start",
            },
          }}
        />
      </Paper>
      {/* <Box
        sx={{ display: "flex", justifyContent: "center", gap: 2, padding: 2 }}
      >
        <Button variant="contained" onClick={previousFn} disabled={!previous}>
          المجموعة السابقة
        </Button>
        <Button variant="contained" onClick={nextFn} disabled={!next}>
          المجموعة التالية
        </Button>
      </Box> */}
    </>
  );
};

export default MuiTable;

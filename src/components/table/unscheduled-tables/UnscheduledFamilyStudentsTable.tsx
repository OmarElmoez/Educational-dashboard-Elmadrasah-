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
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { TUnscheduledFamily } from "@/types/ListsTypes";
import { format } from "date-fns";

const UnscheduledFamilyStudentsTable = ({ rowData } : { rowData: TUnscheduledFamily[] | null }) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if(rowData && rowData?.length>0){
        setLoading(false);
    }
  }, [rowData]);


  const initialColumns: GridColDef[] = [
    {
      field: "name",
      headerName: "الاسم",
      flex: 1.5,
      rowSpanValueGetter: (value, row) => {
        return row ? `${row.name}-${row.scheduled_status}` : value;
      },
  
    },
    {
      field: "subscription_date",
      headerName: "تاريخ الاشتراك",
      flex: 1.2,
      renderCell: (params) => (params.value ?<>{format(new Date(params.value), "yyyy-MM-dd")}</> : "لا يوجد"),
    },
    {
      field: "service_name",
      flex: 1,
      headerName: "نوع الباقة",
      renderCell: (params) => params.value || "لا يوجد",
      cellClassName: "phone-cell",
    },
    {
      field: "grade",
      flex: 0.75,
      headerName: "الصف",
      renderCell: (params) => params.value || "---",
      cellClassName: "phone-cell",
      rowSpanValueGetter: (value, row) => {
        return row ? `${row.grade}-${row.scheduled_status}` : value;
      },
    },
    {
      field: "unscheduled",
      flex: 0.75,
      headerName: "غير مجدولة",
      renderCell: (params) => params.value || "---",
    },
    {
      field: "scheduled_status",
      headerName: "تعديل",
      flex: 1,
      filterable: false,
      renderCell: (params) => (
                <Link
                  to= {(() => {
                    switch (params.formattedValue) {
                      case "unscheduled":
                        return `/admin/schedule-lesson/${params.row.customer_id}/${params.row.unscheduled}/${params.row.id}`;
                      case "scheduled":
                        return `/admin/schedule-employee/${params.row.customer_id}/${params.row.id}`;
                      case "scheduling_error":
                        return `/admin/schedule-errors/${params.row.customer_id}/${params.row.id}`;
                      default:
                        return ``;
                    }
                  })()}
                  aria-label="Action button"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "10px",
                    width: "130px",
                    height: "30px",
                    color: "#fff",
                    borderRadius: "10px",
                    backgroundColor: (() => {
                      switch (params.formattedValue) {
                        case "unscheduled":
                          return "#1C8A44";
                        case "scheduled":
                          return "#1E27DE";
                        case "scheduling_error":
                          return "#C92516";
                        case "under_scheduling":
                          return "#FFB72B";
                        default:
                          return "#FFB72B";
                      }
                    })(),
                  }}
                >
                  {(() => {
                    switch (params.formattedValue) {
                      case "unscheduled":
                        return "في انتظار الجدولة";
                      case "scheduled":
                        return "تمت الجدولة";
                      case "scheduling_error":
                        return "يوجد خطأ في الجدولة";
                      case "under_scheduling":
                        return "اعتماد المواعيد ";
                      default:
                        return "في انتظار الجدولة";
                    }
                  })()}
                </Link>
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
  return (
    <Box component="section">
      <Paper sx={{height: "auto", width: "100%"}}>
        <DataGrid
          sx={{
            border: 0,
            paddingTop: "1rem",
            '& .MuiDataGrid-row:hover': {
                backgroundColor: 'transparent',
              },
              '& .bold': {
                fontWeight: 'bold',
              },
          }}
          localeText={arabicLocaleText}
          rows={rowData || []}
          pageSizeOptions={[10, 20, 50]}
          columns={initialColumns}
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
    </Box>
  );
};

export default UnscheduledFamilyStudentsTable;

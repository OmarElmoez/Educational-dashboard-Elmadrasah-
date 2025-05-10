import React, { useEffect } from 'react';
import { GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { MuiTable } from "@/components";
import useTanStackQuery from "@/hooks/useTanStackQuery.ts";
import { getUnscheduledList } from "@/services/unscheduled";
import { Error } from "@/pages/shared";
type UnscheduledSeparateStudentsTableProps = {
  setStudentsCount: React.Dispatch<React.SetStateAction<number>>;
};
const UnscheduledSeparateStudentsTable: React.FC<UnscheduledSeparateStudentsTableProps> = ({ setStudentsCount }) => {
  const {
    data: unscheduledStudents,
    isPending,
    increasePage,
    decreasePage,
  } = useTanStackQuery({
    queryKeyPrefix: "unscheduledStudents",
    fetchFn: getUnscheduledList,
  });
  useEffect(() => {
    if (unscheduledStudents?.count !== undefined) {
      setStudentsCount(unscheduledStudents?.count || 0);
    }
  }, [unscheduledStudents, setStudentsCount]);

  const initialColumns: GridColDef[] = [
    {
      field: "name",
      headerName: "الاسم",
      flex: 1.5,
    },
    {
      field: "subscription_date",
      headerName: "تاريخ الاشتراك",
      flex: 1.2,
      renderCell: (params) =>
        params.value ? (
          <>{format(new Date(params.value), "yyyy-MM-dd")}</>
        ) : (
          "لا يوجد"
        ),
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
          to={(() => {
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
  
  return (
    <>
    {!isPending && unscheduledStudents?.status === 403 ? (
      <Error type="noAccess" />
    ) : (
      <MuiTable
      rows={unscheduledStudents?.results}
      rowCount={unscheduledStudents?.count}
      columns={initialColumns}
      loading={isPending}
      nextFn={() => increasePage()}
      previousFn={() => decreasePage()}
      next={unscheduledStudents?.next || ""}
      previous={unscheduledStudents?.previous || ""}
    />
    )}
  </>

  );
};

export default UnscheduledSeparateStudentsTable;

import React, { useEffect } from "react";
import { getUnscheduledFamilyList } from "@/services/unscheduled";
import { useTanStackQuery } from "@/hooks";
import {
  ColumnDirective,
  ColumnsDirective,
  DetailRow,
  GridComponent,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { Error } from "@/pages/shared";

type UnscheduledFamilyListProps = {
  setFamiliesCount: React.Dispatch<React.SetStateAction<number>>;
};
const UnscheduledFamilyList: React.FC<UnscheduledFamilyListProps> = ({
  setFamiliesCount,
}) => {
  const {
    data: unscheduledFamilies,
    increasePage,
    decreasePage,
    page,
    isPending,
  } = useTanStackQuery({
    queryKeyPrefix: "unscheduledFamilies",
    fetchFn: getUnscheduledFamilyList,
  });

  useEffect(() => {
    if (unscheduledFamilies?.count !== undefined) {
      setFamiliesCount(unscheduledFamilies?.count || 0);
    }
  }, [unscheduledFamilies, setFamiliesCount]);

  const detailTemplate = (props: {
    students: { id: number; name: string; grade: string }[];
  }) => {
    return (
      <GridComponent dataSource={props.students} cssClass="syncfusion-grid">
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="الطلاب"
            textAlign="Center"
          />
          <ColumnDirective field="grade" headerText="الصف" textAlign="Center" />
        </ColumnsDirective>
      </GridComponent>
    );
  };

  return (
    <>
      {!isPending && unscheduledFamilies?.status === 403 ? (
        <Error type="noAccess" />
      ) : (
        <>
          <GridComponent
            dataSource={unscheduledFamilies?.results || []}
            enableRtl={true}
            cssClass="syncfusion-grid"
            detailTemplate={detailTemplate}
          >
            <ColumnsDirective>
              <ColumnDirective field="name" headerText="اسم العائلة" />
              <ColumnDirective
                field="subscription_date"
                headerText="تاريخ الاشتراك"
                format="dd/MM/yyyy"
                type="date"
              />
              <ColumnDirective field="service_name" headerText="نوع الباقة" />
              <ColumnDirective
                field="grade"
                headerText="الصف"
                template={(props: { grade: string }) =>
                  props.grade ? props.grade : "لا توجد بيانات"
                }
              />
              <ColumnDirective field="unscheduled" headerText="غير مجدولة" />
              <ColumnDirective
                field="scheduled_status"
                headerText="حالة الجدولة"
                template={(props: {
                  scheduled_status: string;
                  customer_id: number;
                  unscheduled: number;
                  id: number;
                }) => (
                  <Link
                    to={(() => {
                      switch (props.scheduled_status) {
                        case "unscheduled":
                          return `/admin/schedule-lesson/${props.customer_id}/${props.unscheduled}/${props.id}`;
                        case "scheduled":
                          return `/admin/schedule-employee/${props.customer_id}/${props.id}`;
                        case "scheduling_error":
                          return `/admin/schedule-errors/${props.customer_id}/${props.id}`;
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
                      marginInline: "auto",
                      backgroundColor: (() => {
                        switch (props.scheduled_status) {
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
                      switch (props.scheduled_status) {
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
                )}
              />
            </ColumnsDirective>
            <Inject services={[DetailRow]} />
          </GridComponent>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              padding: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                decreasePage();
              }}
              disabled={!unscheduledFamilies?.previous}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.76906 11.8159C5.53939 11.577 5.54683 11.1972 5.7857 10.9675L8.9359 8L5.7857 5.0325C5.54683 4.80282 5.53939 4.423 5.76906 4.18413C5.99874 3.94527 6.37857 3.93782 6.61743 4.1675L10.2174 7.5675C10.3351 7.68062 10.4016 7.83679 10.4016 8C10.4016 8.16321 10.3351 8.31938 10.2174 8.4325L6.61743 11.8325C6.37857 12.0622 5.99874 12.0547 5.76906 11.8159Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
            {page}
            <Button
              variant="outlined"
              onClick={() => {
                increasePage();
              }}
              disabled={!unscheduledFamilies?.next}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.2309 4.18414C10.4606 4.423 10.4532 4.80282 10.2143 5.0325L7.0641 8L10.2143 10.9675C10.4532 11.1972 10.4606 11.577 10.2309 11.8159C10.0013 12.0547 9.62143 12.0622 9.38257 11.8325L5.78257 8.4325C5.66492 8.31938 5.59844 8.16321 5.59844 8C5.59844 7.83679 5.66492 7.68062 5.78257 7.5675L9.38257 4.1675C9.62143 3.93782 10.0013 3.94527 10.2309 4.18414Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default UnscheduledFamilyList;

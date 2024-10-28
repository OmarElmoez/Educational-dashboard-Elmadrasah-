import { TUnscheduled } from "@/types/ListsTypes";
import tstyles from "./table.module.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const { hiddenInput, checkmark, checkmarkBox, checked, tdRow, table_btn } =
  tstyles;

type UnscheduledTableRowProps = {
  rowData: TUnscheduled;
  checkRows: number[] | null;
  handleChecked?: (id: number) => void;
};

const UnscheduledTableRow = ({
  rowData,
  checkRows = null,
  handleChecked,
}: UnscheduledTableRowProps) => {
  // ********** edit names
  const {
    id,
    customer_id,
    name,
    subscription_date,
    service_name,
    scheduled_status,
    grade,
    unscheduled,
  } = rowData;

  return (
    <tr key={rowData.id}>
      {checkRows && handleChecked && (
        <td className={checkmarkBox}>
          <span className={checkmark}>
            <input
              type="checkbox"
              checked={checkRows.includes(rowData.id)}
              onChange={() => handleChecked(rowData.id)}
              className={`${hiddenInput} ${
                checkRows.includes(rowData.id) ? checked : ""
              }`}
              data-id={rowData.id}
            />
          </span>
        </td>
      )}
      <td> {name} </td>
      {/* <td> {name} </td> */}
      <td>{format(new Date(subscription_date), "yyyy-MM-dd")}</td>
      <td> {service_name} </td>
      <td> {grade} </td>
      <td>{unscheduled}</td>
      <td className={tdRow}>
        {/*  TODO: here will be the id form row (rowData.id)  */}
        <Link
          to= {(() => {
            switch (scheduled_status) {
              case "unscheduled":
                return `/admin/schedule-lesson/${id}/${rowData.unscheduled}`;
              case "scheduled":
                return `/admin/schedule-emplyee/${customer_id}/${id}`;
              case "scheduling_error":
                return `/admin/schedule-errors/${customer_id}/${id}`;
              case "under_scheduling":
                return "/admin/all-unscheduled-list";
              default:
                return `admin/all-unscheduled-list`;
            }
          })()}
          aria-label="Action button"
          style={{
            backgroundColor: (() => {
              switch (scheduled_status) {
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
          className={table_btn}
        >
          {(() => {
            switch (scheduled_status) {
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
      </td>
    </tr>
  );
};

export default UnscheduledTableRow;

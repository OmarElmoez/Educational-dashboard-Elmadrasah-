import { useState } from "react";
import { TUnscheduledFamily } from "@/types/ListsTypes";
import tstyles from "./table.module.css";
import { format } from "date-fns";
import UpIcon from "@/assets/up_arrow_icon.svg?react";
import DownIcon from "@/assets/down_arrow_icon.svg?react";
import { Link } from "react-router-dom";

const {
  hiddenInput,
  checkmark,
  checkmarkBox,
  checked,
  tdRow,
  active_row,
  active_row_container,
  active_divider,
  td_hint,
  table_btn,
} = tstyles;

type UnscheduledFamilyTableRowProps = {
  rowData: TUnscheduledFamily;
  checkRows: number[] | null;
  handleChecked?: (id: number) => void;
  childrenRows: TUnscheduledFamily[] | null;
};

const UnscheduledFamilyTableRow = ({
  rowData,
  checkRows = null,
  handleChecked,
  childrenRows,
}: UnscheduledFamilyTableRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <tr key={rowData.id} className={isExpanded ? active_row : ""}>
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
        <td>{name}</td>
        {/* <td>{name}</td> */}
        <td>{format(new Date(subscription_date), "yyyy-MM-dd")}</td>
        <td>{service_name}</td>
        <td>{grade}</td>
        <td>{unscheduled}</td>
        {/* <td>{scheduled_status}</td> */}
        <td className={tdRow}>
          {/*  TODO: here will be the id form row (rowData.id)  */}
          {/* <Link
            to={`/admin/schedule-lesson/${1}`}
          <Link
            to={`/admin/schedule-lesson/${1}/${rowData.unscheduled}`}
            aria-label="Action button"
            style={{
               backgroundColor: `${scheduled_status === "unscheduled" ? "#C92516" :  "#FFB72B" }  ` 
              }}
            className={table_btn}
          >
            {scheduled_status === "unscheduled"
              ? "في انتظار الجدولة"
              : "تمت الجدولة"}
          </Link> */}

          <Link
            to={(() => {
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
        <td onClick={toggleExpand} style={{ cursor: "pointer" }}>
          {isExpanded ? <UpIcon /> : <DownIcon />}
        </td>
      </tr>

      {/* Render child rows if expanded */}

      {isExpanded && childrenRows && (
        <tr className={isExpanded ? active_row_container : ""}>
          <td></td>
          <td
            className={td_hint}
            style={{
              fontSize: "11px",
              margin: 0,
              padding: 0,
            }}
          >
            الطلاب
          </td>
        </tr>
      )}
      {isExpanded &&
        childrenRows &&
        childrenRows?.map((child) => (
          <tr
            key={child?.id}
            className={isExpanded ? active_row_container : ""}
          >
            <td></td>
            <td>{child?.name}</td>
            <td> </td>
            <td></td>
            <td> {child?.grade}</td>
            {/* <td>{child.scheduled_status}</td> */}
          </tr>
        ))}

      {isExpanded && childrenRows && <tr className={active_divider} />}
    </>
  );
};

export default UnscheduledFamilyTableRow;

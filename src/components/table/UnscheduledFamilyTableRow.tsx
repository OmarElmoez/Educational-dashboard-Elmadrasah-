import { useState } from "react";
import { TUnscheduled } from "@/types/ListsTypes";
import tstyles from "./table.module.css";
import { format } from "date-fns";
import UpIcon from "@/assets/up_arrow_icon.svg?react";
import DownIcon from "@/assets/down_arrow_icon.svg?react";

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
  rowData: TUnscheduled;
  checkRows: number[] | null;
  handleChecked?: (id: number) => void;
  childrenRows?: TUnscheduled[]; // Add this prop for child rows
};

const UnscheduledFamilyTableRow = ({
  rowData,
  checkRows = null,
  handleChecked,
  childrenRows, // Receive children data
}: UnscheduledFamilyTableRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle child rows

  const {
    customer_first_name,
    customer_last_name,
    date,
    service_name,
    status,
    classValue,
  } = rowData;

  const handleUpdateStatus = () => {
    console.log("from handleUpdateStatus: ", status);
  };

  // Handle expanding/collapsing child rows
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

        <td>{customer_first_name}</td>
        <td>{customer_last_name}</td>
        <td>{format(new Date(date), "yyyy-MM-dd")}</td>
        <td>{service_name}</td>
        <td>{classValue}</td>
        <td>{status}</td>
        <td className={tdRow}>
          <button onClick={handleUpdateStatus} aria-label="Action button"  style={{backgroundColor: "#C92516"}} className={table_btn}>
          اعتماد المواعيد
          </button>
        </td>
        <td onClick={toggleExpand} style={{ cursor: "pointer" }}>
          {isExpanded ? <UpIcon /> : <DownIcon />}
        </td>
      </tr>

      {/* Render child rows if expanded */}

      {isExpanded && childrenRows && (
        <tr  className={isExpanded ? active_row_container : ""}>
          <td></td>
          <td
          className={td_hint}
            style={{
              color: "#A6A6A6",
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
        childrenRows.map((child) => (
          <tr
            key={child.id}
            className={isExpanded ? active_row_container : ""}
          >
            <td></td>
            <td>{child.customer_first_name}</td>
            <td>{child.customer_last_name}</td>
            <td style={{ whiteSpace: "nowrap" }}>
              {format(new Date(child.date), "yyyy-MM-dd")}
            </td>
            <td>{child.service_name}</td>
            <td>{child.classValue}</td>
            <td>{child.status}</td>
            <td>
              {/* Add any additional actions or display for child rows here */}
              <button onClick={() => console.log("Child action")}>
                Action
              </button>
            </td>
          </tr>
        ))}

      {isExpanded && childrenRows && <tr className={active_divider} />}
    </>
  );
};

export default UnscheduledFamilyTableRow;

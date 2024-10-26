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
  const { name, subscription_date, service_name, scheduled_status, grade, unscheduled } =
    rowData;

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
        {/*  * link to form *  */}
        <Link
          to={`/admin/schedule-lesson/${rowData.id}`}
          style={{ backgroundColor: "#C92516" }}
          aria-label="Action button"
          className={table_btn}
        >
          {scheduled_status === "unscheduled"
            ? "في انتظار الجدولة"
            : "تمت الجدولة"}
        </Link>
      </td>
    </tr>
  );
};

export default UnscheduledTableRow;

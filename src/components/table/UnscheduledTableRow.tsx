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
    customer_first_name,
    customer_last_name,
    date,
    service_name,
    status,
    classValue,
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

      <td> {customer_first_name} </td>
      <td> {customer_last_name} </td>
      <td>{format(new Date(date), "yyyy-MM-dd")}</td>

      <td> {service_name} </td>
      <td> {classValue} </td>
      <td> {status} </td>

      <td className={tdRow}>
        <Link
          to="/admin/schedule-lesson"
          aria-label="Action button"
          className={table_btn}
        >
          اعتماد المواعيد
        </Link>
      </td>
    </tr>
  );
};

export default UnscheduledTableRow;

import { TUnscheduled } from "@/types/ListsTypes";
import tstyles from "./table.module.css";
import { format } from "date-fns";

const { hiddenInput, checkmark, checkmarkBox, checked, tdRow } = tstyles;

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


  const handleUpdateStatus = () => {
    console.log("from handleUpdateStatus: ", status)
  };


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
        <button
          onClick={handleUpdateStatus}
          aria-label="Action button"
        >
          Click me
        </button>
      </td>
    </tr>
  );
};

export default UnscheduledTableRow;

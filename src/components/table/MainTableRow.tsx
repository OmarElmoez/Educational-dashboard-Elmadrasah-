import tstyles from "./table.module.css";
import SearchIcon from "@/assets/search_icon.svg?react";
import EditPenIcon from "@/assets/edit_pen.svg?react";
import { format } from "date-fns";

const { hiddenInput, checkmark, checkmarkBox, checked, tdRow } = tstyles;

type MainTableRowProps<T> = {
  rowData: T;
  headData: { name: string; label: string }[];
  checkRows: number[];
  handleChecked: (id: number) => void;
  onViewRow: () => void;
  onEditRow: () => void;
  fieldsWithDifferentDirection?: string[];
};

const MainTableRow = <T extends Record<string, any>>({
  rowData,
  headData,
  checkRows,
  handleChecked,
  onViewRow,
  onEditRow,
  fieldsWithDifferentDirection = ["mobile_phone", "home_phone"],
}: MainTableRowProps<T>) => {
  return (
    <tr key={rowData.id}>
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
      {headData.map((head) => (
        <td
          key={String(head.name)}
          style={{
            direction: fieldsWithDifferentDirection.includes(String(head.name))
              ? "ltr"
              : "rtl",
          }}
        >
          {rowData[head.name] === "sent_at" ?  format(rowData[head.name], "dd-MM-YYYY") :  rowData[head.name]|| "---"}
        </td>
      ))}
      <td className={tdRow}>
        <button onClick={onViewRow}>
          <SearchIcon />
        </button>
        <button onClick={onEditRow}>
          <EditPenIcon />
        </button>
      </td>
    </tr>
  );
};

export default MainTableRow;

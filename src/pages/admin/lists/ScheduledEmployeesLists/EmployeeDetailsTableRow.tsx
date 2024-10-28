import { format } from "date-fns";
import tstyles from "../../../../components/table/table.module.css";
// import { Link } from "react-router-dom";
import ReloadIcon from "@/assets/reload_icon.svg?react";
import { arSA } from "date-fns/locale";
const { table_btn, table_column_cell } = tstyles;
import avatar from "@/assets/avatar.png";

type EmployeeDetailsTableRowProps<T> = {
  rowData: T;
  onClick?: () => void;
};

// ------------------------------------------------------------
const EmployeeDetailsTableRow = <T extends Record<string, any>>({
  rowData,
  onClick,
}: EmployeeDetailsTableRowProps<T>) => {
  const {
    name,
    phone,
    image,
    subject,
    status,
    send_datetime,
    accept_datetime,
    lessons_count,
  } = rowData;
  return (
    <tr key={rowData.id}>
      <td>
        {image ? (
          <img
            src={image}
            alt="employee"
            style={{ width: "63px", borderRadius: "10px" }}
          />
        ) : (
          <img
            src={avatar}
            alt="employee"
            style={{ width: "63px", borderRadius: "10px" }}
          />
          // <Avatar />
        )}
      </td>
      <td className={phone ? table_column_cell : ""}>
        {name}
        <p style={{ margin: 0, padding: 0 }}> {phone}</p>
      </td>
      <td>{subject}</td>
      <td>{status}</td>
      <td>
        {format(new Date(send_datetime || null), "d/M/yyyy - h:mm", {
          locale: arSA,
        })}
        {format(new Date(send_datetime || null), "a") === "AM" ? "ص" : "م"}
      </td>
      <td>
        {format(new Date(accept_datetime || null), "d/M/yyyy - h:mm", {
          locale: arSA,
        })}
        {format(new Date(accept_datetime || null), "a") === "AM" ? "ص" : "م"}
      </td>
      {!onClick && <td>{lessons_count}</td>}
      <td>
        {onClick && (
          <button
            onClick={onClick}
            aria-label="Action button"
            style={{ backgroundColor: "#C92516" }}
            className={table_btn}
          >
            <ReloadIcon />
            إعادة التوجية
          </button>
        )}
      </td>
    </tr>
  );
};

export default EmployeeDetailsTableRow;

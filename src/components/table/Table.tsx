import styles from "./table.module.css";
import { TCustomer } from "@/types/table";

const { table, hiddenInput, checkmark, checkmarkBox } = styles;

type TTableProps = {
  headData: { name: string; label: string }[];
  bodyData: TCustomer[];
};

const fieldsWithDifferentDirection = ["mobile_phone", "home_phone"];

const Table = ({ headData, bodyData }: TTableProps) => {
  return (
    <table className={table}>
      <thead>
        <tr>
          <th className={checkmarkBox}>
            <span className={checkmark}>
              <input type="checkbox" className={hiddenInput} />
            </span>
          </th>
          {headData.map((head) => (
            <th key={head.name}>{head.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyData?.map((body) => (
          <tr key={body.id}>
            <td className={checkmarkBox}>
              <span className={checkmark}>
                <input type="checkbox" className={hiddenInput} />
              </span>
            </td>
            {headData.map((head) => (
              <td
                key={head.name}
                style={{
                  direction: fieldsWithDifferentDirection.includes(head.name)
                    ? "ltr"
                    : "rtl",
                }}
              >
                {body[head.name as keyof typeof body] || "---"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

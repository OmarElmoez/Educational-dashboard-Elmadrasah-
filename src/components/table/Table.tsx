import { useEffect } from "react";
import styles from "./table.module.css";
import { TCustomer } from "@/types/table";

const { table, hiddenInput, checkmark, checkmarkBox, checked } = styles;

type TTableProps = {
  headData: { name: string; label: string }[];
  bodyData: TCustomer[];
  checkAll: boolean;
  setCheckAll: (param: boolean) => void;
};

const fieldsWithDifferentDirection = ["mobile_phone", "home_phone"];

const Table = ({ headData, bodyData, checkAll, setCheckAll }: TTableProps) => {


  useEffect(() => {
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"], checked');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        console.log(checkbox.dataset.id);
      }
    });
  }, [checkAll]);

  return (
    <table className={table}>
      <thead>
        <tr>
          <th className={checkmarkBox}>
            <span className={checkmark}>
              <input type="checkbox" className={hiddenInput} onClick={() => setCheckAll(!checkAll)} />
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
                <input
                  type="checkbox"
                  className={`${hiddenInput} ${checkAll ? checked : ""}`}
                  data-id={body.id}
                />
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

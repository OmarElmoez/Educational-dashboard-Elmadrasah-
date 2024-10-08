import { format } from "date-fns";


type BalanceTableRowProps<T> = {
  rowData: T;
  headData: { name: string; label: string }[];
 
  fieldsWithDifferentDirection?: string[];
};

const BalanceTableRow = <T extends Record<string, any>>({
  rowData,
  headData,

  fieldsWithDifferentDirection = ["mobile_phone", "home_phone"],
}: BalanceTableRowProps<T>) => {
  return (
    <tr key={rowData.id}>
  
      {headData.map((head) => (
        <td
          key={String(head.name)}
          style={{
            direction: fieldsWithDifferentDirection.includes(String(head.name))
              ? "ltr"
              : "rtl",
          }}
        >
          {rowData[head.name] === "sent_at"
            ? format(rowData[head.name], "dd-MM-YYYY")
            : rowData[head.name] || "---"}
        </td>
      ))}
     
    </tr>
  );
};

export default BalanceTableRow;

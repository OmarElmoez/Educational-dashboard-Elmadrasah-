import tstyles from "../../../../components/table/table.module.css";

const {tdRow } = tstyles;

type EmployeeDetailsTableRowProps<T> = {
  rowData: T;
};

// ------------------------------------------------------------
const EmployeeDetailsTableRow = <T extends Record<string, any>>({
  rowData,
}: EmployeeDetailsTableRowProps<T>) => {
  return (
    <tr key={rowData.id}>

      <td className={tdRow}>
        image
      </td>
      <td className={tdRow}>
        text
      </td>
      <td className={tdRow}>
        text
      </td>
      <td className={tdRow}>
        text
      </td>
    </tr>
  );
};

export default EmployeeDetailsTableRow;

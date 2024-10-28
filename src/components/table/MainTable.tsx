import React from "react";
import styles from "./table.module.css";

const { table, hiddenInput, checkmark, checkmarkBox,  } = styles;

type TTableProps = {
  headData?: { name: string; label: string }[];
  onCheckAll?: () => void;
  children: React.ReactNode ;
  isCheckbox?:boolean;
};
const MainTable = ({ headData, onCheckAll, children, isCheckbox= true }: TTableProps) => {
  return (
    <table className={table}>
      <thead>
        <tr>
          {(isCheckbox && onCheckAll )&& <th className={checkmarkBox}>
            <span className={checkmark}>
              <input 
              type="checkbox" 
              className={hiddenInput} 
              onChange={() => {
                onCheckAll()
              }}
               />
            </span>
          </th>}
          {headData && headData?.map((head) => (
            <th key={head.name}>{head.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {children}
      
      </tbody>
    </table>
  );
};

export default MainTable;

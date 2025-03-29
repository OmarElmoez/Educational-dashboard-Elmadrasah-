import {
  TSpecificStudentLesson,
  TStudentInvoice,
  TStudentPayment,
  TSubscriptionCredit,
} from "@/schemas/AddStudentSchema.ts";
import convert24HourToArabic from "@/utils/convert24HourToArabic.ts";
import { TInitialStudent } from "@/schemas/AddEmployeeSchema.ts";
import { Student } from '../../../services/families';
import { useNavigate } from "react-router-dom";
import { JSX } from 'react';
export type TTableRow = TSubscriptionCredit | TSpecificStudentLesson | TStudentInvoice | TStudentPayment | TInitialStudent | Student

type TSimpleTableProps<T extends TTableRow> = {
  tableHead: string[],
  rows: T[],
  noDataMsg: string,
}

const SimpleTable = <T extends TTableRow>({tableHead, rows, noDataMsg}: TSimpleTableProps<T>) => {
  const navigate = useNavigate();
  return (
    <section className="w-full">

      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] justify-items-start pb-[2rem] border-b border-[#EBEBEB]">
        {tableHead.map((col, idx) => (
          <span key={col}
                className={`text-[#000000CC] font-medium ${idx === 0 ? 'min-w-[15rem]' : 'min-w-[9.2rem]'} text-center`}>{col}</span>
        ))}
      </div>

      {rows.length === 0 && <p className="font-medium !text-[2rem] text-[#8D8D8D] mt-6 text-center">{noDataMsg}</p>}

      {rows.length > 0 && rows.map(({id, ...rest}) =>(
        <div key={id}
    className={`grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] justify-items-start py-[1.6rem] ${id === 1 && 'pt-[2rem]'} border-b border-[#EBEBEB]`}>
    {Object.entries(rest).map(([key, value], idx) => {
        let content: JSX.Element | string = value as string;
        let additionalClasses = "";
        if (key === "from_time" || key === "to_time") {
          content = convert24HourToArabic(value as string);
        }
        if (key === "status") {
          content = value === true ? <span className="text-[var(--main-color)]">نشط</span>: <span className="text-[#8D8D8D]">متوقف</span>;
        }
        if (key === "first_name") {
          content = (
            <span
              className="text-[var(--main-color)] underline cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/admin/students/profile/${id}`);
              }}
            >
              {value as string}
            </span>
          );
        }
        if (key === "formatted_number") {
          content = (
            <span
              className="text-[var(--main-color)] underline cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/admin/invoices/invoice-details/${id}`);
              }}
            >
              {value as string}
            </span>
          );
        }
        if (key.includes("phone")) {
          additionalClasses += " [direction:ltr]";
        }
        return (
          <span
            key={key}
            className={`${idx === 0 ? "min-w-[15rem]" : "min-w-[9.2rem]"} text-center ${additionalClasses}`}
          >
            {content}
          </span>
        );
      })}
        </div>
      ))}

    </section>
  )
}

export default SimpleTable;
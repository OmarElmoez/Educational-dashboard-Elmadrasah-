import {
  TSpecificStudentLesson,
  TStudentInvoice,
  TStudentPayment,
  TSubscriptionCredit,
} from "@/schemas/AddStudentSchema.ts";
import convert24HourToArabic from "@/utils/convert24HourToArabic.ts";
import { TInitialStudent } from "@/schemas/AddEmployeeSchema.ts";
import { Student } from '../../../services/families';

export type TTableRow = TSubscriptionCredit | TSpecificStudentLesson | TStudentInvoice | TStudentPayment | TInitialStudent | Student

type TSimpleTableProps<T extends TTableRow> = {
  tableHead: string[],
  rows: T[],
  noDataMsg: string,
}

const SimpleTable = <T extends TTableRow>({tableHead, rows, noDataMsg}: TSimpleTableProps<T>) => {
  return (
    <section className="w-full">

      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] justify-items-start pb-[2rem] border-b border-[#EBEBEB]">
        {tableHead.map((col, idx) => (
          <span key={col}
                className={`text-[#000000CC] font-medium ${idx === 0 ? 'min-w-[15rem]' : 'min-w-[9.2rem]'} text-center`}>{col}</span>
        ))}
      </div>

      {rows.length === 0 && <p className="font-medium text-[#000000E5] mt-6 text-center">{noDataMsg}</p>}

      {rows.length > 0 && rows.map(({id, ...rest}) => (
        <div key={id}
             className={`grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] justify-items-start py-[1.6rem] ${id === 1 && 'pt-[2rem]'} border-b border-[#EBEBEB]`}>
          {Object.entries(rest).map(([key, value], idx) => (
            <span key={key}
                  className={`${idx === 0 ? 'min-w-[15rem]' : 'min-w-[9.2rem]'} text-center ${key === 'status' && 'text-[var(--main-color)]'} ${key.includes('phone') && "[direction:ltr]"}`}>
              {(key === 'from_time' || key === 'to_time') ? (convert24HourToArabic(value as string)) : value as string}
              {(key === 'status') ? (value === true)?"نشط": null: null}
            </span>
          ))}
        </div>
      ))}

    </section>
  )
}

export default SimpleTable;
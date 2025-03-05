import {
  TSpecificStudentLesson,
  TStudentInvoice,
  TStudentPayment,
  TSubscriptionCredit
} from "@/schemas/AddStudentSchema.ts";
import convert24HourToArabic from "@/utils/convert24HourToArabic.ts";

type TTableRow = TSubscriptionCredit | TSpecificStudentLesson | TStudentInvoice | TStudentPayment

type TSimpleTableProps<T extends TTableRow> = {
  tableHead: string[],
  rows: T[],
  noDataMsg: string
}

const SimpleTable = <T extends TTableRow>({tableHead, rows, noDataMsg}: TSimpleTableProps<T>) => {
  return (
    <section>

      <div className="flex items-center gap-[7.2rem] pb-[2rem] border-b border-[#EBEBEB]">
        {tableHead.map((col, idx) => (
          <span key={col}
                className={`text-[#000000CC] font-medium ${idx === 0 ? 'min-w-[15rem]' : 'min-w-[9.2rem]'} text-center`}>{col}</span>
        ))}
      </div>

      {rows.length === 0 && <p className="font-medium text-[#000000E5] mt-6">{noDataMsg}</p>}

      {rows.length > 0 && rows.map(({id, ...rest}) => (
        <div key={id}
             className={`flex items-center gap-[7.2rem] py-[1.6rem] ${id === 1 && 'pt-[2rem]'} border-b border-[#EBEBEB]`}>
          {Object.entries(rest).map(([key, value], idx) => (
            <span key={key}
                  className={`${idx === 0 ? 'min-w-[15rem]' : 'min-w-[9.2rem]'} text-center ${key === 'status' && 'text-[var(--main-color)]'}`}>
              {(key === 'from_time' || key === 'to_time') ? (convert24HourToArabic(value as string)) : value as string}
            </span>
          ))}
        </div>
      ))}

    </section>
  )
}

export default SimpleTable;
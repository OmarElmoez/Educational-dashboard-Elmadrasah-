import { useEffect, useState } from "react";
import MainTable from "@/components/table/MainTable";


import { getUnscheduledList } from "@/services/unscheduled";
import { TUnscheduled } from "@/types/ListsTypes";
import EmployeeDetailsTableRow from "./EmployeeDetailsTableRow";

// -----------------------------------------------------------------------------------------
const ParticipantList = () => {

  // table data states:
  const [tableData, setTableData] = useState<TUnscheduled[] | null>(null);
  const [allDataCount, setAllDataCount] = useState<number>(0);

 



  useEffect(() => {
    // get All Data
    getUnscheduledList(1, null).then((res) => {
      setTableData(res.results);
      setAllDataCount(res.count);
    });
  }, [ ]);

  return (
    <>
     

      <section>
        <MainTable
          // headData={TABLE_HEAD_DATA["unscheduled"]}
        >
          <EmployeeDetailsTableRow rowData={[]} />

          {tableData &&
            tableData?.map((row) => (
              <EmployeeDetailsTableRow
                key={row.id}
                rowData={row}
              />
            ))}
        </MainTable>
      </section>
    </>
  );
};

export default ParticipantList;

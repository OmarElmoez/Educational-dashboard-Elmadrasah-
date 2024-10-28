import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainTable from "@/components/table/MainTable";

import { TdraftLessonsStatusResponse } from "@/types/ListsTypes";
import EmployeeDetailsTableRow from "./EmployeeDetailsTableRow";
import { getscheduledErrorsList } from "@/services/unscheduled";
import { TABLE_HEAD_DATA } from "@/constants";

// -----------------------------------------------------------------------------------------
const ScheduledErrorsTableList = () => {
  // table data states:
  const [tableData, setTableData] = useState<
    TdraftLessonsStatusResponse[] | null
  >(null);

  const { std_id, id } = useParams();

  {
    /*  TODO: Upadte it with real function  */
  }
  const handleRescheduleClick = (id: number) => {
    console.log("handleClick", id);
  };

  useEffect(() => {
    // get All Data
    if (std_id && id) {
      getscheduledErrorsList(std_id, id).then((res) => {
        if (res?.length) {
          setTableData(res);
        }
      });
    }
  }, [std_id, id]);

  return (
    <>
      <section>
        <MainTable 
        headData={TABLE_HEAD_DATA["scheduledStatus"]}
        >
        
          {tableData &&
            tableData?.map((row) => (
              <EmployeeDetailsTableRow
                key={row.id}
                rowData={row}
                onClick={() => handleRescheduleClick(row.lesson_draft_id)}
              />
            ))}
        </MainTable>
      </section>
    </>
  );
};

export default ScheduledErrorsTableList;

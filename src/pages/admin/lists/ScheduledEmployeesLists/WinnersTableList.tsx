import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainTable from "@/components/table/MainTable";


import { TdraftLessonsStatusResponse } from "@/types/ListsTypes";
import EmployeeDetailsTableRow from "./EmployeeDetailsTableRow";
import { getscheduledWinnersTeachersList } from "@/services/unscheduled";
import { TABLE_HEAD_DATA } from "@/constants";

// -----------------------------------------------------------------------------------------
const WinnersList = () => {

  // table data states:
  const [tableData, setTableData] = useState<TdraftLessonsStatusResponse[] | null>(null);

  const {std_id, id} = useParams();

  useEffect(() => {
    // get All Data
    if(std_id && id){
      getscheduledWinnersTeachersList(std_id, id).then(res=> {
        if(res?.length){
          setTableData(res)
        }
      });
    }

  }, [std_id, id]);

  return (
    <>
     

      <section>
        <MainTable
          headData={TABLE_HEAD_DATA["scheduledStatusWinners"]}
        >
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

export default WinnersList;

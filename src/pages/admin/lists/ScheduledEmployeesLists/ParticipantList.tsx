import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainTable from "@/components/table/MainTable";
import { getscheduledParticipantsTeachersList } from "@/services/unscheduled";
import { TdraftLessonsStatusResponse } from "@/types/ListsTypes";
import EmployeeDetailsTableRow from "./EmployeeDetailsTableRow";
import { TABLE_HEAD_DATA } from "@/constants";

// -----------------------------------------------------------------------------------------
const ParticipantList = () => {
  // table data states:
  const [tableData, setTableData] = useState<
    TdraftLessonsStatusResponse[] | null
  >(null);

  const { std_id, id } = useParams();
  console.log("std_id, id", std_id, id);

  useEffect(() => {
    // get All Data
    if (std_id && id) {
      getscheduledParticipantsTeachersList(std_id, id).then((res) => {
        if (res?.length) {
          console.log("resxaxa", res);
          setTableData(res);
        }
      });
    }
  }, [std_id, id]);

  {
    /*  TODO: Upadte it with real function  */
  }
  const handleRescheduleClick = (id: number) => {
    console.log("handleClick", id);
  };

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
                onClick={() => handleRescheduleClick(row.id)}
              />
            ))}
        </MainTable>
      </section>
    </>
  );
};
export default ParticipantList;

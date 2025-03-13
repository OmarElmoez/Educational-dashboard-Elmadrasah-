import { useCallback, useEffect, useState } from "react";
import TeacherDataTable from "@/components/table/teacher-table-for-admin/teacherDataTable";
import actGetAllEmployees from "../../store/table/act/actGetAllEmployeesData";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import actSearchForTableData from "@/store/table/act/actSearchForTableData";
import AdvancedSearchSection from "../../components/search/advanced-search/advancedSearchEmployeesTable";
export type TsearchData = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  subject_choices: string | null | undefined;
  phone: string | null;
  gender: string | null;
  is_active: boolean | null;
  teacher_language: string | string[];
  country: string;
  state: string;
  hire_date_start: string | null;
  hire_date_end: string | null;
  resignation_date_start: string | null;
  resignation_date_end: string | null;
};
const AdminTeachersPage = () => {
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector((state) => state.table);
  const [loading, setLoading] = useState<boolean>(true);
  const getAllEmployees = useCallback(
    ({
      next,
      previous,
    }: {
      next?: string | null;
      previous?: string | null;
    }) => {
      setLoading(true);
      if (next) {
        dispatch(actGetAllEmployees({ next }))
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error fetching hourly lessons:", error);
          });
      } else if (previous) {
        dispatch(actGetAllEmployees({ previous }))
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error fetching hourly lessons:", error);
          });
      } else {
        dispatch(actGetAllEmployees({}))
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error fetching hourly lessons:", error);
          });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getAllEmployees({});
  }, [getAllEmployees]);
  const handleAdvancedSearches = ({
    searchDataValues,
  }: {
    searchDataValues?: TsearchData | undefined;
  }) => {
    dispatch(
      actSearchForTableData({
        searchTerm: "",
        searchFor: "employees",
        queryParams: searchDataValues,
      })
    )
  };
  return (
    <>
      <section>
        <AdvancedSearchSection handleSearch={handleAdvancedSearches} />
        <TeacherDataTable
          employeesData={employees.data}
          next={employees.next}
          previous={employees.previous}
          rowCount={employees.count}
          loading={loading}
          dispatchGetAllEmployees={getAllEmployees}
        />
      </section>
    </>
  );
};

export default AdminTeachersPage;

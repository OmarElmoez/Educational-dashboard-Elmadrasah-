import { TDataForSpecificEmployee } from "@/schemas/AddEmployeeSchema.ts";
import { useMemo } from "react";
import createListOfIds from "@/pages/admin/forms/edit/utils/createListOfIds.ts";

const usePredefinedChoices = <T extends keyof TDataForSpecificEmployee>(employeeData: TDataForSpecificEmployee | undefined, key: T) => {
  return useMemo(() => {
    if (!employeeData || !Array.isArray(employeeData[key])) {
      return [];
    }

    const dataArray = employeeData[key] as unknown[];

    if (dataArray.length > 0 && typeof dataArray[0] === 'object' && dataArray[0] !== null && 'id' in dataArray[0]) {
      return createListOfIds(dataArray as { id: number | string }[]);
    }

    return [];
  }, [employeeData, key]);
}

export default usePredefinedChoices;
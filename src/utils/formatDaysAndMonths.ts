import { format } from "date-fns";
import { ar } from "date-fns/locale";

const formatDaysAndMonths = (dateString: string | undefined): string => {
  if (dateString === undefined) {
    return "لا يوجد";}
  const date = new Date(dateString);
  return format(date, "d MMMM", { locale: ar });
};
export default formatDaysAndMonths
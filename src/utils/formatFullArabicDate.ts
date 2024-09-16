import { parseISO, format } from 'date-fns';
import { ar } from 'date-fns/locale';

const formatFullArabicDate = (isoDateString: string): string => {
  const date = parseISO(isoDateString);
  
  const formattedDate = format(date, "EEEE'، 'd MMMM'، الساعة 'h:mm a", {
    locale: ar,
  });

  return formattedDate;
};

export default formatFullArabicDate;
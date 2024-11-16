import {format, parseISO} from 'date-fns';
import {ar} from 'date-fns/locale';

const formatFullArabicDate = (isoDateString: string): string => {
  const date = parseISO(isoDateString);

  return format(date, "EEEE' , 'd MMMM' , الساعة 'h:mm a", {
    locale: ar,
  });
};

export default formatFullArabicDate;
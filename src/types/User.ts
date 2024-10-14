export type TUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  image: string;
  gender: string;
  birth_date: string;
  date_joined: string;
  message: string;
  status: number;
  new_notification: number;
};

export type TUserStatistics = {
  total_lessons: number;
  total_attended: number;
  total_scheduled: number;
  total_missed: number;
};

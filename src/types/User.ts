import {TUserRole} from "@/types/shared.ts";

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
  user_type: TUserRole
};

export type TUserStatistics = {
  id: number;
  first_name: string;
  last_name: string;
}[];

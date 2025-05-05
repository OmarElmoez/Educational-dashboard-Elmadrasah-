import React from "react";
import { TSubLink } from "@/components/main-sidebar/sub-nav/SubNav.tsx";

type TLoading = "idle" | "pending" | "succeeded" | "failed";

type TUserRole = "Admin" | "Student" | "Teacher" | "Family" | undefined;

type TLessonStatus =
  | "Scheduled"
  | "Attended"
  | "Missed"
  | "Progressing"
  | "Canceled";

type TPath = {
  title: string;
  path: string;
  icon: React.ReactNode;
  phone_icon?: React.ReactNode;
  page_title?: string;
  children?: TSubLink[]
};

type TModalRef = {
  open: () => void;
  close: () => void;
};

type TResponseOption = {
  id: number;
  name: string;
  codename?: string;
};

type TService = "charges" | "packages" | "lessons";

type TTax_Treatment = "Tax Exclusive" | "Tax Inclusive" | "Tax Exempt";

type TPostResponse = {
  response: string,
  error?: string;
  conflicts?: string[];
  status: number,
  data: { message: string }
}

export type {
  TLoading,
  TUserRole,
  TPath,
  TLessonStatus,
  TModalRef,
  TResponseOption,
  TService,
  TTax_Treatment,
  TPostResponse
};

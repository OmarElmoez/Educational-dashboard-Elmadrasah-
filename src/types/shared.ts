import React from "react";

type TLoading = "idle" | "pending" | "succeeded" | "failed";

type TFirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

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
  children?: {
    title: string;
    path: string;
    icon: React.ReactNode;
    phone_icon?: React.ReactNode;
  }[]
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

export type {
  TLoading,
  TFirstDayOfWeek,
  TUserRole,
  TPath,
  TLessonStatus,
  TModalRef,
  TResponseOption,
  TService,
  TTax_Treatment
};

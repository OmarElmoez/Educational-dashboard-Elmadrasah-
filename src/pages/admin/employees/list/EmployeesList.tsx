import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import EditPenIcon from "@/assets/edit_pen.svg?react";
import { useNavigate } from "react-router-dom";
import { MuiTable } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/main";
import { getEmployees } from "@/services/employees";
import avatar from "@/assets/avatar.png";

import "./teacherDataTable.css";
import EmployeesFilterForm from "./filter-form/EmployeesFilterForm";

type Subject = {
  id: number;
  name_ar: string;
  name_en: string;
};

export type TEmployeeFilterData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  subject: string,
  country: string,
  state: string,
  gender: string,
  is_active: string,
  teacher_language: string[] | string,
  hire_date_start: string,
  hire_date_end: string,
  resignation_date_start: string,
  resignation_date_end: string,
};

const EmployeesList = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const [searchTerms, setSearchTerms] = useState<TEmployeeFilterData | null>(
    null
  );

  const increasePage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const decreasePage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const { data: students, isPending } = useQuery({
    queryKey: ["employees", { page, searchTerms }],
    queryFn: () => getEmployees({ page, searchTerms }),
    staleTime: 0.5 * 60 * 1000,
  });

  useEffect(() => {
    if (students?.next) {
      const nextPageNumber = page + 1;
      const nextPageQueryKey = ["employees", { page: nextPageNumber, searchTerms }];

      if (!queryClient.getQueryData(nextPageQueryKey)) {
        queryClient.prefetchQuery({
          queryKey: nextPageQueryKey,
          queryFn: () => getEmployees({ page: nextPageNumber, searchTerms }),
        });
      }
    }
  }, [students, page, searchTerms]);

  const initialColumns: GridColDef[] = [
    {
      field: "image",
      headerName: "صورة شخصية",
      flex: 0.65,
      headerAlign: "center",
      filterable: false,
      renderCell: (params) => {
        if (params.value) {
          return (
            <div className="image-container">
              <img
                className="cell-profile-image"
                src={params.value}
                alt="صورة شخصية"
              />
            </div>
          );
        } else {
          return (
            <div className="image-container">
              <img
                className="cell-profile-icon"
                src={avatar}
                alt="صورة شخصية"
              />
            </div>
          );
        }
      },
    },
    {
      field: "full_name",
      headerName: "الاسم الكامل",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => (
        <button
          style={{ cursor: params.row.id ? "pointer" : "not-allowed" }}
          disabled={!params.row.id}
          onClick={() =>
            navigate(`/admin/employees/employee-profile/${params.row.id}`)
          }
        >
          {params.row.first_name} {params.row.last_name}
        </button>
      ),
    },
    {
      field: "phone",
      headerName: "الهاتف",
      flex: 0.75,
      headerAlign: "center",
      cellClassName: "cell-phone",
      renderCell: (params) => {
        if (params.formattedValue) {
          return params.formattedValue;
        } else {
          return "لا يوجد";
        }
      },
    },
    {
      field: "email",
      headerName: "البريد الإلكترونى",
      flex: 1.5,
      headerAlign: "center",
      editable: true,
      renderCell: (params) => {
        if (params.formattedValue) {
          return params.formattedValue;
        } else {
          return "لا يوجد";
        }
      },
    },
    {
      field: "country",
      headerName: "الدولة",
      flex: 0.75,
      headerAlign: "center",
      renderCell: (params) => {
        if (params.formattedValue) {
          return params.formattedValue;
        } else {
          return "لا يوجد";
        }
      },
    },
    {
      field: "employee_type",
      headerName: "النوع",
      flex: 0.75,
      headerAlign: "center",
    },
    {
      field: "subject_choices_response",
      headerName: "المواد",
      flex: 1.25,
      headerAlign: "center",
      renderCell: (params) => {
        if (params.formattedValue.length > 0) {
          return params.formattedValue.map((subject: Subject) => {
            return `${subject.name_ar},`;
          });
        } else {
          return "لا توجد مواد مختارة";
        }
      },
    },
    {
      field: "id",
      headerName: "تعديل",
      flex: 0.5,
      headerAlign: "center",
      filterable: false,
      renderCell: (params) => {
        return (
          <button
            onClick={() =>
              navigate(`/admin/employees/edit-employee/${params.row.id}`)
            }
          >
            <EditPenIcon />
          </button>
        );
      },
      cellClassName: "edit-cell",
    },
  ];

  const onSearchHandler = (data: TEmployeeFilterData) => {
    setSearchTerms(data);
    setPage(1);
  };

  return (
    <MuiTable
      rows={students?.results}
      columns={initialColumns}
      loading={isPending}
      filterForm={<EmployeesFilterForm submitFn={onSearchHandler} />}
      nextFn={() => increasePage()}
      previousFn={() => decreasePage()}
      next={students?.next as string}
      previous={students?.previous as string}
    />
  );
};

export default EmployeesList;

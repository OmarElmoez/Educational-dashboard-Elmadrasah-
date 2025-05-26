import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import EditPenIcon from "@/assets/edit_pen.svg?react";
import { useNavigate } from "react-router-dom";
import { MuiTable } from "@/components";
import { getFamilies } from "@/services/families.ts";
import useTanStackQuery from "@/hooks/useTanStackQuery.ts";
import getOnlyKeysWithData from "@/utils/getOnlyKeysWithData.ts";
import FamiliesFilterForm from "./filter-form/FamiliesFilterForm";

export type TFamilyFilterData = {
  email: string;
  first_name: string;
  last_name: string;
  mobile_phone: number | null;
  is_active: string;
};

const FamiliesList = () => {
  const navigate = useNavigate();
  const [searchTerms, setSearchTerms] = useState<Record<
    string,
    unknown
  > | null>(null);

  const {
    data: families,
    isPending,
    increasePage,
    decreasePage,
    setPage,
  } = useTanStackQuery({
    queryKeyPrefix: "families",
    fetchFn: getFamilies,
    filters: searchTerms,
  });

  const onSearchHandler = (data: TFamilyFilterData) => {
    const filteredData = getOnlyKeysWithData(data);
    setSearchTerms(filteredData);
    setPage(1);
  };
  const initialColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      filterable: false,
    },
    {
      field: "first_name",
      headerName: "الاسم الأول",
      flex: 1,
      renderCell: (params) => (
        <button
          style={{ cursor: params.row.id ? "pointer" : "not-allowed" }}
          disabled={!params.row.id}
          onClick={() =>
            navigate(`/admin/students/families-list/${params.row.id}`)
          }
        >
          {params.value}
        </button>
      ),
    },
    {
      field: "last_name",
      headerName: "الاسم الأخير",
      flex: 1,
    },
    {
      field: "country",
      headerName: "الدولة",
      flex: 1,
    },
    {
      field: "email",
      headerName: "البريد الإلكتروني",
      flex: 1.5,
      renderCell: (params) => {
        if (!params.value) return "لا يوجد";
        return params.value;
      },
    },
    {
      field: "mobile_phone",
      flex: 1,
      headerName: "الهاتف المحمول",
      renderCell: (params) => {
        return params.value || "لا يوجد";
      },
      cellClassName: "phone-cell",
    },
    {
      field: "home_phone",
      flex: 1,
      headerName: "هاتف المنزل",
      renderCell: (params) => {
        return params.value || "لا يوجد";
      },
      cellClassName: "phone-cell",
    },
    {
      field: "action",
      headerName: "أكشن",
      flex: 0.5,
      filterable: false,
      renderCell: (params) => (
        <button
          style={{ cursor: params.row.id ? "pointer" : "not-allowed" }}
          disabled={!params.row.id}
          onClick={() =>
            navigate(`/admin/students/families-list/${params.row.id}/edit`)
          }
        >
          <EditPenIcon />
        </button>
      ),
      cellClassName: "edit-cell",
    },
  ];

  return (
    <MuiTable
      rows={families?.results}
      rowCount={families?.count || 0}
      columns={initialColumns}
      loading={isPending}
      nextFn={() => increasePage()}
      previousFn={() => decreasePage()}
      filterForm={<FamiliesFilterForm submitFn={onSearchHandler} />}
      next={families?.next || ""}
      previous={families?.previous || ""}
    />
  );
};

export default FamiliesList;

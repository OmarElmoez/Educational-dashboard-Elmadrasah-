import "@/pages/admin/shared/filterForm.css";
import { Button, Select, TextField, MenuItem } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { TFamilyFilterData } from "../List";

const FamiliesFilterForm = ({
  submitFn,
}: {
  submitFn: (data: TFamilyFilterData) => void;
}) => {
  const { register, handleSubmit, control, reset } =
    useForm<TFamilyFilterData>();

  const onSubmit = (data: TFamilyFilterData) => {
    submitFn(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <TextField
        type="text"
        placeholder="الاسم الاول"
        variant="outlined"
        {...register("first_name")}
      />
      <TextField
        type="text"
        placeholder="الاسم الاخير"
        variant="outlined"
        {...register("last_name")}
      />
      <TextField
        type="text"
        placeholder="البريد الإلكترونى"
        variant="outlined"
        {...register("email")}
      />
      <TextField
        type="tel"
        placeholder="رقم الهاتف"
        variant="outlined"
        inputProps={{ dir: "rtl", style: { textAlign: "right" } }}
        {...register("mobile_phone")}
      />
      <Controller
        name="is_active"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
            displayEmpty
            renderValue={(selected) => {
              if (selected === "") {
                return <p style={{ color: "#B6B6B6" }}>الحالة</p>;
              }
              return selected === "true" ? "نشط" : "غير نشط";
            }}
          >
            <MenuItem value="true">نشط</MenuItem>
            <MenuItem value="false">غير نشط</MenuItem>
          </Select>
        )}
      />
      <div className="search-button-container">
        <Button variant="contained" color="primary" type="submit">
          بحث
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            reset();
            submitFn({
              email: "",
              first_name: "",
              last_name: "",
              mobile_phone: null,
              is_active: "",
            });
          }}
        >
          إلغاء
        </Button>
      </div>
    </form>
  );
};
export default FamiliesFilterForm;

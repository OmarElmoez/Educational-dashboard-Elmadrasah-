// FilterForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./balance.module.css";
import React from "react";
import { EMPLOYEE_TYPES, STATUS_OPTIONS } from "@/constants";
import { Dropdown } from "@/components";
import { resetBalancePage } from "@/store/table/TableSlice";
import { useAppDispatch } from "@/store/hooks";
// -------------------------------------------------------------------

const {
  filterForm,
  form_label,
  form_label_p,
  formGroup,
  dateGroup,
  dateInputs,
  dateInput,
  buttonGroup,
} = styles;

const filterSchema = z.object({
  name: z.string().optional(),
  is_active: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  //  ************
  usageStatus: z.string().optional(),
  remainingBalance: z.string().optional(),
  phone: z.string().optional(),
});

export type FilterFormData = z.infer<typeof filterSchema>;

interface FilterFormProps {
  onSubmit: (filters: FilterFormData | null) => void;
}
// -------------------------------------------------------------------

const FilterForm: React.FC<FilterFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      name: "",
      start_date: "",
      end_date: "",
      is_active: "",
      usageStatus: "",
      remainingBalance: "",
      phone: "",
    },
  });

  const dispatch = useAppDispatch();

  const handleSubmitForm = (data: FilterFormData) => {
    dispatch(resetBalancePage());
console.log("data:", data);

    onSubmit(data);
  };

  const handleReset = () => {
    dispatch(resetBalancePage());
    reset();
  };

  return (
    <form className={filterForm} onSubmit={handleSubmit(handleSubmitForm)}>
      <div className={formGroup}>
        <label className={form_label}>الاسم</label>
        <Dropdown
          label=""
          name="name"
          register={register}
          options={STATUS_OPTIONS}
          error={errors.name?.message as string}
        />
        {/* <input type="text" {...register("name")} placeholder="أحمد محمد" /> */}
      </div>

      <div className={formGroup}>
        <label className={form_label}  >رقم الموبايل </label>
        <input {...register("phone")} placeholder="+9716434234232" />
      </div>

      <div className={formGroup}>
        <label className={form_label}>الهاتف المحمول  </label>
        <input {...register("phone")} />
      </div>

      <div className={formGroup}>
        <label className={form_label}>الحالة</label>

        <Dropdown
          label=""
          name="is_active"
          register={register}
          options={STATUS_OPTIONS}
          error={errors.is_active?.message as string}
        />
        {/* <select {...register("is_active")}>
          <option value="">اختر الحالة</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
        </select> */}
      </div>

      <div className={formGroup}>
        <label className={form_label}>حالة الباقة</label>

        <Dropdown
          label=""
          name="usageStatus"
          register={register}
          options={EMPLOYEE_TYPES}
          error={errors.usageStatus?.message as string}
        />

        {/* <select {...register("usageStatus")}>
          <option value="">اختر حالة الباقة</option>
          <option value="used">مستخدمة</option>
          <option value="unused">غير مستخدمة</option>
        </select> */}
      </div>

      <div className={formGroup}>
        <label className={form_label}>الرصيد المتبقي</label>
        <input {...register("remainingBalance")} />
      </div>

      <div className={dateGroup}>
        <label className={form_label}>التاريخ</label>

        <div className={dateInputs}>
          <div className={dateInput}>
            <div style={{ position: "relative" }}>
              <input
                className={form_label_p}
                id="start_date"
                {...register("start_date")}
                placeholder="من"
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="gray"
                width="20"
                height="20"
                style={{
                  position: "absolute",
                  left: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
              </svg>
            </div>
          </div>
          <div className={dateInput}>
            <div style={{ position: "relative" }}>
              <input
                className={form_label_p}
                id="end_date"
                {...register("end_date")}
                placeholder="الى"
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="gray"
                width="20"
                height="20"
                style={{
                  position: "absolute",
                  left: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className={buttonGroup}>
        <button type="submit" className="btn submit-btn">
          تأكيد
        </button>

        <button type="button" onClick={handleReset} className="btn cancel-btn">
          محو التصفية
        </button>
      </div>
    </form>
  );
};

export default FilterForm;

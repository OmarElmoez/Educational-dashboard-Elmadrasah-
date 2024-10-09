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
      end_date: ""
    }
  });

  const dispatch = useAppDispatch();

  const handleSubmitForm = (data: FilterFormData) => {
    console.log("Form submitted:", data);
    dispatch(resetBalancePage());

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
        <input
          {...register("remainingBalance")}
        />
      </div>

      <div className={dateGroup}>
        <label className={form_label}>التاريخ</label>
        <div className={dateInputs}>
          <div className={dateInput}>
            <label className={form_label}>من</label>
            <input type="date"  id="start_date"  {...register("start_date")} />
          </div>

          <div className={dateInput}>
            <label className={form_label}>إلى</label>
            <input type="date" id="end_date"   {...register("end_date")}/>
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

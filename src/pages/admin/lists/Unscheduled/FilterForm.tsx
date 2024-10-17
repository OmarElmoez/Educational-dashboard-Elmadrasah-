// FilterForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "../filterForm.module.css";
import React from "react";
import { STATUS_OPTIONS } from "@/constants";
import { Dropdown } from "@/components";

// -------------------------------------------------------------------

const {
  filterForm,
  form_label,
  form_label_p,
  formGroup,
  dateGroup,
  dateInput,
  buttonGroup,
} = styles;

const filterSchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  service_type: z.string().optional(),
  status: z.string().optional(),
  date: z.string().optional(),
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
      type: "",
      service_type: "",
      status: "",
      date: "",
    },
  });

  const handleSubmitForm = (data: FilterFormData) => {
    console.log("data:", data);

    onSubmit(data);
  };

  const handleReset = () => {
    reset();
  };


  return (
    <form className={filterForm} onSubmit={handleSubmit(handleSubmitForm)}>
      <div className={formGroup}>
        <label className={form_label}>اسم الطالب</label>
        <Dropdown
          label=""
          name="name"
          register={register}
          options={STATUS_OPTIONS}
          error={errors.name?.message as string}
        />
      </div>

      <div className={formGroup}>
        <label className={form_label}>نوع الطالب </label>
        <Dropdown
          label=""
          name="type"
          register={register}
          options={STATUS_OPTIONS}
          error={errors.type?.message as string}
        />
      </div>

      <div className={formGroup}>
        <label className={form_label}>نوع الباقة </label>
        <Dropdown
          label=""
          name="service_type"
          register={register}
          options={STATUS_OPTIONS}
          error={errors.service_type?.message as string}
        />
      </div>

      <div className={dateGroup}>
        <label className={form_label}>التاريخ</label>

          <div className={dateInput}>
            <div style={{ position: "relative" }}>
              <input
                className={form_label_p}
                id="date"
                {...register("date")}
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

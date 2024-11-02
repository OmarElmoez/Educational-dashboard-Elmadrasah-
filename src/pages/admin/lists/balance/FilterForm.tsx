/**
 * Renders a filter form for the balance page in the admin section.
 *
 * The filter form allows the user to filter the balance data by various criteria such as name, phone, email, status, package status, and date range.
 *
 * The form uses the `react-hook-form` library for form management and the `zod` library for form validation.
 *
 * @param {FilterFormProps} props - The props for the FilterForm component.
 * @param {(filters: FilterFormData | null) => void} props.onSubmit - A callback function that is called when the form is submitted with the filtered data.
 * @returns {JSX.Element} - The rendered FilterForm component.
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "../filterForm.module.css";
import React from "react";
import { PACKAGE_STATUS_OPTIONS, STATUS_OPTIONS } from "@/constants";
import { Dropdown, DropdownWithSearch } from "@/components";
import { TOption } from "@/types/Dropdown";
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
  name: z.string().nullable().optional(),
  is_active: z.string().nullable().optional(),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  package_status: z.string().nullable().optional(),
  remaining_credit: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.union([z.string().email(), z.string().nullable()]).optional(),
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
    setValue,
    formState: { errors },
  } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      name: null,
      start_date: null,
      end_date: null,
      is_active: null,
      email: null,
      package_status: null,
      remaining_credit: null,
      phone: null,
    },
  });

  const handleSubmitForm = (data: FilterFormData) => {
    onSubmit(data);
    reset();
    // setSelectedCustomer(null);
  };

  const handleReset = () => {
    reset();
  };

  const handleGetOption = (option: TOption | null) => {
    setValue("name", option?.label);
  };


  return (
    <form className={filterForm} onSubmit={handleSubmit(handleSubmitForm)}>
      <div className={formGroup}>
        <DropdownWithSearch
          register={register}
          name="name"
          setValue={setValue}
          label="الاسم"
          optionsFor="customers"
          handleGetOption={handleGetOption}
          placeholder="اختر الطالب"
        />
      </div>

      <div className={formGroup}>
        <label className={form_label}>رقم الموبايل </label>
        <input {...register("phone")} placeholder="+9716434234232" />
      </div>

      <div className={formGroup}>
        <label className={form_label}> البريد الالكترونى </label>
        <input {...register("email")} />
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
      </div>

      <div className={formGroup}>
        <label className={form_label}>حالة الباقة</label>

        <Dropdown
          label=""
          name="package_status"
          register={register}
          options={PACKAGE_STATUS_OPTIONS}
          error={errors.package_status?.message as string}
        />
      </div>

      <div className={formGroup}>
        <label className={form_label}>الرصيد المتبقي</label>
        <input {...register("remaining_credit")} />
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

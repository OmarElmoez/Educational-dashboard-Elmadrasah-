// FilterForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "../filterForm.module.css";
import React, { useEffect, useState } from "react";
import { SCHEDULED_STATUS_OPTIONS } from "@/constants";
import { Dropdown, DropdownWithSearch } from "@/components";
import { useAppDispatch } from "@/store/hooks";
import { TOption } from "@/types/Dropdown";
import { actGetDropdownOptions } from "@/store/single-actions";

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
  name: z.string().nullable().optional(),
  // type: z.string().nullable().optional(),
  service_name: z.string().nullable().optional(),
  scheduled_status: z.string().nullable().optional(),
  subscription_date: z.string().nullable().optional(),
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
      name: "",
      // type: "",
      service_name: "",
      scheduled_status: "",
      subscription_date: "",
    },
  });

  const handleSubmitForm = (data: FilterFormData) => {
    onSubmit(data);
  };

  const handleReset = () => {
    reset();
  };

  const [servicesList, setServicesList] = useState<TOption[]>([]);


  // customer dropdown
  const [customersList, setCustomersList] = useState<TOption[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      actGetDropdownOptions({ optionsFor: "customers" })
    ).then((res) => {
      if (Array.isArray(res?.payload)) {
        setCustomersList(res.payload);
      }
    });

    dispatch(
      actGetDropdownOptions({ optionsFor: "services" })
    ).then((res) => {
      if (Array.isArray(res?.payload)) {
        setServicesList(res.payload);
      }
    });
  }, [dispatch]);
  const handleGetOption = (option: TOption | null) => {
    setValue("name", option?.label);
  };

  return (
    <form className={filterForm} onSubmit={handleSubmit(handleSubmitForm)}>
      <div className={formGroup}>
        <label className={form_label}>اسم العميل</label>
        <DropdownWithSearch
          register={register}
          name="name"
          setValue={setValue}
          label=""
          options={customersList}
          handleChange={handleGetOption}
          placeholder="اختر العميل"
        />
      </div>

      <div className={formGroup}>
        <label className={form_label}> نوع الباقة </label>
        <Dropdown
          label=""
          name="service_name"
          register={register}
          options={servicesList}
          error={errors.service_name?.message as string}
        />
      </div>

      {/* <div className={formGroup}>
        <label className={form_label}>نوع الباقة </label>
        <Dropdown
          label=""
          name="service_name"
          register={register}
          options={SCHEDULED_STATUS_OPTIONS}
          error={errors.service_name?.message as string}
        />
      </div> */}
      <div className={formGroup}>
        <label className={form_label}> حالة الجدولة </label>
        <Dropdown
          label=""
          name="scheduled_status"
          register={register}
          options={SCHEDULED_STATUS_OPTIONS}
          error={errors.scheduled_status?.message as string}
        />
      </div>

      <div className={dateGroup}>
        <label className={form_label}>التاريخ</label>

          <div className={dateInput}>
            <div style={{ position: "relative" }}>
              <input
                className={form_label_p}
                id="date"
                {...register("subscription_date")}
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

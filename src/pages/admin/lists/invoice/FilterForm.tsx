import React, { useState } from "react";
import istyles from "./invoiceDetails.module.css";
import { TStatus } from "@/types/Dropdown";

// -------------------------------------------------------------------
const { inputBox, formContainer, submitBtn,resetButton } = istyles;

const FILTER_STATUS_OPTIONS = [
  { label: " الجميع", value: "" },
  { label: " فى انتظار الموافقة", value: "Saved" },
  { label: " فى انتظار الدفع", value: "Approved" },
  { label: " مدفوع", value: "Paid" },
  { label: " استبعاد", value: "Void" },
];

interface FilterFormProps {
  onSubmit: (filters: {
    startDate: string;
    endDate: string;
    status: TStatus;
  }| null) => void;
}
// -------------------------------------------------------------------

const FilterForm: React.FC<FilterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    status: "all" as TStatus,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      startDate: "",
      endDate: "",
      status: "all" as TStatus,
    });

    onSubmit(null);
  };

  return (
    <form onSubmit={handleSubmit} className={formContainer}>
      <div className={inputBox}>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          />
      </div>

      <div className={inputBox}>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          {FILTER_STATUS_OPTIONS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button type="submit" className={submitBtn}>
          اذهب
        </button>
        <button type="button" className={resetButton} onClick={handleReset}>
          reset
        </button>
      </div>
    </form>
  );
};

export default FilterForm;

import { useState } from "react";
import styles from "./dropdownWithSearch.module.css";
import { TOption } from "@/types/Dropdown";

const { select_box, popup_box, search_box, options_box } = styles;

const DropdownWithSearch = ({
  options,
  handleChange,
}: {
  options: TOption[];
  handleChange: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TOption | null>(null);

  const handleOptionClick = (option: TOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    handleChange(option.value);
  };

  return (
    <article className="group" style={{ paddingBottom: "1rem" }}>
      <label className={`adminFormLabel`}>اختر العميل</label>
      <section
        className={`select_wrapper ${select_box}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* here will be the selected option */}
        <span>{selectedOption ? selectedOption.label : "اختر"}</span>
      </section>
      {isOpen && (
        <section className={popup_box}>
          <input
            type="search"
            className={`inputField ${search_box}`}
            name=""
            id=""
            placeholder="ابحث عن العميل"
          />
          <div className={options_box}>
            {options.map((option, index) => (
              <span
                key={`${option.value}-${index}`}
                data-value={option.value}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default DropdownWithSearch;

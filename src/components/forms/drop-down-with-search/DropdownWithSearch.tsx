import { useEffect, useState } from "react";
import styles from "./dropdownWithSearch.module.css";
import { TOption } from "@/types/Dropdown";
import { useDebounce } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetDropdownOptions } from "@/store/single-actions";
import { useLocation } from "react-router-dom";

const { select_box, popup_box, search_box, options_box } = styles;

const DropdownWithSearch = ({
  options,
  handleChange,
  label,
  placeholder = "اختر",
  handleGetOption,
  setSelectedCustomer,
  selectedCustomer,
}: {
  options: TOption[];
  label: string;
  placeholder?: string;
  handleChange?: (id: string) => void;
  // to get option as needed option.label not id
  handleGetOption?: (option: TOption | null) => void;
  setSelectedCustomer?: (param: TOption) => void;
  selectedCustomer?: TOption | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TOption | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setsearchResults] = useState<TOption[]>([]);
  const debouncedQuery = useDebounce(searchQuery);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const location = useLocation();
  const isBalanceRoute = location.pathname === "/admin/balance-list";
  

  const handleOptionClick = (option: TOption) => {
    setSelectedOption(option);
    setIsOpen(false);

    if (setSelectedCustomer) {
      setSelectedCustomer(option);
    }

    if (handleChange) {
      handleChange(option.value);
    }
    if (handleGetOption) {
      handleGetOption(option);
    }
  };

  useEffect(() => {
    dispatch(
      actGetDropdownOptions({
        token: user?.token,
        optionsFor: "customersSearch",
        searchQuery: debouncedQuery,
      })
    )
      .unwrap()
      .then((res) => {
        setsearchResults(res);
      });
  }, [debouncedQuery, dispatch, user?.token]);

  return (
    <article className="group">
      <label className={`adminFormLabel`}>{label}</label>
      <section
        className={`select_wrapper ${select_box}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* here will be the selected option */}

        {(isBalanceRoute ? (selectedCustomer) : selectedOption) ? (
          <span>{selectedOption?.label}</span>
        ) : (
          <span className="dropdown-placeholder">{placeholder}</span>
        )}
      </section>
      {isOpen && (
        <section className={popup_box}>
          <input
            type="search"
            className={`inputField ${search_box}`}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            placeholder="ابحث عن العميل"
          />
          <div className={options_box}>
            {(searchResults.length > 0 ? searchResults : options).map(
              (result, index) => (
                <span
                  key={`${result.value}-${index}`}
                  onClick={() => handleOptionClick(result)}
                >
                  {result.label}
                </span>
              )
            )}
          </div>
        </section>
      )}
    </article>
  );
};

export default DropdownWithSearch;

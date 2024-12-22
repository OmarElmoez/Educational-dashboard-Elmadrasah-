/**
 * How to use this component:
 *
 * 1- you pass (register, name, setValue) from (useForm hook) to get the value from the component.
 *
 * 2- you pass (handleChange) if you want to use the (selected option) in another process like (filtration).
 *    - this (handleChange) will give you the whole option (label & value)
 */

import {useEffect, useState} from "react";
import styles from "./dropdownWithSearch.module.css";
import {TOption} from "@/types/Dropdown";
import {useDebounce} from "@/hooks";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {actGetDropdownOptions} from "@/store/single-actions";
import {FieldValues, Path, UseFormRegister} from "react-hook-form";
// import createOptionsFrom from "@/utils/createOptionsFrom.ts";
import {TOptionsFor} from "@/constants/end-points.ts";

const {select_box, popup_box, search_box, options_box} = styles;

const DropdownWithSearch = <T extends FieldValues>({
                                                     handleChange,
                                                     label,
                                                     placeholder = "اختر",
                                                     register,
                                                     name,
                                                     setValue,
  optionsFor,
                                                   }: {
  register: UseFormRegister<T>,
  name: Path<T>,
  setValue: (name: Path<T>, value: string) => void,
  label: string;
  placeholder?: string;
  handleChange?: (option: TOption) => void;
  // to get option as needed option.label not id
  handleGetOption?: (option: TOption | null) => void;
  optionsFor: TOptionsFor
}) => {
  const [options, setOptions] = useState<TOption[]>([])
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TOption | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TOption[]>([]);
  const debouncedQuery = useDebounce(searchQuery);
  const dispatch = useAppDispatch();
  const {credintials: credentials} = useAppSelector((state) => state.auth);


  const handleOptionClick = (option: TOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    setValue(name, option.value);
    if (handleChange) {
      handleChange(option);
    }
  };

  useEffect(() => {
    dispatch(
      actGetDropdownOptions({
        optionsFor,
        searchQuery: debouncedQuery,
      })
    )
      .unwrap()
      .then((res) => {
        setOptions(res);
        setSearchResults(res);
      });
  }, [debouncedQuery, dispatch, credentials?.token, optionsFor]);

  return (
    <article className="group">
      {/* Hidden input for form registration */}
      <input
        {...register(name)}
        type="hidden"
      />
      <label className={`adminFormLabel`}>{label}</label>
      <section
        className={`select_wrapper ${select_box}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? (<span>{selectedOption?.label}</span>) : (
          <span className="dropdown-placeholder">{placeholder}</span>)}
      </section>
      {isOpen && (
        <section className={popup_box}>
          <input
            type="search"
            className={`inputField ${search_box}`}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            placeholder="ابحث"
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

import { useEffect, useState } from "react";
import styles from "./searchSection.module.css";
import { useDebounce } from "@/hooks";
import { useAppDispatch } from "@/store/hooks";
import actSearchForTableData from "@/store/table/act/actSearchForTableData";
import { TABLE_SEARCH_END_POINTS } from "@/constants";

const { searchSection, searchInput, searchBox } = styles;

const SearchSection = ({
  searchFor,
  classNames,
}: {
  searchFor: keyof typeof TABLE_SEARCH_END_POINTS;
  classNames?: string;
}) => {
  const [searchVal, setSearchVal] = useState("");
  const debouncedSearchTerm = useDebounce(searchVal);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      actSearchForTableData({
        searchFor,
        searchTerm: debouncedSearchTerm,
      })
    );
  }, [debouncedSearchTerm, dispatch, searchFor]);

  return (
    <section className={ classNames ? classNames : searchSection}>
      { (!classNames) ? <label className={searchBox}>
        <input
          type="search"
          placeholder="بحث"
          className={searchInput}
          onChange={(e) => setSearchVal(e.target.value)}
          value={searchVal}
        />
      </label> 
      :
       <input
          type="search"
          placeholder="بحث"
          className={searchInput}
          onChange={(e) => setSearchVal(e.target.value)}
          value={searchVal}
        />}
    </section>
  );
};

export default SearchSection;

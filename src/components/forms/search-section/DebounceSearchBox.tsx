import { useEffect, useState } from "react";
import styles from "./searchSection.module.css";
import { useDebounce } from "@/hooks";

const { searchSection, searchInput, searchBox } = styles;

const DebounceSearchBox = ({
  classNames,
  handleSearch,
}: {
  classNames?: string;
  handleSearch:(param: string)=> void;
}) => {
  const [searchVal, setSearchVal] = useState("");
  const debouncedSearchTerm = useDebounce(searchVal);

  useEffect(() => {
    handleSearch(debouncedSearchTerm);

    // eslint-disable-next-line
  }, [debouncedSearchTerm]);

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

export default DebounceSearchBox;

import {useEffect, useState} from "react";
import styles from "./searchSection.module.css";
import {useDebounce} from "@/hooks";

const {searchInput, searchBox} = styles;

const DebounceSearchBox = ({
                             width = 417,
                             handleSearch,
                           }: {
  width?: number;
  handleSearch: (param: string) => void;
}) => {
  const [searchVal, setSearchVal] = useState("");
  const debouncedSearchTerm = useDebounce(searchVal);

  useEffect(() => {
    handleSearch(debouncedSearchTerm);

    // eslint-disable-next-line
  }, [debouncedSearchTerm]);

  return (
    <label className={searchBox} style={{ width: `${width}px` }}>
      <input
        type="search"
        placeholder="بحث"
        className={searchInput}
        onChange={(e) => setSearchVal(e.target.value)}
        value={searchVal}
      />
    </label>
  );
};

export default DebounceSearchBox;

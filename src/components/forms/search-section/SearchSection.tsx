import { useEffect, useState } from "react";
import styles from "./searchSection.module.css";
import { useAppDispatch } from "@/store/hooks";
import actSearchForTableData from "@/store/table/act/actSearchForTableData";
import { TABLE_SEARCH_END_POINTS } from "@/constants";
import {DebounceSearchBox} from "@/components";

const { searchSection } = styles;

const SearchSection = ({
  searchFor,
}: {
  searchFor: keyof typeof TABLE_SEARCH_END_POINTS;
}) => {
  const [searchVal, setSearchVal] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      actSearchForTableData({
        searchFor,
        searchTerm: searchVal,
      })
    );
  }, [searchVal, dispatch, searchFor]);

  return (
    <section className={searchSection}>
      <DebounceSearchBox handleSearch={(str) => setSearchVal(str)} />
    </section>
  );
};

export default SearchSection;

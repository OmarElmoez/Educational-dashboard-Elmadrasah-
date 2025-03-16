import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useState } from "react";
import styles from "./countriesDropdown.module.css";
import { TCountry } from "@/schemas/CountrySchema";
import actGetCities from "@/store/location/act/actGetCities";
import { actGetStates, setChosenRegion } from "@/store/location/LocationSlice";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { useOutsideClick } from "@/hooks";

const { results } = styles;

const CountriesDropdown = <T extends FieldValues>({
  register,
  name,
  setValue,
  error
}: {
  register: UseFormRegister<T>,
  name: Path<T>,
  setValue: (name: Path<T>, value: string) => void,
  error: string
}) => {
  const dispatch = useAppDispatch();

  const [searchVal, setSearchVal] = useState("");
  const [showResults, setShowResults] = useState(false);

  const { countries } = useAppSelector((state) => state.location);

  const filteredCountries = countries.filter((country) =>
    country.translations.ara.common
      .toLowerCase()
      .startsWith(searchVal.toLowerCase())
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    setShowResults(true);
  };

  const chooseCountryHandler = (country: TCountry) => {
    setValue(name, country.name.common);
    setSearchVal(country.translations.ara.common);
    setShowResults(false);
    dispatch(actGetStates({ country: country.name.common }))
      .unwrap()
      .then(() => {
        dispatch(actGetCities({ countryCode: country.cca2 }));
        dispatch(setChosenRegion(country.region));
      });
  };

  const onClickHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setShowResults(true);
  };

  const countriesRef = useOutsideClick(() => setShowResults(false))

  return (
    <article className="group" ref={countriesRef}>
      <label className="adminFormLabel" htmlFor="country">الدولة</label>
      <section className="select_wrapper">
        <input
          type="text"
          {...register(name)}
          id="country"
          value={searchVal}
          onChange={onChangeHandler}
          onClick={onClickHandler}
          className="searchDropdownInput"
          style={{ width: "100%" }}
          placeholder="ابحث عن دولة"
        />
      </section>
      <p className="error">{error}</p>
      {showResults && filteredCountries.length > 0 && (
        <section className={results}>
          {(filteredCountries || countries).map((country) => (
            <div
              key={country.cca2}
              onClick={() => chooseCountryHandler(country)}
            >
              {country.translations.ara.common}
            </div>
          ))}
        </section>
      )}
    </article>
  );
};

export default CountriesDropdown;

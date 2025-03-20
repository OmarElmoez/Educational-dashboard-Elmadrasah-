import { useEffect, useState } from "react";
import "./advancedSearchEmployeesTable.css";
import {
  Drawer,
  Button,
  Select,
  TextField,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetDropdownOptions } from "@/store/single-actions";
import { actGetCountries } from "@/store/location/LocationSlice";
import { actGetStates } from "@/store/location/LocationSlice";
import { TsearchData } from "@/pages/admin/Teachers";
import { Typography } from "@mui/material";

interface LanguageOption {
  key: string;
  value: string;
}

const languages: LanguageOption[] = [
  { key: "ar", value: "اللغة العربية" },
  { key: "en", value: "اللغة الانجليزية" },
  { key: "fr", value: "اللغة الفرنسية" },
];

const AdvancedSearchSection = ({
  handleSearch,
}: {
  handleSearch: ({
    searchDataValues,
  }: {
    searchDataValues?: TsearchData | undefined;
  }) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<
    string | null | undefined
  >(undefined);
  const [activeState, setActiveState] = useState<boolean | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);
  const [hireDateStart, setHireDateStart] = useState<string | null>(null);
  const [hireDateEnd, setHireDateEnd] = useState<string | null>(null);
  const [resignationDateStart, setResignationDateStart] = useState<
    string | null
  >(null);
  const [resignationDateEnd, setResignationDateEnd] = useState<string | null>(
    null
  );
  const [searchDataValues, setSearchDataValues] = useState<TsearchData>();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { subjects } = useAppSelector((state) => state.formSubjects);
  const { countries, states } = useAppSelector((state) => state.location);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    dispatch(actGetDropdownOptions({ optionsFor: "subjects" }));
  }, [dispatch, user?.token]);

  useEffect(() => {
    dispatch(actGetCountries());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCountry) {
      dispatch(actGetStates({ country: selectedCountry }));
    }
  }, [dispatch, selectedCountry]);

  useEffect(() => {
    setSearchDataValues({
      first_name: firstName,
      last_name: lastName,
      email: email,
      subject_choices: selectedSubjectId,
      phone: phoneNumber,
      gender: gender,
      is_active: activeState,
      teacher_language: selectedLanguage.join(","),
      country: selectedCountry,
      state: selectedState,
      hire_date_start: hireDateStart,
      hire_date_end: hireDateEnd,
      resignation_date_start: resignationDateStart,
      resignation_date_end: resignationDateEnd,
    });
  }, [
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    selectedSubjectId,
    activeState,
    selectedLanguage,
    selectedCountry,
    selectedState,
    hireDateStart,
    hireDateEnd,
    resignationDateStart,
    resignationDateEnd,
  ]);

  const handleClearData = () => {
    setFirstName(null);
    setLastName(null);
    setEmail(null);
    setPhoneNumber(null);
    setGender("");
    setSelectedSubjectId(undefined);
    setActiveState(null);
    setSelectedLanguage([]);
    setSelectedCountry("");
    setSelectedState("");
    setHireDateStart(null);
    setHireDateEnd(null);
    setResignationDateStart(null);
    setResignationDateEnd(null);
    setSearchDataValues({
      first_name: firstName,
      last_name: lastName,
      email: email,
      subject_choices: selectedSubjectId,
      phone: phoneNumber,
      gender: gender,
      is_active: activeState,
      teacher_language: selectedLanguage,
      country: selectedCountry,
      state: selectedState,
      hire_date_start: hireDateStart,
      hire_date_end: hireDateEnd,
      resignation_date_start: resignationDateStart,
      resignation_date_end: resignationDateEnd,
    });
  };

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedLanguage(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <div className="search-button">
        <Button onClick={toggleDrawer(true)}>+ بحث متقدم</Button>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <TextField
          id="outlined-basic"
          type="text"
          placeholder="الاسم الاول"
          variant="outlined"
          value={firstName ?? ""}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          type="text"
          placeholder="الاسم الاخير"
          variant="outlined"
          value={lastName ?? ""}
          onChange={(event) => setLastName(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          type="text"
          placeholder="البريد الإلكترونى"
          variant="outlined"
          value={email ?? ""}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          type="number"
          placeholder="رقم الهاتف"
          variant="outlined"
          value={phoneNumber ?? ""}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <Select
          className="subject-select"
          labelId="subject-select-label"
          id="subject-select"
          value={selectedSubjectId ?? ""}
          onChange={(event) => setSelectedSubjectId(event.target.value)}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return <p style={{ color: "#B6B6B6" }}>اختر المادة</p>;
            }
            const selectedSubjectLabel = subjects.find(
              (subject) => subject.value === selected
            )?.label;
            return selectedSubjectLabel || selected;
          }}
        >
          {subjects.map((subject) => (
            <MenuItem key={subject.value} value={subject.value}>
              {subject.label}
            </MenuItem>
          ))}
        </Select>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={selectedCountry ?? ""}
          onChange={(event) => setSelectedCountry(event.target.value)}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return <p style={{ color: "#B6B6B6" }}>اختر الدولة</p>;
            }
            const selectedCountry = countries.find(
              (country) => country.name.common === selected
            );
            return selectedCountry?.translations?.ara?.common || selected;
          }}
        >
          {countries.map((country) => (
            <MenuItem key={country.name.common} value={country.name.common}>
              {country.translations.ara.common}{" "}
            </MenuItem>
          ))}
        </Select>
        <Select
          labelId="subject-select-label"
          id="subject-select"
          value={selectedState ?? ""}
          onChange={(event) => setSelectedState(event.target.value)}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return (
                <p style={{ color: "#B6B6B6" }}>
                  اخترالمحافظة / الامارة / الولاية
                </p>
              );
            }
            const selectedStateCode = states.find(
              (state) => state.state_code === selected
            )?.name;
            return selectedStateCode || selected;
          }}
        >
          {states.map((state) => (
            <MenuItem key={state.state_code} value={state.state_code}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
          displayEmpty
          renderValue={(selected) => {
            if (selected === "") {
              return <p style={{ color: "#B6B6B6" }}>النوع</p>;
            }
            return selected === "Male" ? "ذكر" : "انثى";
          }}
        >
          <MenuItem value={"Male"}>ذكر</MenuItem>
          <MenuItem value={"Female"}>انثى</MenuItem>
        </Select>
        <Select
          labelId="active-state-select-label"
          id="active-state-select"
          value={activeState !== null ? activeState.toString() : ""}
          onChange={(event) => setActiveState(event.target.value === "true")}
          displayEmpty
          renderValue={(selected) => {
            if (selected === "") {
              return <p style={{ color: "#B6B6B6" }}>الحالة</p>;
            }
            return selected === "true" ? "نشط" : "غير نشط";
          }}
        >
          <MenuItem value="true">نشط</MenuItem>
          <MenuItem value="false">غير نشط</MenuItem>
        </Select>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedLanguage}
          onChange={handleChange}
          displayEmpty
          renderValue={(selected) => {
            if ((selected as string[]).length === 0) {
              return <p style={{ color: "#B6B6B6" }}>اللغة</p>;
            }
            return (selected as string[])
              .map((key) => {
                const selectedLanguage = languages.find(
                  (lang) => lang.key === key
                );
                return selectedLanguage ? selectedLanguage.value : key;
              })
              .join(",");
          }}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.key} value={lang.key}>
              <Checkbox checked={selectedLanguage.includes(lang.key)} />
              <ListItemText primary={lang.value} />
            </MenuItem>
          ))}
        </Select>
        <div className="date-range-container">
          <Typography>تاريخ التوظيف</Typography>
          <div className="date-container">
            <TextField
              id="hire-date-start"
              type="date"
              variant="outlined"
              value={hireDateStart ?? ""}
              onChange={(event) => setHireDateStart(event.target.value)}
            />
            {hireDateStart != null ? (
              <>
                <p>الى</p>
                <TextField
                  id="hire-date-end"
                  type="date"
                  variant="outlined"
                  value={hireDateEnd ?? ""}
                  onChange={(event) => setHireDateEnd(event.target.value)}
                  sx={{ textAlign: "right" }}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="date-range-container">
          <Typography>تاريخ الاستقالة</Typography>
          <div className="date-container">
            <TextField
              id="resignation-date-start"
              type="date"
              variant="outlined"
              value={resignationDateStart ?? ""}
              onChange={(event) => setResignationDateStart(event.target.value)}
            />
            {resignationDateStart != null ? (
              <>
                <p>الى</p>
                <TextField
                  required
                  id="resignation-date-end"
                  type="date"
                  variant="outlined"
                  value={resignationDateEnd ?? ""}
                  onChange={(event) =>
                    setResignationDateEnd(event.target.value)
                  }
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="search-button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleSearch({ searchDataValues: searchDataValues });
            }}
          >
            بحث
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              handleClearData();
            }}
          >
            محو البحث
          </Button>
        </div>
      </Drawer>
    </>
  );
};
export default AdvancedSearchSection;

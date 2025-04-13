import { useEffect, useState } from "react";
import "./EmployeesFilterForm.css";
import {
  Button,
  Select,
  TextField,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetDropdownOptions } from "@/store/single-actions";
import { actGetCountries } from "@/store/location/LocationSlice";
import { actGetStates } from "@/store/location/LocationSlice";
import { Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { TEmployeeFilterData } from "../EmployeesList";
import { DateOrTimePicker, Row } from "@/components";
import { useFeedback } from "@/store/context";

const languages: Record<string, string>[] = [
  { key: "ar", value: "اللغة العربية" },
  { key: "en", value: "اللغة الانجليزية" },
  { key: "fr", value: "اللغة الفرنسية" },
];

const EmployeesFilterForm = ({
                               submitFn,
                             }: {
  submitFn: (data: TEmployeeFilterData) => void;
}) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, control, setValue, reset } =
    useForm<TEmployeeFilterData>();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const { user } = useAppSelector((state) => state.auth);
  const { subjects } = useAppSelector((state) => state.formSubjects);
  const { countries, states } = useAppSelector((state) => state.location);

  useEffect(() => {
    dispatch(actGetDropdownOptions({ optionsFor: "subjects" }));
  }, [dispatch, user?.token]);

  useEffect(() => {
    dispatch(actGetCountries());
  }, [dispatch]);

  useEffect(() => {
    console.log("selected country from useEffect: ", selectedCountry);
    if (selectedCountry) {
      dispatch(actGetStates({ country: selectedCountry }));
    }
  }, [dispatch, selectedCountry]);

  const { openFeedbackModal } = useFeedback();

  const onSubmit = (data: TEmployeeFilterData) => {
    const {
      hire_date_start,
      hire_date_end,
      resignation_date_end,
      resignation_date_start,
    } = data;

    if (
      (hire_date_start && !hire_date_end) ||
      (!hire_date_start && hire_date_end)
    ) {
      return openFeedbackModal(
        "failed",
        "تاريخ التوظيف",
        "يجب ادخال التاريخين معا"
      );
    }

    if (
      (resignation_date_start && !resignation_date_end) ||
      (!resignation_date_start && resignation_date_end)
    ) {
      return openFeedbackModal(
        "failed",
        "تاريخ الاستقالة",
        "يجب ادخال التاريخين معا"
      );
    }

    submitFn(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <TextField
        id="outlined-basic"
        type="text"
        placeholder="الاسم الاول"
        variant="outlined"
        {...register("first_name")}
      />
      <TextField
        id="outlined-basic"
        type="text"
        placeholder="الاسم الاخير"
        variant="outlined"
        {...register("last_name")}
      />
      <TextField
        id="outlined-basic"
        type="text"
        placeholder="البريد الإلكترونى"
        variant="outlined"
        {...register("email")}
      />
      <TextField
        id="outlined-basic"
        type="number"
        placeholder="رقم الهاتف"
        variant="outlined"
        {...register("phone")}
      />
      <Controller
        name="subject"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
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
        )}
      />
      <Controller
        name="country"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
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
              <MenuItem
                key={country.name.common}
                value={country.name.common}
                onClick={() => setSelectedCountry(country.name.common)}
              >
                {country.translations.ara.common}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <Controller
        name="state"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <p style={{ color: "#B6B6B6" }}>
                    اختر المحافظة / الامارة / الولاية
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
        )}
      />
      <Controller
        name="gender"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
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
        )}
      />
      <Controller
        name="is_active"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
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
        )}
      />
      <Controller
        name="teacher_language"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <Select
            multiple
            displayEmpty
            {...field}
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
                <Checkbox checked={(field.value || []).includes(lang.key)} />
                <ListItemText primary={lang.value} />
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <Typography className="label">تاريخ التوظيف</Typography>
      <Row style={{ gap: "1.6rem", marginBottom: "0" }}>
        <DateOrTimePicker
          setValue={setValue}
          label="من"
          register={register}
          name="hire_date_start"
          error=""
          style={{ alignSelf: "flex-end", paddingBottom: "0" }}
        />

        <DateOrTimePicker
          setValue={setValue}
          label="الى"
          register={register}
          name="hire_date_end"
          error=""
          style={{ alignSelf: "flex-end", paddingBottom: "0" }}
        />
      </Row>
      <Typography className="label" sx={{ marginTop: "0.5rem" }}>
        تاريخ الاستقالة
      </Typography>
      <Row style={{ gap: "1.6rem", marginBottom: "0" }}>
        <DateOrTimePicker
          setValue={setValue}
          label="من"
          register={register}
          name="resignation_date_start"
          error=""
          style={{ alignSelf: "flex-end", paddingBottom: "1.6rem" }}
        />

        <DateOrTimePicker
          setValue={setValue}
          label="الى"
          register={register}
          name="resignation_date_end"
          error=""
          style={{ alignSelf: "flex-end", paddingBottom: "1.6rem" }}
        />
      </Row>
      <div className="search-button-container">
        <Button variant="contained" color="primary" type="submit">
          بحث
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            reset()
            submitFn({
              first_name: "",
              last_name: "",
              email: "",
              phone: "",
              subject: "",
              country: "",
              state: "",
              gender: "",
              is_active: "",
              teacher_language: [],
              hire_date_start: "",
              hire_date_end: "",
              resignation_date_start: "",
              resignation_date_end: "",
            });
          }}
        >
          إلغاء
        </Button>
      </div>
    </form>
  );
};
export default EmployeesFilterForm;

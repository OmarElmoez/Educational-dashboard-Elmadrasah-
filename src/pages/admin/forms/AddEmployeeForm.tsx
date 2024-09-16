import {
  CountriesDropdown,
  Dropdown,
  Heading,
  MultiChoices,
  PhoneField,
  Row,
  UploadFile,
} from "@/components";
import { InputField } from "@/components";
import {
  EMPLOYEE_STATUS,
  EMPLOYEE_TITLES,
  EMPLOYEE_TYPES,
  TIMEZONES_OPTIONS,
} from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetCountries } from "@/store/location/LocationSlice";
import {
  AddEmployeeSchema,
  TAddEmployeeFormData,
} from "@/schemas/AddEmployeeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import formatCities from "@/utils/formatCities";
import formatStates from "@/utils/formatStates";

const AddEmployeeForm = () => {
  const dispatch = useAppDispatch();
  const { countries, cities, states, chosenState, chosenRegion } =
    useAppSelector((state) => state.location);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<TAddEmployeeFormData>({
    mode: "onBlur",
    resolver: zodResolver(AddEmployeeSchema),
  });

  const onSubmit = (data: TAddEmployeeFormData) => {
    // Turn the string value of is_active into a boolean
    data["is_active"] = data["is_active"] === "true";

    // Remove the 0 digit from the phone number
    const enteredPhoneParts = data["phone"].split(" ");
    let firstPartOfNumber = enteredPhoneParts[1];
    if (firstPartOfNumber[0] === "0") {
      firstPartOfNumber = firstPartOfNumber.slice(1);
      enteredPhoneParts[1] = firstPartOfNumber;
    }
    data["phone"] = enteredPhoneParts.join("");

    // Add region to timezone value
    data["timezone"] = `${chosenRegion}/${data["timezone"]}`;
    console.log(data);
  };

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(actGetCountries());
    }
  }, [dispatch, countries]);

  const formattedCities = formatCities(cities, chosenState);

  const formattedStates = formatStates(states);

  return (
    <form action="post" onSubmit={handleSubmit(onSubmit)}>
      <Heading text="نوع الموظف" />
      <Row>
        <Dropdown
          label="اختار نوع الموظف"
          name="employee_type"
          register={register}
          options={EMPLOYEE_TYPES}
          error={errors.employee_type?.message as string}
        />

        <Dropdown
          label="الحالة"
          name="is_active"
          register={register}
          options={EMPLOYEE_STATUS}
          error={errors.is_active?.message as string}
        />
      </Row>

      <Row>
        <InputField
          label="الأسم الأول"
          placeholder="الأسم الأول"
          register={register}
          name="first_name"
          error={errors.first_name?.message as string}
        />

        <InputField
          label="الأسم الأخير"
          placeholder="الأسم الأخير"
          register={register}
          name="last_name"
          error={errors.last_name?.message as string}
        />
      </Row>

      <Row>
        <InputField
          label="الأسم بالكامل"
          placeholder="الأسم بالكامل"
          register={register}
          name="full_name"
          error={errors.full_name?.message as string}
        />
      </Row>

      <Row>
        <Dropdown
          label="اللقب"
          register={register}
          options={EMPLOYEE_TITLES}
          name="title"
          error={errors.title?.message as string}
        />

        <InputField
          label="البريد الإلكتروني"
          placeholder="البريد الإلكتروني"
          register={register}
          name="email"
          error={errors.email?.message as string}
        />
      </Row>

      <Row>
        <PhoneField
          control={control as any}
          error={errors.phone?.message as string}
          label="الهاتف المحمول"
        />

        <InputField
          label="هاتف المنزل"
          type="tel"
          register={register}
          name="home_phone"
          placeholder="071453343"
          error={errors.home_phone?.message as string}
        />
      </Row>

      <Row>
        <InputField
          label="العنوان"
          placeholder="الرياض / السعودية"
          register={register}
          name="address"
          error={errors.address?.message as string}
        />

        <InputField
          label="عنوان أخر"
          placeholder="الرياض / السعودية"
          register={register}
          name="address_2"
          error={errors.address_2?.message as string}
        />
      </Row>

      <Row>
        <CountriesDropdown
          name="country"
          register={register}
          setValue={setValue}
          error={errors.country?.message as string}
        />

        <Dropdown
          label="الولاية/المحافظة"
          name="state"
          register={register}
          options={formattedStates}
          error={errors.state?.message as string}
        />
      </Row>

      <Row>
        <Dropdown
          label="المدينة"
          name="city"
          register={register}
          options={formattedCities}
          error={errors.city?.message as string}
        />

        <Dropdown
          label="التوقيت الزمني"
          name="timezone"
          options={TIMEZONES_OPTIONS}
          register={register}
          error={errors.timezone?.message as string}
        />
      </Row>

      <Row>
        <InputField
          label="الرمز البريدي"
          placeholder="232322+"
          register={register}
          name="zip"
          error={errors.zip?.message as string}
        />

        <InputField
          label="معلومات إضافية"
          placeholder="اكتب معلوماتك الإضافية"
          register={register}
          name="additional_notes"
          error={errors.additional_notes?.message as string}
          textarea
        />
      </Row>

      <Row>
        <InputField
          label="تاريخ الميلاد"
          placeholder="يوم / شهر / سنه"
          type="date"
          register={register}
          name="birth_date"
          error={errors.birth_date?.message as string}
        />

        <InputField
          label="مكان الميلاد"
          placeholder="مكان الميلاد"
          register={register}
          name="place_of_birth"
          error={errors.place_of_birth?.message as string}
        />
      </Row>

      <hr className="hr" />

      <Heading text="المرفقات" />

      <Row>
        <UploadFile
          label="إضافة صورة شخصية"
          name="uploaded_pp"
          control={control}
          register={register}
          setValue={setValue}
          fileTypes={["images"]}
          error={errors.uploaded_pp?.message as string}
        />

        <UploadFile
          label="إضافة السيرة الذاتية"
          name="uploaded_cv"
          control={control}
          register={register}
          setValue={setValue}
          fileTypes={["pdfs", "word"]}
          error={errors.uploaded_cv?.message as string}
        />
      </Row>

      <Row>
        <UploadFile
          label="إضافة الرقم  القومي"
          name="uploaded_id"
          control={control}
          register={register}
          setValue={setValue}
          fileTypes={["images"]}
          error={errors.uploaded_id?.message as string}
        />

        <InputField
          label="تاريخ الانتهاء"
          placeholder="يوم / شهر / سنه"
          type="date"
          register={register}
          name="national_id_expiration_date"
          error={errors.national_id_expiration_date?.message as string}
        />
      </Row>

      <Row>
        <UploadFile
          label="إضافة جواز السفر"
          name="uploaded_passport"
          control={control}
          register={register}
          setValue={setValue}
          fileTypes={["images"]}
          error={errors.uploaded_passport?.message as string}
        />

        <InputField
          label="تاريخ الانتهاء"
          placeholder="يوم / شهر / سنه"
          type="date"
          register={register}
          name="passport_expiration_date"
          error={errors.passport_expiration_date?.message as string}
        />
      </Row>

      <hr className="hr" />

      <Heading text='المواد' />

      <Row>
        <MultiChoices register={register} name="subjects" control={control} />

        <article className="group"></article>
      </Row>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddEmployeeForm;

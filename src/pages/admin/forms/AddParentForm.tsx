import {
  CountriesDropdown,
  Dropdown,
  Heading,
  PhoneField,
  Row,
} from "@/components";
import { InputField } from "@/components";
import { EMPLOYEE_TITLES, TIMEZONES_OPTIONS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetCountries } from "@/store/location/LocationSlice";
import { TAddParentFormData, AddParentSchema } from "@/schemas/AddParentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import formatCities from "@/utils/formatCities";
import formatStates from "@/utils/formatStates";
import { STATUS_OPTIONS } from "@/constants/dropdown-options";
import { NotificationForm } from "@/components/mini-forms";
import actSendDataToServer from "@/store/single-actions/actSendDataToServer";
// -------------------------------------------------------------------------

const AddParentForm = () => {
  const dispatch = useAppDispatch();

  const { countries, cities, states, chosenState, chosenRegion } =
    useAppSelector((state) => state.location);

  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TAddParentFormData>({
    mode: "onBlur",
    resolver: zodResolver(AddParentSchema),
  });

  const onSubmit = (data: TAddParentFormData) => {
    data['customer_type'] = 'family';

    const enteredPhoneParts = data["mobile_phone"].split(" ");
    let firstPartOfNumber = enteredPhoneParts[1];
    if (firstPartOfNumber[0] === "0") {
      firstPartOfNumber = firstPartOfNumber.slice(1);
      enteredPhoneParts[1] = firstPartOfNumber;
    }
    data["mobile_phone"] = enteredPhoneParts.join("");

    // Add region to timezone value
    data["time_zone"] = `${chosenRegion}/${data["time_zone"]}`;

    dispatch(
      actSendDataToServer({
        token: user?.token,
        purpose: "add_family",
        formData: data,
      })
    ).unwrap().then(() => {
      console.log("Parent added successfully");
    });
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
      <Heading text="إضافة عائلة جديدة" />
      <Heading text="معلومات الاتصال" />

      <Row>
        <Dropdown
          label="الحالة"
          name="status"
          register={register}
          options={STATUS_OPTIONS}
          error={errors.status?.message as string}
        />

        <Dropdown
          label="اللقب"
          register={register}
          options={EMPLOYEE_TITLES}
          name="salutation"
          error={errors.salutation?.message as string}
        />
      </Row>

      <Row>
        <InputField
          label="الأسم الأول"
          isRequired
          placeholder="الأسم الأول"
          register={register}
          name="first_name"
          error={errors.first_name?.message as string}
        />

        <InputField
          label="الأسم الأخير"
          isRequired
          placeholder="الأسم الأخير"
          register={register}
          name="last_name"
          error={errors.last_name?.message as string}
        />
      </Row>

      <Row>
        <InputField
          label="الأسم بالكامل"
          isRequired
          placeholder="الأسم بالكامل"
          register={register}
          name="full_name"
          error={errors.full_name?.message as string}
        />
      </Row>

      <Row>
        <InputField
          label="البريد الإلكتروني"
          isRequired
          placeholder="البريد الإلكتروني"
          register={register}
          name="email"
          error={errors.email?.message as string}
        />
      </Row>

      <Row>
        <PhoneField
          control={control as any}
          name="mobile_phone"
          error={errors.mobile_phone?.message as string}
          isRequired
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
        <PhoneField
          control={control as any}
          error={errors.work_phone?.message as string}
          name="work_phone"
          label="هاتف العمل"
        />

        <InputField
          label="العنوان"
          placeholder="الرياض / السعودية"
          register={register}
          name="address"
          error={errors.address?.message as string}
        />
      </Row>

      <Row>
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
          isRequired
          name="time_zone"
          options={TIMEZONES_OPTIONS}
          register={register}
          error={errors.time_zone?.message as string}
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

        {/* ***************************** اضافة جهات اتصال ************************** */}
        <InputField
          label="معلومات إضافية"
          placeholder="اكتب معلوماتك الإضافية"
          register={register}
          name="additional_notes"
          error={errors.additional_notes?.message as string}
          textarea
        />
      </Row>

      <hr className="hr" />

      <NotificationForm
        register={register}
        sms_lesson_reminders="sms_lesson_reminders"
        email_lesson_reminders="email_lesson_reminders"
        whatsapp_reminders="whatsapp_reminders"
        app_reminders="app_reminders"
        web_reminders="web_reminders"
        send_welcome_email="send_welcome_email"
        user_account="user_account"
        errors={errors}
      />

      <hr className="hr" />

      <div className="flex-end">
        <button type="submit" className="btn submit-btn">
          حفظ
        </button>

        <button
          type="button"
          onClick={() => {
            reset();
          }}
          className="btn cancel-btn"
        >
          يلغى
        </button>
      </div>
    </form>
  );
};

export default AddParentForm;

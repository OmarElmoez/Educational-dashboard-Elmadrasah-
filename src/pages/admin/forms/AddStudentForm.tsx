import {
  ColorField,
  CountriesDropdown,
  Dropdown,
  Heading,
  MultiChoices,
  PhoneField,
  Row,
} from "@/components";
import { InputField } from "@/components";
import { EMPLOYEE_TITLES, TIMEZONES_OPTIONS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetCountries } from "@/store/location/LocationSlice";
import {
  AddStudentSchema,
  TAddStudentFormData,
} from "@/schemas/AddStudentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import formatCities from "@/utils/formatCities";
import formatStates from "@/utils/formatStates";
import { SERVICE_OPTIONS, STATUS_OPTIONS } from "@/constants/dropdown-options";
import { NotificationForm } from "@/components/mini-forms";
import { actGetDropdownOptions } from "@/store/single-actions";
import { TOption } from "@/types/Dropdown";
import { format } from "date-fns";
import actSendDataToServer from "@/store/single-actions/actSendDataToServer";

// -------------------------------------------------------------------------

const AddStudentForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { countries, cities, states, chosenState } = useAppSelector(
    (state) => state.location
  );

  const [locationOptions, setLocationOptions] = useState<TOption[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TAddStudentFormData>({
    mode: "onBlur",
    resolver: zodResolver(AddStudentSchema),
  });

  const onSubmit = (data: TAddStudentFormData) => {
    const enteredPhoneParts = data["mobile_phone"].split(" ");
    let firstPartOfNumber = enteredPhoneParts[1];
    if (firstPartOfNumber[0] === "0") {
      firstPartOfNumber = firstPartOfNumber.slice(1);
      enteredPhoneParts[1] = firstPartOfNumber;
    }
    data["mobile_phone"] = enteredPhoneParts.join("");

    data.students_attributes.birth_date = format(
      data.students_attributes.birth_date || "",
      "yyyy-MM-dd"
    );
    data.students_attributes.start_date = format(
      data.students_attributes.start_date || "",
      "yyyy-MM-dd"
    );

    data.students_attributes.first_name = data.first_name;
    data.students_attributes.last_name = data.last_name;
    data.students_attributes.email = data.email;
    data.students_attributes.mobile_phone = data.mobile_phone;

    const serverData = {
      ...data,
      customer_type: "individual",
    };

    dispatch(
      actSendDataToServer({
        token: user?.token,
        purpose: "add_individual_student",
        formData: serverData,
      })
    )
      .unwrap()
      .then(() => {
        console.log("Student added successfully");
      });
  };

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(actGetCountries());
    }
  }, [dispatch, countries]);

  useEffect(() => {
    dispatch(
      actGetDropdownOptions({ token: user?.token, optionsFor: "locations" })
    )
      .unwrap()
      .then((data) => {
        setLocationOptions(data);
      });
  }, [dispatch, user?.token]);

  const formattedCities = formatCities(cities, chosenState);

  const formattedStates = formatStates(states);

  const [curriculumOptions, setCurriculumOptions] = useState<TOption[]>([]);

  useEffect(() => {
    dispatch(
      actGetDropdownOptions({ token: user?.token, optionsFor: "curriculums" })
    )
      .unwrap()
      .then((res) => {
        setCurriculumOptions(res);
      });
  }, [dispatch, user?.token]);

  return (
    <form action="post" onSubmit={handleSubmit(onSubmit)}>
      <Heading text="إضافة طالب جديد مستقل" />
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

        <InputField
          label="البريد الإلكتروني أخر"
          isRequired
          placeholder="البريد الإلكتروني أخر"
          register={register}
          name="additional_email"
          error={errors.additional_email?.message as string}
        />
      </Row>

      <Row>
        <PhoneField
          name="mobile_phone"
          control={control as any}
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

        <CountriesDropdown
          name="country"
          register={register}
          setValue={setValue}
          error={errors.country?.message as string}
        />
      </Row>

      <Row>
        <Dropdown
          label="الولاية/المحافظة"
          name="state"
          register={register}
          options={formattedStates}
          error={errors.state?.message as string}
        />

        <Dropdown
          label="المدينة"
          name="city"
          register={register}
          options={formattedCities}
          error={errors.city?.message as string}
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
        <Dropdown
          label="التوقيت الزمني"
          isRequired
          name="time_zone"
          options={TIMEZONES_OPTIONS}
          register={register}
          error={errors.time_zone?.message as string}
        />
      </Row>
      <hr className="hr" />
      <Heading text="تفاصيل الطالب " />

      <Row>
        <InputField
          type="date"
          label="تاريخ الميلاد "
          placeholder=" يوم / شهر / سنه"
          register={register}
          name="students_attributes.birth_date"
          error={errors.students_attributes?.birth_date?.message as string}
        />

        <InputField
          type="date"
          label="تاريخ البدء"
          placeholder="يوم / شهر / سنه"
          register={register}
          name="students_attributes.start_date"
          error={errors.students_attributes?.start_date?.message as string}
        />
      </Row>

      <Row>
        <InputField
          label="المدرسة "
          placeholder=" المدرسة"
          register={register}
          name="students_attributes.school"
          error={errors.students_attributes?.school?.message as string}
        />

        <InputField
          label="الصف/السنة"
          placeholder="الصف/السنة"
          register={register}
          name="students_attributes.grade"
          error={errors.students_attributes?.grade?.message as string}
        />
      </Row>

      <Row>
        {/* <MultiChoices
          register={register}
          name="students_attributes.student_curriculum"
          keyName="student_curriculum"
          error={
            errors.students_attributes?.student_curriculum?.message as string
          }
        /> */}

        <Dropdown
          label="المنهج الدراسي"
          name="students_attributes.student_curriculum"
          register={register}
          options={curriculumOptions}
          error={
            errors.students_attributes?.student_curriculum?.message as string
          }
        />

        <MultiChoices
          register={register}
          name="students_attributes.subject_choices"
          keyName="subject_choices"
          error={errors.students_attributes?.subject_choices?.message as string}
        />
      </Row>

      <Row>
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
        <MultiChoices
          register={register}
          name="students_attributes.initial_services"
          keyName="initial_services"
          error={
            errors.students_attributes?.initial_services?.message as string
          }
        />

        <Dropdown
          label=" رابط دخول الحصة"
          register={register}
          options={locationOptions}
          name="students_attributes.initial_location"
          error={
            errors.students_attributes?.initial_location?.message as string
          }
        />
      </Row>

      <Row>
        <MultiChoices
          register={register}
          name="students_attributes.initial_teachers"
          keyName="initial_teachers"
          error={
            errors.students_attributes?.initial_teachers?.message as string
          }
        />

        <ColorField
          label="لون التقويم"
          register={register}
          setValue={setValue}
          name="students_attributes.calendar_color"
          error={errors.students_attributes?.calendar_color?.message as string}
        />
      </Row>
      <hr className="hr" />
      <Heading text=" تفاصيل الفاتورة" />
      <Row>
        <Dropdown
          label="طريقة الدفع"
          name="students_attributes.billing_method"
          register={register}
          options={SERVICE_OPTIONS}
          error={errors.students_attributes?.billing_method?.message as string}
        />

        <InputField
          label=" خصم الطالب %"
          placeholder="اكتب الخصم"
          register={register}
          name="students_attributes.student_cost"
          error={errors.students_attributes?.student_cost?.message as string}
        />
      </Row>

      <NotificationForm
        register={register}
        sms_lesson_reminders="sms_lesson_reminders"
        email_lesson_reminders="email_lesson_reminders"
        whatsapp_reminders="whatsapp_reminders"
        app_reminders="app_reminders"
        web_reminders="web_reminders"
        // send_welcome_email="send_welcome_email"
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
          className="btn"
        >
          يلغى
        </button>
      </div>
    </form>
  );
};

export default AddStudentForm;

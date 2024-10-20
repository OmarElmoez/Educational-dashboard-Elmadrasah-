import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CircleLoadingIndecator,
  ColorField,
  CountriesDropdown,
  Dropdown,
  Heading,
  MultiChoices,
  PhoneField,
  Row,
} from "@/components";
import { InputField } from "@/components";
import { NotificationForm } from "@/components/mini-forms";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetCountries } from "@/store/location/LocationSlice";
import { actGetDropdownOptions, actSendDataToServer } from "@/store/single-actions";
import { useFeedback } from "@/store/context";
import {
  AddStudentSchema,
  TAddStudentFormData,
  TAddStudentFormDataForServer,
} from "@/schemas/AddStudentSchema";
import { TOption } from "@/types/Dropdown";
import { EMPLOYEE_TITLES, TIMEZONES_OPTIONS } from "@/constants";
import { SERVICE_OPTIONS, STATUS_OPTIONS } from "@/constants/dropdown-options";
import formatCities from "@/utils/formatCities";
import formatStates from "@/utils/formatStates";

// -------------------------------------------------------------------------

const AddStudentForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { countries, cities, states, chosenState } = useAppSelector(
    (state) => state.location
  );

  const { openFeedbackModal } = useFeedback();

  const [locationOptions, setLocationOptions] = useState<TOption[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
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

    const serverData: TAddStudentFormDataForServer = {
      ...data,
      is_superuser: false,
      customer_type: "individual",
      students_attributes: {
        student_type: "individual",
        student_curriculum: Number(data.student_curriculum),
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        mobile_phone: data.mobile_phone,
        birth_date: data?.birth_date || null,
        start_date: data?.start_date || null,
        school: data.school,
        grade: data.grade,
        additional_notes: data.additional_notes,
        calendar_color: data.calendar_color,
        status: data["status"] === "true",
        billing_method: data.billing_method,
        student_cost: data.student_cost,
        initial_services: data["initial_services"]?.map((student) =>
          parseInt(student)
        ),
        initial_teachers: data["initial_teachers"]?.map((student) =>
          parseInt(student)
        ),
        initial_location: Number(data["initial_location"]),
      },
    };

    dispatch(
      actSendDataToServer({
        purpose: "add_individual_student",
        formData: serverData,
      })
    )
      .unwrap()
      .then(() => {
        openFeedbackModal("succeeded", "تم اضافة الطالب بنجاح!");
      })
      .catch((error) => {
        openFeedbackModal("failed", "حدثت مشكلة أثناء إرسال طلبك.", error);
      });
  };

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(actGetCountries());
    }
  }, [dispatch, countries]);

  useEffect(() => {
    dispatch(
      actGetDropdownOptions({ optionsFor: "locations" })
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
      actGetDropdownOptions({ optionsFor: "curriculums" })
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
          name="birth_date"
          error={errors.birth_date?.message as string}
        />

        <InputField
          type="date"
          label="تاريخ البدء"
          placeholder="يوم / شهر / سنه"
          register={register}
          name="start_date"
          error={errors.start_date?.message as string}
        />
      </Row>

      <Row>
        <InputField
          label="المدرسة "
          placeholder=" المدرسة"
          register={register}
          name="school"
          error={errors.school?.message as string}
        />

        <InputField
          label="الصف/السنة"
          placeholder="الصف/السنة"
          register={register}
          name="grade"
          error={errors.grade?.message as string}
        />
      </Row>

      <Row>
        {/* <MultiChoices
          register={register}
          name="student_curriculum"
          keyName="student_curriculum"
          error={
            errors.student_curriculum?.message as string
          }
        /> */}

        <Dropdown
          label="المنهج الدراسي"
          name="student_curriculum"
          register={register}
          options={curriculumOptions}
          error={errors.student_curriculum?.message as string}
        />

        <MultiChoices
          register={register}
          name="subject_choices"
          error={errors.subject_choices?.message as string}
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
          name="initial_services"
          error={errors.initial_services?.message as string}
        />

        <Dropdown
          label=" رابط دخول الحصة"
          register={register}
          options={locationOptions}
          name="initial_location"
          error={errors.initial_location?.message as string}
        />
      </Row>

      <Row>
        <MultiChoices
          register={register}
          name="initial_teachers"
          error={errors.initial_teachers?.message as string}
        />

        <ColorField
          label="لون التقويم"
          register={register}
          setValue={setValue}
          name="calendar_color"
          error={errors.calendar_color?.message as string}
        />
      </Row>
      <hr className="hr" />
      <Heading text=" تفاصيل الفاتورة" />
      <Row>
        <Dropdown
          label="طريقة الدفع"
          name="billing_method"
          register={register}
          options={SERVICE_OPTIONS}
          error={errors.billing_method?.message as string}
        />

        <InputField
          label=" خصم الطالب %"
          placeholder="اكتب الخصم"
          register={register}
          name="student_cost"
          error={errors.student_cost?.message as string}
        />
      </Row>

      <NotificationForm
        register={register}
      />

      <hr className="hr" />

      <div className="submit-buttons-container">
        <button type="submit" className="btn submit-btn">
          {isSubmitting ? (
            <CircleLoadingIndecator size={16} color="#fff" />
          ) : (
            " حفظ"
          )}
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

export default AddStudentForm;

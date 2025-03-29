import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ColorField,
  CountriesDropdown,
  DateOrTimePicker,
  Dropdown,
  InputField,
  LoadingIndicator,
  MultiChoices,
  PhoneField,
  Row,
} from "@/components";
import { Heading } from "@/components/UI";
import { NotificationForm } from "@/components/mini-forms";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetCountries } from "@/store/location/LocationSlice";
import { actGetDropdownOptions, actSendDataToServer } from "@/store/single-actions";
import { useFeedback } from "@/store/context";
import { AddStudentSchema, TAddStudentFormData, TAddStudentFormDataForServer, } from "@/schemas/AddStudentSchema";
import { TOption } from "@/types/Dropdown";
import { EMPLOYEE_TITLES, TIMEZONES_OPTIONS } from "@/constants";
import { SERVICE_OPTIONS, STATUS_OPTIONS } from "@/constants/dropdown-options";
import formatCities from "@/utils/formatCities";
import formatStates from "@/utils/formatStates";
import { TLoading } from "@/types/shared.ts";
import removeLeadingZero from "./utils/removeLeadingZero.ts";

// -------------------------------------------------------------------------

const AddStudentForm = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state) => state.auth);

  const {countries, cities, states, chosenState} = useAppSelector(
    (state) => state.location
  );

  const {openFeedbackModal} = useFeedback();

  const [locationOptions, setLocationOptions] = useState<TOption[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
    setValue,
    reset,
  } = useForm<TAddStudentFormData>({
    mode: "onBlur",
    resolver: zodResolver(AddStudentSchema),
  });

  const [loading, setLoading] = useState<TLoading>('idle')

  const onSubmit = async (data: TAddStudentFormData) => {
    setLoading('pending')
    setRemovePreviewChoices(false)

    const processedData = {
      ...data,
      mobile_phone: removeLeadingZero(data['mobile_phone']),
      user_account: data['status'] === 'true'
    }

    const serverData: TAddStudentFormDataForServer = {
      ...processedData,
      is_superuser: false,
      customer_type: "individual",
      students_attributes: {
        student_type: "individual",
        student_curriculum: Number(processedData.student_curriculum),
        first_name: processedData.first_name,
        last_name: processedData.last_name,
        email: processedData.email,
        mobile_phone: processedData.mobile_phone,
        birth_date: processedData?.birth_date || null,
        start_date: processedData?.start_date || null,
        school: processedData.school,
        grade: processedData.grade,
        additional_notes: processedData.additional_notes,
        calendar_color: processedData.calendar_color,
        status: processedData["status"] === "true",
        billing_method: processedData.billing_method,
        student_cost: processedData.student_cost,
        initial_services: processedData["initial_services"]?.map((student) =>
          parseInt(student)
        ),
        initial_teachers: processedData["initial_teachers"]?.map((student) =>
          parseInt(student)
        ),
        initial_location: Number(processedData["initial_location"]),
      },
    };

    try {
      const res = await dispatch(actSendDataToServer({
        purpose: "add_individual_student",
        formData: serverData,
      }))
      .unwrap()

      if (typeof res === 'string') {
        setLoading('failed')
        openFeedbackModal('failed', "حدثت مشكلة أثناء إرسال طلبك.");
        return;
      }

      setLoading('succeeded')
      openFeedbackModal("succeeded", "تم اضافة الطالب بنجاح!");
      reset()
      setRemovePreviewChoices(true)

    } catch (error) {
      openFeedbackModal("failed", error as string);
      setLoading('failed')
    }
  };

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(actGetCountries());
    }
  }, [dispatch, countries]);

  useEffect(() => {
    dispatch(
      actGetDropdownOptions({optionsFor: "locations", searchQuery: ''})
    )
    .unwrap()
    .then((data) => {
      setLocationOptions(data);
    });
  }, [dispatch, user?.token]);

  const formattedCities = formatCities(cities, chosenState);

  const formattedStates = formatStates(states);

  const [curriculumOptions, setCurriculumOptions] = useState<TOption[]>([]);

  const [removePreviewChoices, setRemovePreviewChoices] = useState(false)

  useEffect(() => {
    dispatch(
      actGetDropdownOptions({optionsFor: "curriculums"})
    )
    .unwrap()
    .then((res) => {
      setCurriculumOptions(res);
    });
  }, [dispatch, user?.token]);

  return (
    <>
      {loading === 'pending' && <div className="loadingBox">
          <LoadingIndicator/>
      </div>}
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <Heading text="معلومات الاتصال"/>

        <Row>
          <Dropdown
            label="الحالة"
            name="status"
            register={register}
            options={STATUS_OPTIONS}
            error={errors.status?.message as string}
            removePreviewChoices={removePreviewChoices}
          />

          <Dropdown
            label="اللقب"
            register={register}
            options={EMPLOYEE_TITLES}
            name="salutation"
            error={errors.salutation?.message as string}
            removePreviewChoices={removePreviewChoices}
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
            removePreviewChoices={removePreviewChoices}
          />
        </Row>

        <Row>
          <Dropdown
            label="الولاية/المحافظة"
            name="state"
            register={register}
            options={formattedStates}
            error={errors.state?.message as string}
            removePreviewChoices={removePreviewChoices}
          />

          <Dropdown
            label="المدينة"
            name="city"
            register={register}
            options={formattedCities}
            error={errors.city?.message as string}
            removePreviewChoices={removePreviewChoices}
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
            removePreviewChoices={removePreviewChoices}
          />
        </Row>
        <hr className="hr"/>
        <Heading text="تفاصيل الطالب "/>

        <Row>
          <DateOrTimePicker
            setValue={setValue}
            label="تاريخ الميلاد"
            register={register}
            name="birth_date"
            error={errors.birth_date?.message as string}
            removePreviewChoices={removePreviewChoices}
          />

          <DateOrTimePicker
            setValue={setValue}
            label="تاريخ البدء"
            register={register}
            name="start_date"
            error={errors.start_date?.message as string}
            removePreviewChoices={removePreviewChoices}
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
            removePreviewChoices={removePreviewChoices}
          />

          <MultiChoices
            register={register}
            name="subject_choices"
            error={errors.subject_choices?.message as string}
            removePreviewChoices={removePreviewChoices}
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
            removePreviewChoices={removePreviewChoices}
          />

          <Dropdown
            label=" رابط دخول الحصة"
            register={register}
            options={locationOptions}
            name="initial_location"
            error={errors.initial_location?.message as string}
            removePreviewChoices={removePreviewChoices}
          />
        </Row>

        <Row>
          <MultiChoices
            register={register}
            name="initial_teachers"
            error={errors.initial_teachers?.message as string}
            removePreviewChoices={removePreviewChoices}
          />

          <ColorField
            label="لون التقويم"
            register={register}
            setValue={setValue}
            name="calendar_color"
            error={errors.calendar_color?.message as string}
          />
        </Row>
        <hr className="hr"/>
        <Heading text=" تفاصيل الفاتورة"/>
        <Row>
          <Dropdown
            label="طريقة الدفع"
            name="billing_method"
            register={register}
            options={SERVICE_OPTIONS}
            error={errors.billing_method?.message as string}
            removePreviewChoices={removePreviewChoices}
          />

          <InputField
            label=" خصم الطالب %"
            placeholder="اكتب الخصم"
            register={register}
            name="student_cost"
            error={errors.student_cost?.message as string}
          />
        </Row>

        <hr className="hr"/>

        <NotificationForm
          register={register}
        />


        <div className="submit-buttons-container">
          <button type="submit" className="btn submit-btn">
            حفظ
          </button>

          <button
            type="button"
            onClick={() => {
              reset();
              setRemovePreviewChoices(true)
            }}
            className="btn cancel-btn"
          >
            إلغاء
          </button>
        </div>
      </form>
    </>
  );
};

export default AddStudentForm;

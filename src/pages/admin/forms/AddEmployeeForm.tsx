import {
  AddNewSubjectModal,
  CircleLoadingIndecator,
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
  STATUS_OPTIONS,
  EMPLOYEE_TITLES,
  EMPLOYEE_TYPES,
  INITIAL_CALENDAR_COLOR,
  TIMEZONES_OPTIONS,
} from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetCountries } from "@/store/location/LocationSlice";
import {
  AddEmployeeSchema,
  TAddEmployeeFormData,
  TAddEmployeeFormDataForServer,
} from "@/schemas/AddEmployeeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import formatCities from "@/utils/formatCities";
import formatStates from "@/utils/formatStates";
import {
  DAYS_OPTIONS,
  WAGE_TYPES,
  WORK_WAGE_TYPES,
} from "@/constants/dropdown-options";
import { TModalRef } from "@/types/shared";
import {
  CalendarSettingsForm,
  NotificationForm,
} from "@/components/mini-forms";
import CloseButton from "@/assets/close-button.svg?react";
import actSendDataToServer from "@/store/single-actions/actSendDataToServer";
import { actGetDropdownOptions } from "@/store/single-actions";
import { useFeedback } from "@/store/context";

const AddEmployeeForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { countries, cities, states, chosenState, chosenRegion } =
    useAppSelector((state) => state.location);

  const { openFeedbackModal } = useFeedback();

  // const [choices, setChoices] = useState<TOption[]>([]);
  const { subjects } = useAppSelector((state) => state.formSubjects);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<TAddEmployeeFormData>({
    mode: "onBlur",
    resolver: zodResolver(AddEmployeeSchema),
    defaultValues: {
      availabilities: [
        { day: "", start_time: "", end_time: "", description: "" },
      ], // Start with one entry
      calendar_color: INITIAL_CALENDAR_COLOR,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "availabilities",
  });

  const handleAdd = () => {
    append({ start_time: "", end_time: "", description: "" });
  };
  const handleRemove = (index: number) => {
    remove(index); // Removes field at the specified index
  };

  const onSubmit = (data: TAddEmployeeFormData) => {
    // Remove the 0 digit from the phone number
    const enteredPhoneParts = data["phone"].split(" ");
    let firstPartOfNumber = enteredPhoneParts[1];
    if (firstPartOfNumber[0] === "0") {
      firstPartOfNumber = firstPartOfNumber.slice(1);
      enteredPhoneParts[1] = firstPartOfNumber;
    }
    data["phone"] = enteredPhoneParts.join("");

    data["is_superuser"] = false;

    // Add region to timezone value
    data["time_zone"] = `${chosenRegion}/${data["time_zone"]}`;

    const serverData: TAddEmployeeFormDataForServer = {
      ...data,
      default_subject: parseInt(data["default_subject"]),
      subject_choices: data["subject_choices"].map((subject) =>
        parseInt(subject)
      ),
      initial_students: data["initial_students"].map((student) =>
        parseInt(student)
      ),
      is_active: data["is_active"] === "true",
    };

    dispatch(
      actSendDataToServer({
        token: user?.token,
        formData: serverData,
        hasFiles: true,
        purpose: "add_employee",
      })
    )
      .unwrap()
      .then(() => {
        openFeedbackModal("succeeded", "تم اضافة الموظف بنجاح!");
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
      actGetDropdownOptions({ token: user?.token, optionsFor: "subjects" })
    );
  }, [dispatch, user?.token]);

  const formattedCities = formatCities(cities, chosenState);

  const formattedStates = formatStates(states);
  const addNewSubjectRef = useRef<TModalRef>(null);

  return (
    <>
      <AddNewSubjectModal ref={addNewSubjectRef} />
      <form onSubmit={handleSubmit(onSubmit)}>
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
            options={STATUS_OPTIONS}
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
            name="phone"
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

        <Heading text="المواد" />

        <Row>
          <MultiChoices
            register={register}
            name="subject_choices"
            error={errors.subject_choices?.message as string}
          />

          <article className="group"></article>
        </Row>

        <hr className="hr" />

        <Heading text="تفاصيل التوظيف" />

        <Row>
          <InputField
            label="مُسمي"
            placeholder="مُعلم العلوم"
            register={register}
            name="position"
            error={errors.position?.message as string}
          />

          <InputField
            label="تاريخ التوظيف"
            type="date"
            placeholder="يوم / شهر / سنه"
            register={register}
            name="hire_date"
            error={errors.hire_date?.message as string}
          />
        </Row>

        <Row>
          <Dropdown
            label="نوع أجر الدرس"
            name="wage_type"
            register={register}
            options={WAGE_TYPES}
            error={errors.wage_type?.message as string}
          />

          {watch("wage_type") === "wage" ? (
            <InputField
              label="معدل الأجر"
              placeholder="معدل الأجر"
              register={register}
              name="employee_wage"
              error={errors.employee_wage?.message as string}
            />
          ) : (
            <article className="group"></article>
          )}
        </Row>

        <Row>
          <Dropdown
            label="نوع الأجر غير التدريسي"
            name="work_wage_type"
            register={register}
            options={WORK_WAGE_TYPES}
            error={errors.work_wage_type?.message as string}
          />

          {watch("work_wage_type") === "wage" ? (
            <InputField
              label="معدل الأجر"
              placeholder="معدل الأجر"
              register={register}
              name="work_wage"
              error={errors.work_wage?.message as string}
            />
          ) : (
            <article className="group"></article>
          )}
        </Row>

        <Row>
          <Dropdown
            label="الموضوع"
            name="default_subject"
            isWithPopup
            register={register}
            options={subjects}
            subjectRef={addNewSubjectRef}
            error={errors.default_subject?.message as string}
          />

          <InputField
            label="معلومات إضافية"
            placeholder="اكتب معلوماتك الإضافية"
            register={register}
            name="bio"
            error={errors.bio?.message as string}
            textarea
          />
        </Row>

        <hr className="hr" />

        <Heading text="مواقيت العمل" />
        <div>
          {fields.map((field, index) => (
            <Row key={field.id} style={{ alignItems: "center" }}>
              <Dropdown
                label="حدد اليوم"
                isRequired
                name={`availabilities.${index}.day`} // Pass name separately
                options={DAYS_OPTIONS}
                register={register} // Pass the entire register function
                error={errors?.availabilities?.[index]?.day?.message as string}
              />

              <InputField
                label="وقت البدء"
                placeholder="03:00 "
                type="time"
                name={`availabilities.${index}.start_time`} // Pass name separately
                register={register} // Pass the entire register function
                error={
                  errors?.availabilities?.[index]?.start_time?.message as string
                }
              />

              <InputField
                label="وقت الانتهاء"
                placeholder="03:00 "
                type="time"
                name={`availabilities.${index}.end_time`} // Pass name separately
                register={register} // Pass the entire register function
                error={
                  errors?.availabilities?.[index]?.end_time?.message as string
                }
              />

              <InputField
                label="تفاصيل أخرى"
                placeholder="03:00 "
                type="text"
                name={`availabilities.${index}.description`} // Pass name separately
                register={register} // Pass the entire register function
                error={
                  errors?.availabilities?.[index]?.description
                    ?.message as string
                }
              />

              {index > 0 ? (
                <div className="mainContainer">
                  <button type="button" onClick={() => handleRemove(index)}>
                    <CloseButton />
                  </button>
                  <button
                    className="add-action-btn mr-1"
                    type="button"
                    onClick={handleAdd}
                  >
                    + إضافة مواقيت عمل
                  </button>
                </div>
              ) : (
                <div style={{ alignItems: "center" }}>
                  <button
                    className="add-action-btn"
                    type="button"
                    onClick={handleAdd}
                  >
                    + إضافة مواقيت عمل
                  </button>
                </div>
              )}
            </Row>
          ))}

          <br />
          <span className="helper-text">
            * تتوفر المواعيد حسب المنطقة الزمنية للموظفين \ أدخل مدى توفر الموظف
            بشكل عام هنا.
          </span>
          <span className="helper-text">
            يمكن حظر عدم التوفر في الحالات الفردية مباشرةً على التقويم. سيتم عرض
            مدى توفر الموظف على التقويم
          </span>
        </div>

        <hr className="hr" />

        <Heading text="رابط موقع المعلم" />

        <Row>
          <InputField
            label="رابط الموقع URL"
            placeholder="https//test.com"
            type="url"
            register={register}
            name="link"
            error={errors.link?.message as string}
          />

          <article className="group"></article>
        </Row>

        <hr className="hr" />

        <Heading text="الطلاب المعينون" />

        <Row>
          <MultiChoices
            register={register}
            name="initial_students"
            error={errors.initial_students?.message as string}
          />

          <article className="group"></article>
        </Row>

        <hr className="hr" />

        <CalendarSettingsForm
          register={register}
          errors={errors}
          setValue={setValue}
        />

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
        <button type="submit" className="btn submit-btn">
          {isSubmitting ? (
            <CircleLoadingIndecator size={16} color="#fff" />
          ) : (
            " حفظ"
          )}
        </button>
        <button
          type="button"
          className="btn cancel-btn"
          onClick={() => console.log(errors)}
        >
          check
        </button>
      </form>
    </>
  );
};

export default AddEmployeeForm;

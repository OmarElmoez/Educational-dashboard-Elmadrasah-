import {
  AddNewSubjectModal,
  CountriesDropdown,
  Dropdown,
  DropdownWithSearch,
  InputField, LoadingIndicator,
  MultiChoices,
  PhoneField,
  Row,
  SingleCheckbox,
  UploadFile,
} from "@/components";
import { Heading } from "@/components/UI";
import {
  EMPLOYEE_TITLES,
  EMPLOYEE_TYPES,
  INITIAL_CALENDAR_COLOR,
  RADIO_FIELDS_FOR_CALENDAR,
  STATUS_OPTIONS,
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
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import formatCities from "@/utils/formatCities";
import formatStates from "@/utils/formatStates";
import { DAYS_OPTIONS, WAGE_TYPES, WORK_WAGE_TYPES, } from "@/constants/dropdown-options";
import { TLoading, TModalRef } from "@/types/shared";
import { CalendarSettingsForm, NotificationForm, } from "@/components/mini-forms";
import CloseButton from "@/assets/close-button.svg?react";
import {
  actGetDropdownOptions,
  actSendDataToServer,
} from "@/store/single-actions";
import { useFeedback } from "@/store/context";
import removeLeadingZero from "./utils/removeLeadingZero.ts";

const InitialWageState = {
  wage_type: "",
  work_wage_type: "",
}

const AddEmployeeForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { countries, cities, states, chosenState } =
    useAppSelector((state) => state.location);

  const { openFeedbackModal } = useFeedback();

  const { subjects } = useAppSelector((state) => state.formSubjects);

  const [removePreviewChoices, setRemovePreviewChoices] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<TAddEmployeeFormData>({
    mode: "onBlur",
    resolver: zodResolver(AddEmployeeSchema),
    defaultValues: {
      availabilities: [
        { day: "", start_time: "", end_time: "", description: "" },
      ], // Start with one entry
      calendar_color: INITIAL_CALENDAR_COLOR,
      subject_choices: [],
      initial_students: [],
      groups_id: [],
      user_permissions_id: [],
      initial_location: "",
      wage_type: "",
      work_wage_type: "",
      default_subject: null,
      employee_wage: "",
      work_wage: "",
    },
  });

  const isTeacher = watch("include_as_teacher");

  const [employeeType, setEmployeeType] = useState("")

  const [wage, setWage] = useState(InitialWageState)

  const ONLY_STAFF = !isTeacher && employeeType === "Staff"

  const { fields, append, remove } = useFieldArray({
    control,
    name: "availabilities",
  });

  const handleAdd = () => {
    append({ start_time: "", end_time: "", description: "" });
  };
  const handleRemove = (index: number) => {
    remove(index);
  };

  const [loading, setLoading] = useState<TLoading>('idle')

  const onSubmit = async (data: TAddEmployeeFormData) => {
    setLoading('pending')
    setRemovePreviewChoices(false)
    if (
      (isTeacher || data.employee_type === "Teacher") &&
      (data.initial_students.length === 0 || data.subject_choices.length === 0)
    ) {
      return openFeedbackModal(
        "warning",
        "اذا كان الموظف معلم يجب اختيار المواد والطلاب المعنيين"
      );
    }
    if (data.employee_type === "Staff") {
      data.availabilities = [];
    }

    const processedData = {
      ...data,
      phone: removeLeadingZero(data['phone']),
      calendar_color_by: data.calendar_color_by ?? "",
      calendar_setting: data.calendar_setting ?? "",
      is_superuser: false,
    }

    const serverData: TAddEmployeeFormDataForServer = {
      ...processedData,
      default_subject: processedData["default_subject"]
        ? parseInt(processedData["default_subject"])
        : null,
      subject_choices: processedData["subject_choices"] ? processedData["subject_choices"].map((subject) =>
        parseInt(subject)
      ) : [],
      initial_students: processedData["initial_students"] ? processedData["initial_students"].map((student) =>
        parseInt(student)
      ) : [],
      is_active: processedData["is_active"] === "true",
      user_permissions_id: processedData["user_permissions_id"]
        ? processedData["user_permissions_id"].map((item) => Number(item))
        : [],
      groups_id: processedData["groups_id"]
        ? processedData["groups_id"].map((item) => Number(item))
        : [],
    };

    try {
      const res = await dispatch(
        actSendDataToServer({
          formData: serverData,
          hasFiles: true,
          purpose: "add_employee",
        })
      )
      .unwrap()

      if (typeof res === 'string') {
        setLoading('failed')
        openFeedbackModal('failed', res);
        return;
      }

      setLoading('succeeded')
      openFeedbackModal("succeeded", "تم اضافة الموظف بنجاح!");
      reset()
      setRemovePreviewChoices(true)
      setWage(InitialWageState)
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
    dispatch(actGetDropdownOptions({ optionsFor: "subjects" }));
  }, [dispatch, user?.token]);

  const formattedCities = formatCities(cities, chosenState);

  const formattedStates = formatStates(states);
  const addNewSubjectRef = useRef<TModalRef>(null);


  return (
    <>
      {loading === 'pending' && <div className="loadingBox">
          <LoadingIndicator/>
      </div>}
      <AddNewSubjectModal ref={addNewSubjectRef} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading text="نوع الموظف" />

        <Row>
          <Dropdown
            label="اختار نوع الموظف"
            name="employee_type"
            register={register}
            options={EMPLOYEE_TYPES}
            isRequired
            error={errors.employee_type?.message as string}
            handleChange={(val) => setEmployeeType(val)}
          >
            {employeeType === "Staff" && (
              <SingleCheckbox
                register={register}
                name="include_as_teacher"
                label="تضمين كمعلم"
                error={errors.include_as_teacher?.message as string}
              />
            )}
          </Dropdown>
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
            isRequired
            register={register}
            name="first_name"
            error={errors.first_name?.message as string}
          />

          <InputField
            label="الأسم الأخير"
            placeholder="الأسم الأخير"
            isRequired
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
            isRequired
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
            isRequired
            error={errors.title?.message as string}
          />

          <InputField
            label="البريد الإلكتروني"
            placeholder="البريد الإلكتروني"
            isRequired
            register={register}
            name="email"
            error={errors.email?.message as string}
          />
        </Row>

        <Row>
          <PhoneField
            control={control}
            name="phone"
            isRequired
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
            isRequired
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
            isRequired
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

        <span className="mainContainer">
          <Heading text="المرفقات" />{" "}
          <span
            className="required"
            style={{ position: "relative", top: "0px" }}
          ></span>
        </span>

        <Row>
          <UploadFile
            label="إضافة صورة شخصية"
            name="uploaded_pp"
            control={control}
            register={register}
            setValue={setValue}
            fileTypes={["images"]}
            error={errors.uploaded_pp?.message as string}
            removePreviewChoices={removePreviewChoices}
          />

          <UploadFile
            label="إضافة السيرة الذاتية"
            name="uploaded_cv"
            control={control}
            register={register}
            setValue={setValue}
            fileTypes={["pdfs", "word"]}
            error={errors.uploaded_cv?.message as string}
            removePreviewChoices={removePreviewChoices}
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
            removePreviewChoices={removePreviewChoices}
          />

          <InputField
            label="تاريخ الانتهاء"
            placeholder="يوم / شهر / سنه"
            type="date"
            register={register}
            name="national_id_expiration_date"
            error={errors.national_id_expiration_date?.message as string}
            style={{alignSelf: 'flex-end'}}
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
            removePreviewChoices={removePreviewChoices}
          />

          <InputField
            label="تاريخ الانتهاء"
            placeholder="يوم / شهر / سنه"
            type="date"
            register={register}
            name="passport_expiration_date"
            error={errors.passport_expiration_date?.message as string}
            style={{alignSelf: 'flex-end'}}
          />
        </Row>

        <hr className="hr" />

        <Heading text="المواد" />

        <Row>
          <MultiChoices
            register={register}
            name="subject_choices"
            isRequired
            disabled={ONLY_STAFF}
            error={errors.subject_choices?.message as string}
            removePreviewChoices={removePreviewChoices}
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
            disabled={ONLY_STAFF}
            error={errors.wage_type?.message as string}
            handleChange={(val) => setWage((prev) => ({
              ...prev,
              wage_type: val,
            }))}
          />

          {wage.wage_type === "wage" ? (
            <InputField
              label="معدل الأجر"
              placeholder="معدل الأجر"
              register={register}
              name="employee_wage"
              disabled={ONLY_STAFF}
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
            disabled={ONLY_STAFF}
            error={errors.work_wage_type?.message as string}
            handleChange={(val) => setWage((prev) => ({
              ...prev,
              work_wage_type: val,
            }))}
          />

          {wage.work_wage_type === "wage" ? (
            <InputField
              label="معدل الأجر"
              placeholder="معدل الأجر"
              register={register}
              name="work_wage"
              disabled={ONLY_STAFF}
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
            disabled={ONLY_STAFF}
            register={register}
            options={subjects}
            subjectRef={addNewSubjectRef}
            error={errors.default_subject?.message as string}
          />
          {/*<DropdownWithSearch label="الموضوع" name="default_subject" register={register} optionsFor="subjects"*/}
          {/*                    setValue={setValue}/>*/}
          {/*<p>{subjects.map(item => item.label)}</p>*/}
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
        <>
          {fields.map((field, index) => (
            <Row key={field.id} style={{ alignItems: "center" }}>
              <Dropdown
                label="حدد اليوم"
                isRequired
                disabled={ONLY_STAFF}
                name={`availabilities.${index}.day`} // Pass name separately
                options={DAYS_OPTIONS}
                register={register} // Pass the entire register function
                error={errors?.availabilities?.[index]?.day?.message as string}
              />

              <InputField
                label="وقت البدء"
                placeholder="03:00 "
                type="time"
                disabled={!isTeacher && employeeType === "Staff"}
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
                disabled={ONLY_STAFF}
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
                disabled={!isTeacher && employeeType === "Staff"}
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
        </>

        <hr className="hr" />
        <Heading text="رابط موقع المعلم" />
        <Row>
          {/*<InputField*/}
          {/*  label="رابط الموقع URL"*/}
          {/*  placeholder="https//test.com"*/}
          {/*  type="url"*/}
          {/*  register={register}*/}
          {/*  name="link"*/}
          {/*  disabled={!isTeacher && employeeType === "Staff"}*/}
          {/*  error={errors.link?.message as string}*/}
          {/*/>*/}

          <DropdownWithSearch label="الموقع الأفتراضي" name="initial_location" register={register}
                              optionsFor="locations"
                              resetOption={removePreviewChoices}
                              setValue={setValue}/>

          <article className="group"></article>
        </Row>

        <hr className="hr" />

        <Heading text="الطلاب المعينون" />

        <Row>
          <MultiChoices
            register={register}
            name="initial_students"
            disabled={ONLY_STAFF}
            error={errors.initial_students?.message as string}
            removePreviewChoices={removePreviewChoices}
          />

          <article className="group"></article>
        </Row>

        <hr className="hr" />

        <CalendarSettingsForm
          register={register}
          errors={errors}
          setValue={setValue}
          disabled={ONLY_STAFF}
          fields={RADIO_FIELDS_FOR_CALENDAR}
        />

        <NotificationForm register={register} />

        <hr className="hr" />

        <Heading text="إضافة صلاحيات" />
        <Row>
          <MultiChoices
            register={register}
            name="groups_id"
            isRequired
            error={errors.groups_id?.message as string}
            removePreviewChoices={removePreviewChoices}
            position="relative"
          />
          <article className="group"></article>
        </Row>

        <hr className="hr" />

        <Heading text="إضافة صلاحيات خاصة" />
        <Row>
          <MultiChoices
            register={register}
            name="user_permissions_id"
            isRequired
            error={errors.user_permissions_id?.message as string}
            removePreviewChoices={removePreviewChoices}
            position="relative"
          />
          <article className="group"></article>
        </Row>

        <div className="submit-buttons-container">
          <button type="submit" className="btn submit-btn">
               حفظ
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              setRemovePreviewChoices(true);
              setWage(InitialWageState)
            }}
            className="btn cancel-btn"
          >
            يلغى
          </button>
        </div>
      </form>
    </>
  );
};

export default AddEmployeeForm;

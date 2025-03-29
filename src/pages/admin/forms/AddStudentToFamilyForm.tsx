import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFeedback } from "@/store/context";
import {
  ColorField,
  Dropdown,
  InputField,
  MultiChoices,
  PhoneField,
  Row,
  LoadingIndicator, DateOrTimePicker,
} from "@/components";
import { Heading } from "@/components/UI";
import { NotificationForm } from "@/components/mini-forms";
import BasicModal from "@/components/add-new-subject-model/BasicModal";
import {
  AddStudentToFamilySchema,
  TAddStudentToFamilyFormData,
  TAddStudentToFamilyFormDataForServer,
} from "@/schemas/AddStudentToFamilySchema";
import { TOption } from "@/types/Dropdown";
import { TLoading, TModalRef } from "@/types/shared";
import {
  TIMEZONES_OPTIONS,
  SERVICE_OPTIONS,
  STATUS_OPTIONS,
  INITIAL_CALENDAR_COLOR,
} from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetCountries } from "@/store/location/LocationSlice";
import {
  actGetDropdownOptions,
  actSendDataToServer,
} from "@/store/single-actions";
import AddParentForm from "./AddParentForm";
import removeLeadingZero from "./utils/removeLeadingZero.ts";
// -------------------------------------------------------------------------

const AddStudentToFamilyForm = () => {
  const dispatch = useAppDispatch();
  const { credintials } = useAppSelector((state) => state.auth);
  const { openFeedbackModal } = useFeedback();

  const { countries } = useAppSelector((state) => state.location);

  const [locationOptions, setLocationOptions] = useState<TOption[]>([]);
  const [curriculumOptions, setCurriculumOptions] = useState<TOption[]>([]);
  const [familiesList, setFamiliesList] = useState<TOption[]>([]);
  const [loading, setLoading] = useState<TLoading>('idle')
  const [removePreviewChoices, setRemovePreviewChoices] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TAddStudentToFamilyFormData>({
    mode: "onBlur",
    resolver: zodResolver(AddStudentToFamilySchema),
    defaultValues: {
      calendar_color: INITIAL_CALENDAR_COLOR,
    },
  });

  const onSubmit = async (data: TAddStudentToFamilyFormData) => {
    setLoading('pending')
    setRemovePreviewChoices(false)

    const processedData = {
      ...data,
      mobile_phone: removeLeadingZero(data['mobile_phone']),
      is_superuser: false,
    }

    const serverData: TAddStudentToFamilyFormDataForServer = {
      ...processedData,
      student_type: "child",
      status: processedData["status"] === "true",
      subject_choices: processedData["subject_choices"]?.map((subject) =>
        parseInt(subject)
      ),
      initial_services: processedData["initial_services"]?.map((service) =>
        parseInt(service)
      ),
      initial_teachers: processedData["initial_teachers"]?.map((teacher) =>
        parseInt(teacher)
      ),
    };

    try {
      const res = await dispatch(
        actSendDataToServer({
          purpose: "add_family_student",
          formData: serverData,
        })
      )
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
      actGetDropdownOptions({ optionsFor: "locations" })
    )
      .unwrap()
      .then((data) => setLocationOptions(data));

    dispatch(
      actGetDropdownOptions({ optionsFor: "curriculums" })
    )
      .unwrap()
      .then((data) => setCurriculumOptions(data));

    dispatch(
      actGetDropdownOptions({ optionsFor: "families" })
    )
      .unwrap()
      .then((data) => setFamiliesList(data));
  }, [dispatch, credintials?.token]);

  const addNewFamilyRef = useRef<TModalRef>(null);

  return (
    <>
      {loading === 'pending' && <div className="loadingBox">
          <LoadingIndicator/>
      </div>}
      <BasicModal ref={addNewFamilyRef} headerText="">
        <AddParentForm />
      </BasicModal>

      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <Heading text="تفاصيل العائلة " />

        {/* ********************* Add Family upd options ************************* */}
        <Row>
          <Dropdown
            label="العائلة"
            name="customer"
            register={register}
            options={familiesList}
            isWithPopup
            subjectRef={addNewFamilyRef}
            error={errors.customer?.message as string}
            removePreviewChoices={removePreviewChoices}
          />
        </Row>
        <Row>
          <Dropdown
            label="الحالة"
            name="status"
            register={register}
            options={STATUS_OPTIONS}
            error={errors.status?.message as string}
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

        {/* <Row>
        <InputField
          label="الأسم بالكامل"
          isRequired
          placeholder="الأسم بالكامل"
          register={register}
          name="full_name"
          error={errors.full_name?.message as string}
        />
      </Row> */}

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

        <hr className="hr" />
        <Heading text="تفاصيل الطالب " />

        <Row>
          <Dropdown
            label="التوقيت الزمني"
            isRequired
            name="time_zone"
            options={TIMEZONES_OPTIONS}
            register={register}
            error={errors.time_zone?.message as string}
            removePreviewChoices={removePreviewChoices}
          />

          <DateOrTimePicker
            setValue={setValue}
            label="تاريخ الميلاد"
            register={register}
            name="birth_date"
            error={errors.birth_date?.message as string}
            isRequired
            removePreviewChoices={removePreviewChoices}
          />
        </Row>

        <Row>
          <DateOrTimePicker
            setValue={setValue}
            label="تاريخ البدء"
            register={register}
            name="start_date"
            error={errors.start_date?.message as string}
            removePreviewChoices={removePreviewChoices}
          />

          <InputField
            label="المدرسة "
            placeholder=" المدرسة"
            register={register}
            name="school"
            error={errors.school?.message as string}
          />
        </Row>

        <Row>
          <InputField
            label="الصف/السنة"
            placeholder="الصف/السنة"
            register={register}
            name="grade"
            error={errors.grade?.message as string}
          />
          {/* <MultiChoices
          register={register}
          name="student_curriculum"
          keyName="student_curriculum"
          error={errors.student_curriculum?.message as string}
        /> */}

          <Dropdown
            label="منهج الطالب"
            register={register}
            options={curriculumOptions}
            name="student_curriculum"
            error={errors.student_curriculum?.message as string}
            removePreviewChoices={removePreviewChoices}
          />
        </Row>

        <Row>
          <MultiChoices
            register={register}
            name="subject_choices"
            error={errors.subject_choices?.message as string}
            removePreviewChoices={removePreviewChoices}
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
          <MultiChoices
            register={register}
            name="initial_services"
            error={errors.initial_services?.message as string}
            removePreviewChoices={removePreviewChoices}
          />

          <Dropdown
            label="رابط دخول الحصة"
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
        <hr className="hr" />
        <Heading text=" تفاصيل الفاتورة" />
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

        <NotificationForm register={register} />

        <hr className="hr" />

        <div className="submit-buttons-container">
          <button type="submit" className="btn submit-btn">حفظ</button>

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

export default AddStudentToFamilyForm;

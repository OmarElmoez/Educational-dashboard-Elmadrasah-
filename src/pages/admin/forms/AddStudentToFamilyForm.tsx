import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { format } from "date-fns";
import { useFeedback } from "@/store/context";
import {
  ColorField,
  Dropdown,
  InputField,
  MultiChoices,
  PhoneField,
  Row,
  CircleLoadingIndecator,
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
import { TModalRef } from "@/types/shared";
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
// -------------------------------------------------------------------------

const AddStudentToFamilyForm = () => {
  const dispatch = useAppDispatch();
  const { credintials } = useAppSelector((state) => state.auth);
  const { openFeedbackModal } = useFeedback();

  const { countries } = useAppSelector((state) => state.location);

  const [locationOptions, setLocationOptions] = useState<TOption[]>([]);
  const [curriculumOptions, setCurriculumOptions] = useState<TOption[]>([]);
  const [familiesList, setFamiliesList] = useState<TOption[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<TAddStudentToFamilyFormData>({
    mode: "onBlur",
    resolver: zodResolver(AddStudentToFamilySchema),
    defaultValues: {
      calendar_color: INITIAL_CALENDAR_COLOR,
    },
  });

  const onSubmit = (data: TAddStudentToFamilyFormData) => {
    const enteredPhoneParts = data["mobile_phone"].split(" ");
    let firstPartOfNumber = enteredPhoneParts[1];
    if (firstPartOfNumber[0] === "0") {
      firstPartOfNumber = firstPartOfNumber.slice(1);
      enteredPhoneParts[1] = firstPartOfNumber;
    }
    data["mobile_phone"] = enteredPhoneParts.join("");

    data["is_superuser"] = false;

    // data.birth_date = format(data.birth_date || "", "yyyy-MM-dd");
    // data.start_date = format(data.start_date || "", "yyyy-MM-dd");

    const serverData: TAddStudentToFamilyFormDataForServer = {
      ...data,
      student_type: "child",
      status: data["status"] === "true",
      subject_choices: data["subject_choices"]?.map((subject) =>
        parseInt(subject)
      ),
      initial_services: data["initial_services"]?.map((service) =>
        parseInt(service)
      ),
      initial_teachers: data["initial_teachers"]?.map((teacher) =>
        parseInt(teacher)
      ),
    };

    dispatch(
      actSendDataToServer({
        purpose: "add_family_student",
        formData: serverData,
      })
    )
      .unwrap()
    .then((res) => {
      if (typeof res === 'string') {
        openFeedbackModal('failed', "حدثت مشكلة أثناء إرسال طلبك.");
        return;
      }
      openFeedbackModal("succeeded", "تم اضافة الطالب بنجاح!");
      reset()
      setRemovePreviewChoices(true)
    })
      .catch((error) => {
        openFeedbackModal("failed", error);
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

  const [removePreviewChoices, setRemovePreviewChoices] = useState(false)

  return (
    <>
      <BasicModal ref={addNewFamilyRef} headerText="">
        <AddParentForm />
      </BasicModal>

      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <Heading text="إضافة طالب جديد للعائلة " />
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
          />
        </Row>
        <Row>
          <Dropdown
            label="الحالة"
            name="status"
            register={register}
            options={STATUS_OPTIONS}
            error={errors.status?.message as string}
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
          />
          <InputField
            type="date"
            isRequired
            label="تاريخ الميلاد "
            placeholder=" يوم / شهر / سنه"
            register={register}
            name="birth_date"
            error={errors.birth_date?.message as string}
          />
        </Row>

        <Row>
          <InputField
            type="date"
            label="تاريخ البدء"
            placeholder="يوم / شهر / سنه"
            register={register}
            name="start_date"
            error={errors.start_date?.message as string}
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
            label="رابط دخول الحصة "
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
              setRemovePreviewChoices(true)
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

export default AddStudentToFamilyForm;

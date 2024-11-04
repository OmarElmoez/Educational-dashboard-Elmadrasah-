import {BasicModal, Dropdown, DropdownWithSearch, Heading, InputField, RadioButtonsGroup, Row,} from "@/components";
import {TIMEZONES_OPTIONS} from "@/constants";
import {FOLLOW_UP_OPTIONS} from "@/constants/dropdown-options";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {actGetDropdownOptions} from "@/store/single-actions";
import {TOption} from "@/types/Dropdown";
import {useEffect, useRef, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";

// import CloseButton from "@/assets/close-button.svg?react";
import RepeatIcon from "@/assets/repeat.svg?react";
import {TModalRef} from "@/types/shared";
import ScheduleForm from "./schedule-form/ScheduleForm";
import actGetScheduleLessonData from "@/store/single-actions/actGetScheduleLessonData";
import {useNavigate, useParams} from "react-router-dom";
import {TLeadFlowData} from "@/schemas/getScheduleLessonSchema.ts";
import createOptionsFrom from "@/utils/createOptionsFrom";
import removeDuplicates from "@/utils/removeDuplicates";
import {useFeedback} from "@/store/context";
import PostScheduleLessonSchema, {
  TScheduleLessonFormData,
  TScheduleLessonFormDataForServer
} from "@/schemas/postScheduleLessonSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import actSendScheduleLessonData from "@/store/single-actions/actSendScheduleLessonData.ts";

const previewTeacherStyle = {
  border: "1px dashed #7AB790",
  borderRadius: "0.6rem",
  fontSize: "1rem",
  color: "#8A8A8A",
  backgroundColor: "#F1F1F1",
  padding: "0.6rem 1rem",
};

const ScheduleLesson = () => {
  const [servicesList, setServicesList] = useState<TOption[]>([]);
  const dispatch = useAppDispatch();

  const {credintials} = useAppSelector((state) => state.auth);

  const [customerData, setCustomerData] = useState<TLeadFlowData>();

  const {
    register,
    formState: {errors},
    watch,
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
  } = useForm<TScheduleLessonFormData>(
    {
      defaultValues: {
        subjects: [{gender: "", language: "", student_credit: "", subject: ""}],
        repeat: false,
        lesson_draft_id: null
      },
      resolver: zodResolver(PostScheduleLessonSchema),
    }
  );
  const {id, credit} = useParams();

  const {openFeedbackModal} = useFeedback();

  const {fields} = useFieldArray({
    control,
    name: "subjects",
  });

  const resetRepetition = () => {
    reset({
      ...getValues(),
      repeat_every: null,
      repeat_monthly: '',
      repeat_count: undefined,
      repeat_times: undefined,
      end_repeat_on: undefined,
      repeat_monthly_date: null,
      on_quarter: '',
      end_repeat: null,
      repeat: false,
    })
  }

  const [predefinedDate, setPredefinedDate] = useState("");

  useEffect(() => {
    dispatch(
      actGetDropdownOptions({optionsFor: "services"})
    ).then((res) => {
      if (Array.isArray(res?.payload)) {
        setServicesList(res.payload);
      }
    });
  }, [dispatch, credintials?.token]);

  useEffect(() => {
    // you should pass the id (get from useParams) to the action
    if (id && credit) {
      dispatch(actGetScheduleLessonData({id, credit})).unwrap()
      .then((res) => {
        console.log('from get schedule lesson', res)
        setCustomerData(res);
        setValue('lesson_credit', credit)
      })
    }
  }, [credit, dispatch, id, setValue]);

  const selectedTeachersType = watch("is_auto");

  const scheduleRef = useRef<TModalRef>(null);

  const navigate = useNavigate()

  // We use this method because the data came from the server is duplicated.
  const studentsOptions = Array.from(
    new Set(createOptionsFrom(customerData?.students))
  );
  const timeOptions = Array.from(
    new Set(createOptionsFrom(customerData?.time))
  );


  const subjectsOptions = Array.from(
    new Set(createOptionsFrom(customerData?.subjects))
  );
  const teachersOptions = removeDuplicates(customerData?.teachers);

  const onSubmit = (data: TScheduleLessonFormData) => {
    const scheduledClasses = data.subjects.reduce(
      (total: number, subject: any) => {
        return total + Number(subject.count);
      },
      0
    );

    if (scheduledClasses > Number(data.lesson_credit)) {
      openFeedbackModal("warning", `لا يمكن جدولة أكثر من ${data.lesson_credit} حصص`);
      return;
    }

    if (data.is_auto === 'true') {
      data.teacher_ids = customerData?.teachers.map(teacher => teacher.id);
    }


    if (data.description === '') {
      data.description = null;
    }

    if (data.end_repeat_on === undefined) {
      data.end_repeat_on === null
    }

    data.received_days = customerData?.days.map(day => day.id.toString());

    if (data.days === '') {
      data.days = null;
    }


    const serverData: TScheduleLessonFormDataForServer = {
      ...data,
      student_id: Number(data.student_id),
      subjects: [{
        subject: Number(data.subjects[0].subject),
        student_credit: Number(data.subjects[0].student_credit),
        language: data.subjects[0].language,
        gender: data.subjects[0].gender,
      }],
      lesson_credit: Number(data.lesson_credit),
      location_id: Number(data.location_id),
      service_id: Number(data.service_id),
      time_id: Number(data.time_id),
      employee_id: Number(data.employee_id),
      follow_up_type: Number(data.follow_up_type),
      repeat_count: Number(data.repeat_count) || 0,
      repeat_times: Number(data.repeat_times) || 0,
      is_auto: data.is_auto === "true",
    }

    dispatch(actSendScheduleLessonData(serverData)).unwrap().then(() => {
      openFeedbackModal("succeeded", "تم ارسال الاشعارات بنجاح", "")
      navigate('/admin/calendar/all-unscheduled-list')
    });

  };


  useEffect(() => {
    setValue("start_date", predefinedDate);
  }, [predefinedDate, setValue]);

  return (
    <>
      <BasicModal ref={scheduleRef}>
        <h2 className="modal__title">ضبط إعادة التكرار</h2>
        <ScheduleForm
          className="modal__form"
          onClose={() => scheduleRef.current?.close()}
          register={register}
          watch={watch}
          resetRepetition={resetRepetition}
          setValue={setValue}
        />
      </BasicModal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Dropdown
            label="الطلاب"
            name="student_id"
            options={studentsOptions}
            register={register}
            error={errors.student_id?.message as string}
          />

          <InputField
            label="رصيد الطالب"
            register={register}
            name="lesson_credit"
            error={errors.lesson_credit?.message as string}
            disabled
          />

        </Row>

        <Heading text="مواقيت الإتاحة للطالب" style={{marginTop: "2.8rem"}}/>

        <Row>
          {/*{customerData && <MultiChoices*/}
          {/*    error=""*/}
          {/*    name="day"*/}
          {/*    register={register}*/}
          {/*    fields={customerData?.days.length === 0 ? DAYS : customerData?.days}*/}
          {/*/>}*/}

          <>
            <article className="group">
              <span className="adminFormLabel">الايام</span>
              {customerData?.days.length !== 0 ? (
                  <section
                    className="inputField"
                    style={{display: "flex", gap: "1rem", flexWrap: "wrap", paddingBlock: "0.7rem"}}
                  >
                    {customerData?.days.map((day) => {
                        return (
                          <span
                            style={previewTeacherStyle}
                            key={day.id}
                          >
                        {day.name}
                      </span>
                        );
                      }
                    )}
                  </section>)
                :
                (<span className="error">لم يتم تحديد أيام</span>)
              }
            </article>
          </>

          <InputField
            label="الفترة"
            placeholder="صباحية"
            register={register}
            name="day_period"
            error=""
            value={customerData?.shift.name}
            disabled
          />

          <Dropdown
            label="التوقيت المناسب"
            name="time_id"
            options={timeOptions}
            register={register}
            error=""
          />
        </Row>

        <Row>
          <Dropdown
            label="التوقيت الزمني"
            name="timezone"
            options={TIMEZONES_OPTIONS}
            register={register}
            error={errors.lesson_credit?.message as string}
            // chosen={customerData?.timezone}
            chosen="Cairo"
          />

          <Dropdown
            label="الخدمة"
            options={servicesList}
            name="service_id"
            register={register}
            error={errors?.service_id?.message as string}
          />
        </Row>

        {fields.map((field, index) => (
          <Row key={field.id} style={{alignItems: "center"}}>
            <Dropdown
              // don't use subjects[${index}], it doesn't work.
              name={`subjects.${index}.gender`}
              register={register}
              label="النوع"
              options={[
                {label: "معلم", value: "Male"},
                {label: "معلمة", value: "Female"},
              ]}
              error={errors.subjects?.[index]?.gender?.message as string}
            />

            <Dropdown
              name={`subjects.${index}.language`}
              register={register}
              label="اللغة"
              options={[
                {label: "الإنجليزية", value: "en"},
                {label: "العربية", value: "ar"},
              ]}
              error={errors.subjects?.[index]?.language?.message as string}
            />

            <Dropdown
              name={`subjects.${index}.subject`}
              register={register}
              label="المادة"
              options={subjectsOptions}
              error={errors.subjects?.[index]?.subject?.message as string}
            />

            <InputField
              label="عدد الحصص"
              placeholder="4"
              register={register}
              name={`subjects.${index}.student_credit`}
              error={errors.subjects?.[index]?.student_credit?.message as string}
              type="number"
            />
            {/*<button*/}
            {/*  type="button"*/}
            {/*  style={{marginTop: "1rem"}}*/}
            {/*  onClick={() => {*/}
            {/*    remove(index);*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <CloseButton/>*/}
            {/*</button>*/}
          </Row>
        ))}
        {/*<button*/}
        {/*  style={{display: "block", marginRight: "auto"}}*/}
        {/*  className="add-action-btn"*/}
        {/*  type="button"*/}
        {/*  onClick={() =>*/}
        {/*    append({*/}
        {/*      gender: "",*/}
        {/*      language: "",*/}
        {/*      subject: "",*/}
        {/*      student_credit: 0,*/}
        {/*    })*/}
        {/*  }*/}
        {/*>*/}
        {/*  + إضافة مادة أخري*/}
        {/*</button>*/}

        <Heading text="اختيار المٌعلمين" style={{marginTop: "2.8rem"}}/>

        <Row>
          <RadioButtonsGroup
            register={register}
            name="is_auto"
            options={[
              {label: "اختيار يدوي", value: "false"},
              {label: "اختيار تلقائي", value: "true"},
            ]}
            style={{gap: "11.6rem"}}
            error=""
          />
        </Row>

        <Row>
          {selectedTeachersType === "false" && (
            <>

              <DropdownWithSearch label="المعلمين" name="employee_id" register={register} optionsFor="teachers"
                                  setValue={setValue}/>


              <DropdownWithSearch label="الموقع الأفتراضي" name="location_id" register={register} optionsFor="locations"
                                  setValue={setValue}/>

            </>
          )}

          {(selectedTeachersType === "true" && teachersOptions.length !== 0) ?
            <>
              <article className="group">
                <section
                  className="inputField"
                  style={{display: "flex", gap: "1rem", flexWrap: "wrap"}}
                >
                  {teachersOptions.map((teacher) =>
                    teacher.subjects.map((subject: any) => {
                        return (
                          <span
                            style={previewTeacherStyle}
                            key={`${teacher.id}_${subject.id}`}
                          >
                        {teacher.first_name} {teacher.last_name} -{" "}
                            {subject.name}
                      </span>
                        );
                    })
                  )}
                </section>
              </article>
              <article className="group"></article>
            </> : (selectedTeachersType === '' || selectedTeachersType === 'true') ? (
              <span className="error">لا يوجد مدرسين</span>) : ''
          }
        </Row>

        <Row>
          <InputField
            label="بداية الدرس"
            type="date"
            register={register}
            name="from_date"
            error={errors.from_date?.message as string}
            onChange={(e) => setPredefinedDate(e.target.value)}
          />

          {customerData?.time.length === 0 ?
            <>
              <InputField
                label="وقت البدء"
                type="time"
                register={register}
                name="from_time"
                error={errors.from_time?.message as string}
              />

              <InputField
                label="وقت الانتهاء"
                type="time"
                register={register}
                name="to_time"
                error={errors.to_time?.message as string}
              />
            </> : <article className="group"></article>}


        </Row>

        <Row style={{marginTop: "2.8rem"}}>
          {/*<InputField*/}
          {/*    label="الأماكن المتاحة بالدرس"*/}
          {/*    placeholder="........"*/}
          {/*    register={register}*/}
          {/*    name="avalible_locations"*/}
          {/*    error={errors.lesson_credit?.message as string}*/}
          {/*/>*/}

          <InputField
            label="معلومات إضافية"
            placeholder="اكتب معلوماتك الإضافية"
            register={register}
            name="description"
            error={errors.description?.message as string}
            textarea
          />

          <article className="group"></article>
        </Row>

        {/*<Heading text="اشعارات التذكير" style={{marginTop: "2.8rem"}}/>*/}

        {/*<CheckBoxesGroup*/}
        {/*    options={SCHEDULE_CHECK_BOXES}*/}
        {/*    register={register}*/}
        {/*    style={{*/}
        {/*        width: "80%",*/}
        {/*        columnGap: "20rem",*/}
        {/*        rowGap: "2.6rem",*/}
        {/*        flexWrap: "wrap",*/}
        {/*    }}*/}
        {/*/>*/}

        <Heading text="خيارات المتابعة" style={{marginTop: "4.8rem"}}/>

        <Row>
          <Dropdown
            label="اختر المتابعة"
            register={register}
            options={FOLLOW_UP_OPTIONS}
            name="follow_up_type"
            error={errors.follow_up_type?.message as string}
          />

          <article className="group"></article>
        </Row>

        <button
          type="button"
          className="btn"
          style={{
            border: "1px solid #c7c7c7",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            paddingInline: "1.6rem",
          }}
          onClick={() => {
            scheduleRef.current?.open()
            setValue('repeat', true)
          }}
        >
          <RepeatIcon/>
          <span>إعادة التكرار</span>
        </button>

        <Row style={{justifyContent: "flex-end", marginTop: "1.4rem"}}>
          <button type="submit" className="btn submit-btn">
            حفظ
          </button>
          <button
            type="button"
            className="btn"
            style={{
              minWidth: "256px",
              backgroundColor: "#ffb72b",
              color: "#fff",
            }}
          >
            التأكيد علي المواعيد
          </button>
          <button
            type="button"
            className="btn cancel-btn"
            onClick={() => {
              reset();
            }}
          >
            يُلغي
          </button>
        </Row>
      </form>
    </>
  )
    ;
};

export default ScheduleLesson;

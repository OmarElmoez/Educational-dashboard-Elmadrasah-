import {
  BasicModal,
  Dropdown,
  DropdownWithSearch,
  InputField,
  // MultiChoices,
  RadioButtonsGroup,
  Row,
} from "@/components";
import {Heading} from '@/components/UI'
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
import actGetRescheduleLessonData, {TRescheduleLessonResponse} from "@/store/single-actions/actGetRescheduleLessonData";
import {useNavigate, useParams} from "react-router-dom";
import {useFeedback} from "@/store/context";
import PostScheduleLessonSchema, {
  TScheduleLessonFormData,
  TScheduleLessonFormDataForServer,
} from "@/schemas/postScheduleLessonSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import createOptionsFrom from "@/utils/createOptionsFrom.ts";
import removeDuplicates from "@/utils/removeDuplicates.ts";
import actSendScheduleLessonData from "@/store/single-actions/actSendScheduleLessonData.ts";
import turnDaysIntoEnglishString from "@/utils/turnDaysIntoEnglish.ts";

const previewTeacherStyle = {
  border: "1px dashed #7AB790",
  borderRadius: "0.6rem",
  fontSize: "1rem",
  color: "#8A8A8A",
  backgroundColor: "#F1F1F1",
  padding: "0.6rem 1rem",
};

const RescheduleLesson = () => {
  const [servicesList, setServicesList] = useState<TOption[]>([]);
  const dispatch = useAppDispatch();

  const {credintials} = useAppSelector((state) => state.auth);

  const [customerData, setCustomerData] = useState<TRescheduleLessonResponse>();

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
        // lesson_credit: customerData?.leadflow_data[0].customer.credit.toString(),
        // student_id: customerData?.leadflow_data[0].students[0].id.toString(),
        // time_id: customerData?.leadflow_data[0].time[0]?.id,
        // timezone: customerData?.leadflow_data[0].timezone,
      },
      resolver: zodResolver(PostScheduleLessonSchema),
    }
  );
  const {id} = useParams();

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
    if (id) {
      dispatch(actGetRescheduleLessonData({id}))
      .unwrap()
      .then((res) => {
        if (typeof res === 'string') {
          openFeedbackModal("failed", `${res}`)
        } else {
        setPreviousData(res);
          setCustomerData(res);
        }
      });
    }
  }, [ dispatch, id, setValue]);

  /**
   * we use this way, because it shows the value on the UI and set the value for the key when submitting.
   *
   * if we use defaultValues from useForm Hook, it didn't show the values on the UI.
   */
  const setPreviousData = (response: TRescheduleLessonResponse) => {
    setValue('lesson_credit', response.leadflow_data[0].customer.credit.toString());
    setValue('student_id', response.leadflow_data[0].students[0].id.toString());
    setValue('time_id', response.leadflow_data[0].time[0]?.id.toString());
    setValue('timezone', response.leadflow_data[0].timezone || "Cairo");
    setValue('is_auto', response.lesson_draft_data.is_auto.toString());
    setValue(`subjects.${0}.student_credit`, response.leadflow_data[0].subjects[0].student_credit.toString());
    setValue(`subjects.${0}.subject`, response.leadflow_data[0].subjects[0].id.toString());
    setValue(`subjects.${0}.language`, response.lesson_draft_data.teacher_language);
    setValue(`subjects.${0}.gender`, response.lesson_draft_data.gender);
    setValue('from_date', response.lesson_draft_data.from_date);
    setValue('start_date', response.lesson_draft_data.from_date);
    setValue('service_id', response.lesson_draft_data.service_id.toString());
    setValue('from_time', response.lesson_draft_data.from_time);
    setValue('to_time', response.lesson_draft_data.to_time);
    setValue('description', response.lesson_draft_data.description);
    setValue('repeat_every', response.lesson_draft_data.repeat_every);
    setValue('end_repeat', response.lesson_draft_data.end_repeat);
    setValue('repeat_times',
      response
        .lesson_draft_data.repeat_times === null ? null : response.lesson_draft_data.repeat_times.toString());
    setValue('end_repeat_on',
      response
        .lesson_draft_data.end_repeat_on === null ? null : response.lesson_draft_data.end_repeat_on);
    setValue('repeat_monthly', response.lesson_draft_data.repeat_monthly);
    setValue('repeat_monthly_date', response.lesson_draft_data.repeat_monthly_date);
    setValue('on_quarter', response.lesson_draft_data.on_quarter);
    setValue('repeat_count', response.lesson_draft_data.repeat_count?.toString());
    setValue('package_id', response.lesson_draft_data.package_id)
  }
  const navigate = useNavigate();
  const selectedTeachersType = watch("is_auto");

  const scheduleRef = useRef<TModalRef>(null);

  // We use this method because the data came from the server is duplicated.
  const studentsOptions = createOptionsFrom(customerData?.leadflow_data[0].students)

  // const predefinedDays = customerData?.leadflow_data[0].days.map(day => day.id);

  const timeOptions = createOptionsFrom(customerData?.leadflow_data[0].time)


  const subjectsOptions = createOptionsFrom(customerData?.leadflow_data[0].subjects)
  const teachersOptions = removeDuplicates(customerData?.leadflow_data[0].teachers);

  const onSubmit = (data: TScheduleLessonFormData) => {
    console.log('submitted data: ', data)
    const scheduledClasses = data.subjects.reduce(
      (total: number, subject: any) => {
        return total + Number(subject.count);
      },
      0
    );

    if (scheduledClasses > Number(data.lesson_credit)) {
      openFeedbackModal(
        "warning",
        `لا يمكن جدولة أكثر من ${data.lesson_credit} حصص`
      );
      return;
    }

    if (data.is_auto === 'true') {
      data.teacher_ids = customerData?.leadflow_data[0].teachers.map(teacher => teacher.id);
    }

    if (data.repeat_monthly === '') {
      data.repeat_monthly = null;
    }

    if (data.on_quarter === '') {
      data.on_quarter = null;
    }

    if (data.description === '') {
      data.description = null;
    }

    if (data.days === '') {
      data.days = null;
    }

    data.lesson_draft_id = Number(id);

    if (data.repeat_every === '') {
      data.repeat_every = null;
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
      location_id: Number(data.location_id) || null,
      service_id: Number(data.service_id),
      time_id: Number(data.time_id),
      employee_id: Number(data.employee_id) || null,
      follow_up_type: Number(data.follow_up_type),
      repeat_count: Number(data.repeat_count) || 0,
      repeat_times: Number(data.repeat_times) || 0,
      is_auto: data.is_auto === "true",
    }

    dispatch(actSendScheduleLessonData(serverData)).unwrap().then(() => {
      openFeedbackModal("succeeded", "تمت إعادة الجدولة بنجاح", "")
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
          draftLessonData={customerData?.lesson_draft_data}
          selectedDays={customerData?.leadflow_data[0].days}
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
            chosen={customerData?.leadflow_data[0].students[0].id.toString()}
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
          {/*    fields={customerData?.leadflow_data[0].days.length === 0 ? DAYS : customerData?.leadflow_data[0].days}*/}
          {/*    predefinedDays={predefinedDays}*/}
          {/*/>*/}
          {/*}*/}
            <article className="group">
            <span className="adminFormLabel">الايام</span>
              <section
                className="inputField"
                style={{display: "flex", gap: "1rem", flexWrap: "wrap", paddingBlock: "0.7rem"}}
              >
                {customerData?.leadflow_data[0].days.map((day) => {
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
              </section>
            </article>

          <InputField
            label="الفترة"
            register={register}
            name="day_period"
            error=""
            value={customerData?.leadflow_data[0].shift.name}
            disabled
          />

          <Dropdown
            label="التوقيت المناسب"
            name="time_id"
            options={timeOptions}
            register={register}
            error=""
            chosen={customerData?.leadflow_data[0].time[0]?.id.toString()}
          />
        </Row>

        <Row>
          <Dropdown
            label="التوقيت الزمني"
            name="timezone"
            options={TIMEZONES_OPTIONS}
            register={register}
            error={errors.lesson_credit?.message as string}
            chosen={customerData?.leadflow_data[0].timezone}
          />

          <Dropdown
            label="الخدمة"
            options={servicesList}
            name="service_id"
            register={register}
            error={errors?.service_id?.message as string}
            // chosen={customerData?.lesson_draft_data.service_id === null ? '0' : customerData?.lesson_draft_data.service_id.toString()}
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
              chosen={customerData?.leadflow_data[0].subjects[0].id.toString()}
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
            </> : (selectedTeachersType === '' || selectedTeachersType === 'true') ? (<span className="error">لا يوجد مدرسين</span>) : ''
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

          {customerData?.leadflow_data[0].time.length === 0 ?
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
            // chosen={customerData?.lesson_draft_data.follow_up_type === null ? '0' : customerData?.lesson_draft_data.follow_up_type.toString()}
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
          <button type="submit" className="btn submit-btn" onClick={() => {
            if (Array.isArray(control._getWatch('days'))) {
              setValue('days', turnDaysIntoEnglishString(control._getWatch('days')))
          }}}>
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
              console.log('days value: ', control._getWatch('days'))
              console.log(errors)
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

export default RescheduleLesson;

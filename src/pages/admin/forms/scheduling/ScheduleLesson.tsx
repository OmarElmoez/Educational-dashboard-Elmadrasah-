import {
  BasicModal,
  DateOrTimePicker,
  Dropdown,
  DropdownWithSearch,
  InputField,
  LoadingIndicator,
  RadioButtonsGroup,
  Row,
} from "@/components";
import { Heading } from "@/components/UI";
import { TIMEZONES_OPTIONS } from "@/constants";
import { FOLLOW_UP_OPTIONS } from "@/constants/dropdown-options";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetDropdownOptions } from "@/store/single-actions";
import { TOption } from "@/types/Dropdown";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

// import CloseButton from "@/assets/close-button.svg?react";
import RepeatIcon from "@/assets/repeat.svg?react";
import { TLoading, TModalRef } from "@/types/shared";
import ScheduleForm from "./schedule-form/ScheduleForm";
import actGetScheduleLessonData from "@/store/single-actions/actGetScheduleLessonData";
import { useNavigate, useParams } from "react-router-dom";
import { TLeadFlowData } from "@/schemas/getScheduleLessonSchema.ts";
import createOptionsFrom from "@/utils/createOptionsFrom";
import removeDuplicates from "@/utils/removeDuplicates";
import { useFeedback } from "@/store/context";
import PostScheduleLessonSchema, {
  TScheduleLessonFormData,
  TScheduleLessonFormDataForServer,
} from "@/schemas/postScheduleLessonSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const { credintials } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState<TLoading>("idle");

  const [customerData, setCustomerData] = useState<TLeadFlowData>();

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
  } = useForm<TScheduleLessonFormData>({
    defaultValues: {
      subjects: [{ gender: "", language: "", student_credit: "", subject: "" }],
      repeat: false,
      lesson_draft_id: null,
    },
    resolver: zodResolver(PostScheduleLessonSchema),
  });
  const { id, credit, package_id } = useParams();

  const { openFeedbackModal } = useFeedback();

  const { fields } = useFieldArray({
    control,
    name: "subjects",
  });

  const resetRepetition = () => {
    reset({
      ...getValues(),
      repeat_every: null,
      repeat_monthly: "",
      repeat_count: undefined,
      repeat_times: undefined,
      end_repeat_on: undefined,
      repeat_monthly_date: null,
      on_quarter: "",
      end_repeat: null,
      repeat: false,
    });
  };

  const [predefinedDate, setPredefinedDate] = useState("");

  useEffect(() => {
    dispatch(actGetDropdownOptions({ optionsFor: "services" })).then((res) => {
      if (Array.isArray(res?.payload)) {
        setServicesList(res.payload);
      }
    });
  }, [dispatch, credintials?.token]);

  useEffect(() => {
    // you should pass the id (get from useParams) to the action
    if (id && credit) {
      dispatch(actGetScheduleLessonData({ id, credit }))
        .unwrap()
        .then((res) => {
          setCustomerData(res);
          setValue("lesson_credit", credit);
        });
    }
  }, [credit, dispatch, id, setValue]);

  const selectedTeachersType = watch("is_auto");

  const scheduleRef = useRef<TModalRef>(null);

  const navigate = useNavigate();

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
    if (teachersOptions.length === 0 && selectedTeachersType === "true") {
      setLoading("failed");
      openFeedbackModal("failed", `غير متاح مدرسين للجدولة التلقائي`);
      return;
    }

    setLoading("pending");

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

    if (data.is_auto === "true") {
      data.teacher_ids = customerData?.teachers.map((teacher) => teacher.id);
    }
    const processedData = {
      ...data,
      description: data.description === "" ? null : data.description,
      end_repeat_on:
        data.end_repeat_on === undefined ? null : data.end_repeat_on,
      received_days: customerData?.days.map((day) => day.id.toString()),
      days: data.days === "" ? null : data.days,
      repeat_every: data.repeat_every === "" ? null : data.repeat_every,
      package_id: Number(package_id),
    };

    const serverData: TScheduleLessonFormDataForServer = {
      ...processedData,
      student_id: Number(data.student_id),
      subjects: [
        {
          subject: Number(data.subjects[0].subject),
          student_credit: Number(data.subjects[0].student_credit),
          language: data.subjects[0].language,
          gender: data.subjects[0].gender,
        },
      ],
      lesson_credit: Number(data.lesson_credit),
      location_id: Number(data.location_id),
      service_id: Number(data.service_id),
      time_id: Number(data.time_id),
      employee_id: Number(data.employee_id),
      follow_up_type: Number(data.follow_up_type),
      repeat_count: Number(data.repeat_count) || 0,
      repeat_times: Number(data.repeat_times) || 0,
      is_auto: data.is_auto === "true",
    };
    const {time_id, ...remainData} = serverData
    dispatch(actSendScheduleLessonData(remainData)).unwrap().then((res) => {
      if (res?.status === 400) {
        setLoading('failed')
        const conflictsDiv = (
          <div>
            {JSON.parse(res?.response).conflicts?.map((msg: string, index: number) => (
              <p key={index} className="mt-2 text-[1.1rem] text-red-500">{msg}</p>
            ))}
          </div>
        );
        openFeedbackModal('failed', JSON.parse(res?.response).error, conflictsDiv);
        return;
      } else {
        setLoading('succeeded')
        openFeedbackModal("succeeded", "تمت الجدولة بنجاح")
        navigate('/admin/calendar/all-unscheduled-list')
      }
    });
  };

  useEffect(() => {
    setValue("start_date", predefinedDate);
  }, [predefinedDate, setValue]);

  return (
    <>
      {(loading === "pending" || !customerData) && (
        <div className="loadingBox">
          <LoadingIndicator />
        </div>
      )}
      <BasicModal
        ref={scheduleRef}
        headerText="ضبط إعادة التكرار"
        headerTextStyle={{ fontSize: "1.8rem", fontWeight: "500" }}
      >
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

        <Heading text="مواقيت الإتاحة للطالب" style={{ marginTop: "2.8rem" }} />

        <Row>
          <>
            <article className="group">
              <span className="adminFormLabel">الايام</span>
              {customerData?.days.length !== 0 ? (
                <section
                  className="inputField"
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                    paddingBlock: "0.7rem",
                  }}
                >
                  {customerData?.days.map((day) => {
                    return (
                      <span style={previewTeacherStyle} key={day.id}>
                        {day.name}
                      </span>
                    );
                  })}
                </section>
              ) : (
                <span className="error">لم يتم تحديد أيام</span>
              )}
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
            isEdit
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
          <Row key={field.id} style={{ alignItems: "center" }}>
            <Dropdown
              // don't use subjects[${index}], it doesn't work.
              name={`subjects.${index}.gender`}
              register={register}
              label="النوع"
              options={[
                { label: "معلم", value: "Male" },
                { label: "معلمة", value: "Female" },
              ]}
              error={errors.subjects?.[index]?.gender?.message as string}
            />

            <Dropdown
              name={`subjects.${index}.language`}
              register={register}
              label="اللغة"
              options={[
                { label: "الإنجليزية", value: "en" },
                { label: "العربية", value: "ar" },
              ]}
              error={errors.subjects?.[index]?.language?.message as string}
            />

            {customerData?.subjects.length !== 0 && (
              <Dropdown
                name={`subjects.${index}.subject`}
                register={register}
                label="المادة"
                options={subjectsOptions}
                error={errors.subjects?.[index]?.subject?.message as string}
              />
            )}

            {customerData?.subjects.length === 0 && (
              <DropdownWithSearch
                register={register}
                name={`subjects.${index}.subject`}
                setValue={setValue}
                label="المادة"
                optionsFor="subjects"
              />
            )}

            <InputField
              label="عدد الحصص"
              placeholder="4"
              register={register}
              name={`subjects.${index}.student_credit`}
              error={
                errors.subjects?.[index]?.student_credit?.message as string
              }
              type="number"
            />
          </Row>
        ))}

        <Heading text="اختيار المٌعلمين" style={{ marginTop: "2.8rem" }} />

        <Row>
          <RadioButtonsGroup
            register={register}
            name="is_auto"
            options={[
              { label: "اختيار يدوي", value: "false" },
              { label: "اختيار تلقائي", value: "true" },
            ]}
            style={{ gap: "11.6rem" }}
            error=""
          />
        </Row>

        <Row>
          {selectedTeachersType === "false" && (
            <>
              <DropdownWithSearch
                label="المعلمين"
                name="employee_id"
                register={register}
                optionsFor="teachers"
                setValue={setValue}
              />

              <DropdownWithSearch
                label="الموقع الأفتراضي"
                name="location_id"
                register={register}
                optionsFor="locations"
                setValue={setValue}
              />
            </>
          )}

          {selectedTeachersType === "true" && teachersOptions.length !== 0 ? (
            <>
              <article className="group">
                <section
                  className="inputField"
                  style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
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
            </>
          ) : selectedTeachersType === "" || selectedTeachersType === "true" ? (
            <span className="error">لا يوجد مدرسين</span>
          ) : (
            ""
          )}
        </Row>

        <Row>
          <DateOrTimePicker
            setValue={setValue}
            label="بداية الدرس"
            register={register}
            name="from_date"
            error={errors.from_date?.message as string}
            onChange={(val: string) => setPredefinedDate(val)}
          />

          {selectedTeachersType === "false" ? (
            <>
              <DateOrTimePicker
                type="time"
                setValue={setValue}
                label="وقت البدء"
                register={register}
                name="from_time"
                error={errors.from_time?.message as string}
              />

              <DateOrTimePicker
                type="time"
                setValue={setValue}
                label="وقت الانتهاء"
                register={register}
                name="to_time"
                error={errors.to_time?.message as string}
              />
            </>
          ) : (
            <article className="group"></article>
          )}
        </Row>

        <Row style={{ marginTop: "2.8rem" }}>
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

        <Heading text="خيارات المتابعة" style={{ marginTop: "4.8rem" }} />

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
            scheduleRef.current?.open();
            setValue("repeat", true);
          }}
        >
          <RepeatIcon />
          <span>إعادة التكرار</span>
        </button>

        <Row style={{ justifyContent: "flex-end", marginTop: "1.4rem" }}>
          <button type="submit" className="btn submit-btn">
            حفظ
          </button>
          <button
            type="button"
            className="btn cancel-btn"
            onClick={() => {
              reset();
            }}
          >
            إلغاء
          </button>
        </Row>
      </form>
    </>
  );
};

export default ScheduleLesson;

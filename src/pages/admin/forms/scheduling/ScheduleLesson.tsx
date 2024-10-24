import {
  BasicModal,
  CheckBoxesGroup,
  Dropdown,
  Heading,
  InputField,
  MultiChoices,
  RadioButtonsGroup,
  Row,
} from "@/components";
import { TIMEZONES_OPTIONS } from "@/constants";
import { SCHEDULE_CHECK_BOXES } from "@/constants/checkbox-options";
import { FOLLOW_UP_OPTIONS } from "@/constants/dropdown-options";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetDropdownOptions } from "@/store/single-actions";
import { TOption } from "@/types/Dropdown";
import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import CloseButton from "@/assets/close-button.svg?react";
import RepeatIcon from "@/assets/repeat.svg?react";
import { TModalRef } from "@/types/shared";
import ScheduleForm from "./schedule-form/ScheduleForm";
import actGetScheduleLessonData from "@/store/single-actions/actGetScheduleLessonData";
import { useParams } from "react-router-dom";
import { TLeadFlowData } from "@/schemas/ScheduleLessonSchema";
import createOptionsFrom from "@/utils/createOptionsFrom";
import removeDuplicates from "@/utils/removeDuplicates";
import { useFeedback } from "@/store/context";

const previewTeacherStyle = {
  border: "1px dashed #7AB790",
  borderRadius: "0.6rem",
  fontSize: "1rem",
  color: "#8A8A8A",
  backgroundColor: "#F1F1F1",
  padding: "0.6rem 1rem",
};

const ScheduleLesson = () => {
  const [customersList, setCustomersList] = useState<TOption[]>([]);
  console.log(customersList)
  const dispatch = useAppDispatch();

  const { credintials } = useAppSelector((state) => state.auth);

  const [customerData, setCustomerData] = useState<TLeadFlowData>();

  const {
    register,
    formState: { errors },
    reset,
    watch,
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      subjects: [{ gender: "", language: "", count: "", subject: "" }],
      credit: 10,
    },
  });
  const { id } = useParams();

  const { openFeedbackModal } = useFeedback();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  useEffect(() => {
    dispatch(actGetDropdownOptions({ optionsFor: "customers" }))
      .unwrap()
      .then((res) => {
        setCustomersList(res);
      });
  }, [dispatch, credintials?.token]);

  useEffect(() => {
    // you should pass the id (get from useParams) to the action
    if (id) {
      dispatch(actGetScheduleLessonData(id))
        .unwrap()
        .then((res) => {
          setCustomerData(res);
          // setAvalibleClassesForScheduling(res.customer.credit);
        });
    }
    // dispatch(actGetScheduleLessonData(id));
  }, [dispatch, id]);

  // Temp fields for multiChoice component, real data will be used from the store.
  const DAYS = [
    {
      id: 1,
      name: "الاحد",
    },
    {
      id: 2,
      name: "الاثنين",
    },
    {
      id: 3,
      name: "الثلاثاء",
    },
    {
      id: 4,
      name: "الاربعاء",
    },
    {
      id: 5,
      name: "الخميس",
    },
    {
      id: 6,
      name: "الجمعة",
    },
    {
      id: 7,
      name: "السبت",
    },
  ];

  const TEACHERS = [
    { id: 1, name: "محمد أحمد" },
    { id: 2, name: "فاطمة علي" },
    { id: 3, name: "عبد الرحمن محمود" },
    { id: 4, name: "زينب حسن" },
    { id: 5, name: "يوسف خالد" },
    { id: 6, name: "نور الدين عمر" },
    { id: 7, name: "ليلى إبراهيم" },
  ];

  const selectedTeachersType = watch("teachers_choice_type");

  const scheduleRef = useRef<TModalRef>(null);

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

  const onSubmit = (data: any) => {
    const scheduledClasses = data.subjects.reduce(
      (total: number, subject: any) => {
        return total + Number(subject.count);
      },
      0
    );
    
    if (scheduledClasses > Number(data.credit)) {

      openFeedbackModal("warning", `لا يمكن جدولة أكثر من ${data.credit} حصص`);
      return;
    }

    console.log(data);
  };

  return (
    <>
      <BasicModal ref={scheduleRef}>
        <h2 className="modal__title">ضبط إعادة التكرار</h2>
        <ScheduleForm
          className="modal__form"
          onClose={() => scheduleRef.current?.close()}
        />
      </BasicModal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Dropdown
            label="الطلاب"
            name="students"
            options={studentsOptions}
            register={register}
            error=""
          />

          <InputField
            label="رصيد الطالب"
            placeholder="10"
            register={register}
            name="credit"
            disabled
            error=""
            value="10"
          />
        </Row>

        <Heading text="مواقيت الإتاحة للطالب" style={{ marginTop: "2.8rem" }} />

        <Row>
          {customerData && <MultiChoices
              error=""
              name="days"
              register={register}
              fields={customerData?.days.length === 0 ? DAYS : customerData?.days}
          />}

          <InputField
            label="الفترة"
            placeholder="صباحية"
            register={register}
            name="day_period"
            error=""
            value={customerData?.shift.name}
          />

          <Dropdown
            label="التوقيت المناسب"
            name="time_period"
            options={timeOptions}
            register={register}
            error=""
          />
        </Row>

        <Row>
          <Dropdown
            label="التوقيت الزمني"
            name="time_zone"
            options={TIMEZONES_OPTIONS}
            register={register}
            error=""
            // chosen={customerData?.timezone}
            chosen="Cairo"
          />
        </Row>

        {fields.map((field, index) => (
          <Row key={field.id} style={{ alignItems: "center" }}>
            <Dropdown
              name={`subjects[${index}].gender`}
              register={register}
              label="النوع"
              options={[
                { label: "معلم", value: "male" },
                { label: "معلمة", value: "female" },
              ]}
              error=""
            />

            <Dropdown
              name={`subjects[${index}].language`}
              register={register}
              label="اللغة"
              options={[
                { label: "الإنجليزية", value: "en" },
                { label: "العربية", value: "ar" },
              ]}
              error=""
            />

            <Dropdown
              name={`subjects[${index}].subject`}
              register={register}
              label="المادة"
              options={subjectsOptions}
              error=""
            />

            <InputField
              label="عدد الحصص"
              placeholder="4"
              register={register}
              name={`subjects[${index}].count`}
              error=""
              type="number"
            />
            <button
              type="button"
              style={{ marginTop: "1rem" }}
              onClick={() => {
                remove(index);
              }}
            >
              <CloseButton />
            </button>
          </Row>
        ))}
        <button
          style={{ display: "block", marginRight: "auto" }}
          className="add-action-btn"
          type="button"
          onClick={() =>
            append({
              gender: "",
              language: "",
              subject: "",
              count: "",
            })
          }
        >
          + إضافة مادة أخري
        </button>

        <Heading text="اختيار المٌعلمين" style={{ marginTop: "2.8rem" }} />

        <Row>
          <RadioButtonsGroup
            register={register}
            name="teachers_choice_type"
            options={[
              { label: "اختيار يدوي", value: "manual" },
              { label: "اختيار تلقائي", value: "automatic" },
            ]}
            style={{ gap: "11.6rem" }}
          />
        </Row>

        <Row>
          {selectedTeachersType === "manual" && (
            <MultiChoices
              register={register}
              name="teachers_choices"
              error=""
              fields={TEACHERS}
            />
          )}

          {selectedTeachersType === "automatic" && (
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
          )}
          <article className="group"></article>
        </Row>

        <Row style={{ marginTop: "2.8rem" }}>
          <InputField
            label="الأماكن المتاحة بالدرس"
            placeholder="........"
            register={register}
            name="avalible_locations"
            error=""
          />

          <InputField
            label="معلومات إضافية"
            placeholder="اكتب معلوماتك الإضافية"
            register={register}
            name="extra_info"
            error=""
            textarea
          />
        </Row>

        <Heading text="اشعارات التذكير" style={{ marginTop: "2.8rem" }} />

        <CheckBoxesGroup
          options={SCHEDULE_CHECK_BOXES}
          register={register}
          style={{
            width: "80%",
            columnGap: "20rem",
            rowGap: "2.6rem",
            flexWrap: "wrap",
          }}
        />

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
          onClick={() => scheduleRef.current?.open()}
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
  );
};

export default ScheduleLesson;

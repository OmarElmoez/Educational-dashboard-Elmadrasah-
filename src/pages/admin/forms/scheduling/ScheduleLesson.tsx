import {
  BasicModal,
  CheckBoxesGroup,
  Dropdown,
  DropdownWithSearch,
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

const ScheduleLesson = () => {
  const [customersList, setCustomersList] = useState<TOption[]>([]);
  const [customer, setCustomer] = useState("");

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm({
    // defaultValues: {
    //   subjects: [{ gender: "", language: "", count: "", subject: "" }],
    // },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  useEffect(() => {
    dispatch(
      actGetDropdownOptions({ token: user?.token, optionsFor: "customers" })
    )
      .unwrap()
      .then((res) => {
        setCustomersList(res);
      });
  }, [dispatch, user?.token]);

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

  console.log(customer);

  return (
    <>
      <BasicModal ref={scheduleRef}>
        <h2 className="modal__title">ضبط إعادة التكرار</h2>
        <ScheduleForm className="modal__form" onClose={() => scheduleRef.current?.close()} />
      </BasicModal>
      <form>
        <Row>
          <DropdownWithSearch
            label="الطلاب"
            placeholder="اختار الطالب"
            options={customersList}
            handleChange={(id: string) => {
              setCustomer(id);
            }}
          />

          <InputField
            label="رصيد الطالب"
            placeholder="30 حصه"
            register={register}
            name="balance"
            error=""
          />
        </Row>

        <Heading text="مواقيت الإتاحة للطالب" style={{ marginTop: "2.8rem" }} />

        <Row>
          <MultiChoices
            error=""
            name="days"
            register={register}
            fields={DAYS}
          />

          <InputField
            label="الفترة"
            placeholder="صباحية"
            register={register}
            name="day_period"
            error=""
          />

          <InputField
            label="التوقيت المناسب"
            placeholder="12:00 ص : 5:00 م"
            register={register}
            name="time_zone"
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
          />
        </Row>

        {fields.map((field, index) => (
          <>
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

              <InputField
                label="المادة"
                placeholder="علوم حاسب"
                register={register}
                name={`subjects[${index}].subject`}
                error=""
              />

              <InputField
                label="عدد الحصص"
                placeholder="4"
                register={register}
                name={`subjects[${index}].count`}
                error=""
              />

              <button
                type="button"
                style={{ marginTop: "1rem" }}
                onClick={() => remove(index)}
              >
                <CloseButton />
              </button>
            </Row>
          </>
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
            error={errors.title?.message as string}
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

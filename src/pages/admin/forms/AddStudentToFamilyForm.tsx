import {
  ColorField,
  CountriesDropdown,
  Dropdown,
  Heading,
  MultiChoices,
  PhoneField,
  Row,
} from "@/components";
import { InputField } from "@/components";
import { EMPLOYEE_TITLES, END_POINTS, TIMEZONES_OPTIONS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetCountries } from "@/store/location/LocationSlice";
import {
  AddStudentToFamilySchema,
  TAddStudentToFamilyFormData,
} from "@/schemas/AddStudentToFamilySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import formatCities from "@/utils/formatCities";
import formatStates from "@/utils/formatStates";
import { SERVICE_OPTIONS, STUDENT_STATUS } from "@/constants/dropdown-options";
import { NotificationForm } from "@/components/mini-forms";
import { actGetChoices } from "@/store/single-actions";
import { TOption } from "@/types/Dropdown";
import { format } from "date-fns";
import actSendDataToServer from "@/store/single-actions/actSendDataToServer";

// -------------------------------------------------------------------------

const AddStudentToFamilyForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { countries, cities, states, chosenState } = useAppSelector(
    (state) => state.location
  );

  const [locationOptions, setLocationOptions] = useState<TOption[]>([]);

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
  });

  const onSubmit = (data: TAddStudentToFamilyFormData) => {
    const enteredPhoneParts = data["mobile_phone"].split(" ");
    let firstPartOfNumber = enteredPhoneParts[1];
    if (firstPartOfNumber[0] === "0") {
      firstPartOfNumber = firstPartOfNumber.slice(1);
      enteredPhoneParts[1] = firstPartOfNumber;
    }
    data["mobile_phone"] = enteredPhoneParts.join("");

    // data.students_attributes.birth_date = format(
    //   data.students_attributes.birth_date || "",
    //   "yyyy-MM-dd"
    // );
    // data.students_attributes.start_date = format(
    //   data.students_attributes.start_date || "",
    //   "yyyy-MM-dd"
    // );

    // data.students_attributes.first_name = data.first_name;
    // data.students_attributes.last_name = data.last_name;
    // data.students_attributes.email = data.email;
    // data.students_attributes.mobile_phone = data.mobile_phone;

    const serverData = {
      ...data,
      customer_type: "individual",
    };

    dispatch(
      actSendDataToServer({
        token: user?.token,
        purpose: "add_family_student",
        formData: serverData,
      })
    )
      .unwrap()
      .then(() => {
        console.log("Parent added successfully");
      });
  };

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(actGetCountries());
    }
  }, [dispatch, countries]);

  useEffect(() => {
    dispatch(
      actGetChoices({
        token: user?.token,
        url: END_POINTS["students_attributes.initial_location"].url,
      })
    )
      .unwrap()
      .then((res) => {
        const formattedChoices = res.map((location) => {
          return {
            label: location.name,
            value: location.id.toString(),
          };
        });
        setLocationOptions(formattedChoices);
      });
  }, [dispatch, user?.token]);


  return (
    <form action="post" onSubmit={handleSubmit(onSubmit)}>

      <Heading text="إضافة طالب جديد للعائلة " />
      <Heading text="تفاصيل العائلة " />

        {/* ********************* Add Family ************************* */}

      <Row>
        <Dropdown
          label="الحالة"
          name="status"
          register={register}
          options={STUDENT_STATUS}
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
        <MultiChoices
          register={register}
          name="student_curriculum"
          error={
            errors.student_curriculum?.message as string
          }
        />

        
      </Row>

      <Row>
      <MultiChoices
          register={register}
          name="subject_choices"
          error={errors.subject_choices?.message as string}
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
        />

        <Dropdown
          label=" الموقع الافتراضي"
          register={register}
          options={locationOptions}
          name="initial_location"
          error={
            errors.initial_location?.message as string
          }
        />
      </Row>

      <Row>
        <MultiChoices
          register={register}
          name="initial_teachers"
          error={
            errors.initial_teachers?.message as string
          }
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

      <NotificationForm
        register={register}
        sms_lesson_reminders="sms_lesson_reminders"
        email_lesson_reminders="email_lesson_reminders"
        whatsapp_reminders="whatsapp_reminders"
        app_reminders="app_reminders"
        web_reminders="web_reminders"
        send_welcome_email="send_welcome_email"
        user_account="user_account"
        errors={errors}
      />

      <hr className="hr" />

      <div className="flex-end">
        <button type="submit" className="btn submit-btn">
          حفظ
        </button>

        <button
          type="button"
          onClick={() => {
            reset();
          }}
          className="btn"
        >
          يلغى
        </button>
      </div>
    </form>
  );
};

export default AddStudentToFamilyForm;

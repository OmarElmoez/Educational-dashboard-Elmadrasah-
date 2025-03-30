import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { TDataForSpecificStudent } from "@/schemas/AddStudentSchema.ts";
import { Dropdown, InputField, LoadingIndicator, MultiChoices, PhoneField, Row } from "@/components";
import { useForm } from "react-hook-form";
import { SERVICE_OPTIONS, STATUS_OPTIONS, TIMEZONES_OPTIONS } from "@/constants";
import { Heading } from "@/components/UI";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditStudentSchema, TEditStudentSchema } from "@/schemas/EditStudentSchema.ts";
import { actSendDataToServer } from "@/store/single-actions";
import { useAppDispatch } from "@/store/hooks.ts";
import { useFeedback } from "@/store/context";
import { TLoading } from "@/types/shared.ts";
import { getSpecificStudent } from "@/services/studentsAndTeachers.ts";

const EditStudent = () => {

  const {id} = useParams();

  const location = useLocation();
  const [loading, setLoading] = useState<TLoading>('idle')

  const [specificStudentData, setSpecificStudentData] = useState<TDataForSpecificStudent>(location.state)

  useEffect(() => {
    if (!specificStudentData && id) {
      getSpecificStudent({id}).then((data) => {
        setSpecificStudentData(data)
      })
    }
  }, [id, specificStudentData]);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: {errors},
    setValue
  } = useForm<TEditStudentSchema>({
    mode: "onBlur",
    resolver: zodResolver(EditStudentSchema),
  })

  const setPreviousData = useCallback((response: TDataForSpecificStudent) => {
    setValue('status', response.status ? "true" : "false");
    setValue('billing_method', response.billing_method);
    setValue('subject_choices', response.subject_choices as number[]);
    setValue('initial_services', response.initial_services as number[]);
    setValue('time_zone', response.time_zone ?? "")
  }, [setValue])

  useEffect(() => {
    if (specificStudentData) {
      reset(specificStudentData)
      setPreviousData(specificStudentData)
    }
  }, [reset, setPreviousData, specificStudentData]);

  const dispatch = useAppDispatch()

  const navigate = useNavigate();

  const {openFeedbackModal} = useFeedback();

  const onSubmit = (data: TEditStudentSchema) => {

    if (data.status === "") {
      openFeedbackModal('failed', "برجاء تحديد الحالة.");
      return;
    }

    const formattedServerData = {
      ...data,
      subject_choices: data['subject_choices'].map(subjectId => Number(subjectId)),
      initial_services: data['initial_services'].map(serviceId => Number(serviceId)),
      student_cost: data['student_cost'] || '0.00',
      billing_method: data['billing_method'],
      first_name: data['first_name'],
      last_name: data['last_name'],
      full_name: data['full_name'],
      email: data['email'],
      time_zone: data['time_zone'],
    }

    setLoading('pending');

    dispatch(
      actSendDataToServer({
        purpose: "edit_student",
        formData: formattedServerData,
        isEdit: true,
        id
      })
    )
    .unwrap()
    .then((res) => {
      if (typeof res === 'string' || (typeof res === "object" && res !== null && Object.values(res).every(errors => Array.isArray(errors)))) {
        setLoading('failed')
        openFeedbackModal('failed', "حدثت مشكلة أثناء إرسال طلبك.");
        return;
      }

      setLoading('succeeded')
      openFeedbackModal("succeeded", "تم تعديل بيانات الطالب بنجاح!");
      navigate(-1);
    })
    .catch((error) => {
      openFeedbackModal("failed", error);
    });
  }
  return (
    <>
      {!specificStudentData && <div className="loadingBox">
          <LoadingIndicator/>
      </div>}
      {loading === 'pending' && <div className="loadingBox">
          <LoadingIndicator/>
      </div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Dropdown
            label="الحالة"
            name="status"
            register={register}
            options={STATUS_OPTIONS}
            error={errors?.status?.message as string}
            isEdit
          />

          <InputField
            label="البريد الإلكتروني"
            placeholder="البريد الإلكتروني"
            register={register}
            name="email"
            error={errors?.email?.message as string}
          />
        </Row>

        <Row>
          <InputField
            label="الأسم الأول"
            placeholder="الأسم الأول"
            register={register}
            name="first_name"
            error={errors?.first_name?.message as string}
          />

          <InputField
            label="الأسم الأخير"
            placeholder="الأسم الأخير"
            register={register}
            name="last_name"
            error={errors?.last_name?.message as string}
          />
        </Row>

        <Row>
          <InputField
            label="الأسم بالكامل"
            placeholder="الأسم بالكامل"
            register={register}
            name="full_name"
            error=""
          />
        </Row>

        <Row>
          <Dropdown
            label="التوقيت الزمني"
            name="time_zone"
            options={TIMEZONES_OPTIONS}
            register={register}
            error={errors?.time_zone?.message as string}
            isEdit
          />

          <InputField
            label="العنوان"
            placeholder="الرياض / السعودية"
            register={register}
            name="address"
            error=""
          />
        </Row>

        <Row>
          <PhoneField
            name="mobile_phone"
            control={control as any}
            error={errors?.mobile_phone?.message as string}
            label="الهاتف المحمول"
          />
          <section className="group"></section>
        </Row>

        <hr className="hr"/>
        <Heading text="تفاصيل الطالب "/>

        <Row>
          <MultiChoices
            register={register}
            name="subject_choices"
            error={errors?.subject_choices?.message as string}
            setValue={setValue}
            predefinedChoices={specificStudentData && specificStudentData?.subject_choices}
          />

          <MultiChoices
            register={register}
            name="initial_services"
            error={errors?.initial_services?.message as string}
            setValue={setValue}
            predefinedChoices={specificStudentData && specificStudentData?.initial_services}
          />
        </Row>
        <hr className="hr"/>
        <Heading text=" تفاصيل الفاتورة"/>
        <Row>
          <Dropdown
            label="طريقة الدفع"
            name="billing_method"
            register={register}
            options={SERVICE_OPTIONS}
            error={errors?.billing_method?.message as string}
            isEdit
          />

          <InputField
            label=" خصم الطالب %"
            placeholder="اكتب الخصم"
            register={register}
            name="student_cost"
            error=""
            value={specificStudentData && specificStudentData?.student_cost}
          />
        </Row>

        <button type="submit" className="btn submit-btn" style={{marginTop: '2rem'}}>
          تعديل
        </button>
      </form>
    </>
  )
}

export default EditStudent
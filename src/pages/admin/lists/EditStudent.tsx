import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getSpecificStudent } from "@/services/studentsAndTeachers.ts";
import { TDataForSpecificStudent } from "@/schemas/AddStudentSchema.ts";
import {
  CircleLoadingIndecator,
  Dropdown,
  InputField,
  LoadingIndicator,
  MultiChoices,
  PhoneField,
  Row
} from "@/components";
import { useForm } from "react-hook-form";
import { SERVICE_OPTIONS, STATUS_OPTIONS, TIMEZONES_OPTIONS } from "@/constants";
import { Heading } from "@/components/UI";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditStudentSchema, TEditStudentSchema } from "@/schemas/EditStudentSchema.ts";
import { actSendDataToServer } from "@/store/single-actions";
import { useAppDispatch } from "@/store/hooks.ts";
import { useFeedback } from "@/store/context";

const EditStudent = () => {

  const {id} = useParams();

  const [specificStudentData, setSpecificStudentData] = useState<TDataForSpecificStudent>()

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: {isSubmitting, errors},
    setValue
  } = useForm<TEditStudentSchema>({
    mode: "onBlur",
    resolver: zodResolver(EditStudentSchema),
  })

  const setPreviousData = useCallback((response: TDataForSpecificStudent) => {
    setValue('billing_method', response.students_attributes[0].billing_method);
    setValue('subject_choices', response.students_attributes[0].subject_choices as number[]);
    setValue('initial_services', response.students_attributes[0].initial_services as number[]);
  }, [setValue])

  useEffect(() => {
    if (!id) return;
    getSpecificStudent({id}).then((data) => {
      setSpecificStudentData(data)
      reset(data)
      setPreviousData(data)
    })
  }, [id, reset, setPreviousData]);

  const dispatch = useAppDispatch()

  const navigate = useNavigate();

  const { openFeedbackModal } = useFeedback();

  const onSubmit = (data: TEditStudentSchema) => {

    const formattedServerData = {
      ...data,
      students_attributes: {
        subject_choices: data['subject_choices'].map(subjectId => Number(subjectId)),
        initial_services: data['initial_services'].map(serviceId => Number(serviceId)),
        student_cost: data['student_cost'],
        billing_method: data['billing_method'],
        first_name: data['first_name'],
        last_name: data['last_name'],
        full_name: data['full_name'],
        email: data['email'],
      }
    }
    dispatch(
      actSendDataToServer({
        purpose: "add_individual_student",
        formData: formattedServerData,
        isEdit: true,
        id
      })
    )
    .unwrap()
    .then((res) => {
      if (typeof res === 'string') {
        openFeedbackModal('failed', "حدثت مشكلة أثناء إرسال طلبك.");
        return;
      }
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Dropdown
            label="الحالة"
            name="status"
            register={register}
            options={STATUS_OPTIONS}
            error=""
          />

          <InputField
            label="البريد الإلكتروني"
            placeholder="البريد الإلكتروني"
            register={register}
            name="email"
            error=""
          />
        </Row>

        <Row>
          <InputField
            label="الأسم الأول"
            placeholder="الأسم الأول"
            register={register}
            name="first_name"
            error=""
          />

          <InputField
            label="الأسم الأخير"
            placeholder="الأسم الأخير"
            register={register}
            name="last_name"
            error=""
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
            error=""
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
            error=""
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
            error=""
            predefinedChoices={specificStudentData && specificStudentData?.students_attributes[0].subject_choices}
          />

          <MultiChoices
            register={register}
            name="initial_services"
            error=""
            predefinedChoices={specificStudentData && specificStudentData?.students_attributes[0].initial_services}
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
            error=""
          />

          <InputField
            label=" خصم الطالب %"
            placeholder="اكتب الخصم"
            register={register}
            name="student_cost"
            error=""
            value={specificStudentData && specificStudentData?.students_attributes[0].student_cost}
          />
        </Row>

        <button type="submit" className="btn submit-btn">
          {isSubmitting ? (
            <CircleLoadingIndecator size={16} color="#fff"/>
          ) : (
            "تعديل"
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            console.log(errors);
          }}
          className="btn cancel-btn"
        >
          يلغى
        </button>
      </form>
    </>
  )
}

export default EditStudent
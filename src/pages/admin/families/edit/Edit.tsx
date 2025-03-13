import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSpecificFamily, TSpecificFamilyResponse } from "@/services/families.ts";
import {
  Dropdown,
  InputField,
  LoadingIndicator,
  PhoneField,
  Row
} from "@/components";
import { STATUS_OPTIONS, TIMEZONES_OPTIONS } from "@/constants";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditFamilySchema, TEditFamilySchema } from "@/schemas/EditFamilySchema.ts";
import { useEffect, useState } from "react";
import { useFeedback } from "@/store/context";
import { useAppDispatch } from "@/store/hooks.ts";
import { actSendDataToServer } from "@/store/single-actions";
import { TLoading } from "@/types/shared.ts";

const EditFamily = () => {
  const {id} = useParams();

  const location = useLocation();
  const [specificFamilyData, setSpecificFamilyData] = useState<TSpecificFamilyResponse>(location.state)
  const {openFeedbackModal} = useFeedback();
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [loading, setLoading] = useState<TLoading>('idle')

  useEffect(() => {
    if (!specificFamilyData && id) {
      getSpecificFamily(id).then((data) => {
        setSpecificFamilyData(data)
      })
    }
  }, [id, specificFamilyData]);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<TEditFamilySchema>({
    mode: "onBlur",
    resolver: zodResolver(EditFamilySchema),
  })
  
  useEffect(() => {
    if (specificFamilyData) {
    reset(specificFamilyData)
    }
  }, [reset, specificFamilyData])

  const onSubmit = async (data: TEditFamilySchema) => {
    if (data.status === "") {
      openFeedbackModal('failed', "برجاء تحديد الحالة.");
      return;
    }

    setLoading("pending")

    try {
      const res = await dispatch(
        actSendDataToServer({
          purpose: "add_family",
          formData: data,
          isEdit: true,
          id
        })
      )
        .unwrap()

      if (typeof res === 'string') {
        setLoading('failed')
        openFeedbackModal('failed', "حدثت مشكلة أثناء إرسال طلبك.");
        return;
      }

      setLoading('succeeded')
      openFeedbackModal("succeeded", "تم تعديل البيانات بنجاح!");
      navigate(-1);

    } catch (error) {
      setLoading('failed')
      openFeedbackModal("failed", error as string);
    }
  }

  return (
    <>
      {!specificFamilyData && <div className="loadingBox">
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
            error=""
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
            error={errors?.full_name?.message as string}
          />

          <Dropdown
            label="التوقيت الزمني"
            name="time_zone"
            options={TIMEZONES_OPTIONS}
            register={register}
            error={errors?.time_zone?.message as string}
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

        <button type="submit" className="btn submit-btn">
            تعديل
        </button>
      </form>
    </>
  )
}

export default EditFamily
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TSpecificFamilyResponse } from "@/services/families.ts";
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
  const specificFamilyData: TSpecificFamilyResponse = location.state;
  const {openFeedbackModal} = useFeedback();
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [loading, setLoading] = useState<TLoading>('idle')

  const {
    handleSubmit,
    register,
    control,
    reset,
  } = useForm<TEditFamilySchema>({
    mode: "onBlur",
    resolver: zodResolver(EditFamilySchema),
  })
  
  useEffect(() => {
    reset(specificFamilyData)
  }, [reset, specificFamilyData])

  const onSubmit = async (data: TEditFamilySchema) => {
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

          <Dropdown
            label="التوقيت الزمني"
            name="time_zone"
            options={TIMEZONES_OPTIONS}
            register={register}
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

        <button type="submit" className="btn submit-btn">
            تعديل
        </button>
      </form>
    </>
  )
}

export default EditFamily
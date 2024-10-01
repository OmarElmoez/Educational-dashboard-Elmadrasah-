import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CircleLoadingIndecator,
  Dropdown,
  Heading,
  Row,
  SingleCheckbox,
} from "@/components";
import { InputField } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetDropdownOptions } from "@/store/single-actions";
import actSendDataToServer from "@/store/single-actions/actSendDataToServer";
import { useFeedback } from "@/store/context";
import { TOption } from "@/types/Dropdown";
import { STATUS_OPTIONS } from "@/constants/dropdown-options";

const invoiceHistorySchema = z.object({
  amount: z.string().min(1, "برجاء ادخال الكمية "),
  date: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  payment: z.string().min(1, "برجاء اختيار  طريقة الدفع"),
  send: z.boolean().optional(),
});
export type TInvoiceHistoryFormData = z.infer<typeof invoiceHistorySchema>;

// -------------------------------------------------------------------------

const InvoiceِApproveForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { openFeedbackModal } = useFeedback();

  const [locationOptions, setLocationOptions] = useState<TOption[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TInvoiceHistoryFormData>({
    mode: "onBlur",
    resolver: zodResolver(invoiceHistorySchema),
  });

  const onSubmit = (data: TInvoiceHistoryFormData) => {
    // dispatch(
    //   actSendDataToServer({
    //     token: user?.token,
    //     purpose: "add_individual_student",
    //     formData: data,
    //   })
    // )
    //   .unwrap()
    //   .then(() => {
    //     openFeedbackModal("succeeded", "تم اضافة الطالب بنجاح!");
    //   })
    //   .catch((error) => {
    //     openFeedbackModal("failed", "حدثت مشكلة أثناء إرسال طلبك.", error);
    //   });
  };

  useEffect(() => {
    dispatch(
      actGetDropdownOptions({ token: user?.token, optionsFor: "locations" })
    )
      .unwrap()
      .then((data) => {
        setLocationOptions(data);
      });
  }, [dispatch, user?.token]);

  return (
    <form action="post" onSubmit={handleSubmit(onSubmit)}>
      <Heading text="إضافة طالب جديد مستقل" />
      <Heading text="معلومات الاتصال" />

      <Row>
        <InputField
          label=" المبلغ"
          isRequired
          placeholder=" المبلغ"
          register={register}
          name="amount"
          error={errors.amount?.message as string}
        />
        <InputField
          type="date"
          label="تاريخ  "
          placeholder=" يوم / شهر / سنه"
          register={register}
          name="date"
          error={errors.date?.message as string}
        />
        <InputField
          label="وصف "
          isRequired
          placeholder="الأسم الأخير"
          register={register}
          name="description"
          error={errors.description?.message as string}
        />
        <Dropdown
          label="طريقة الدفع"
          name="payment"
          register={register}
          options={STATUS_OPTIONS}
          error={errors.payment?.message as string}
        />

        <SingleCheckbox
          register={register}
          name="send"
          label=" ارسال الايصال ؟  "
          error={errors?.send?.message as string}
        />
      </Row>

      <div className="submit-buttons-container">
        <button type="submit" className="btn submit-btn">
          {isSubmitting ? (
            <CircleLoadingIndecator size={16} color="#fff" />
          ) : (
            " حفظ الدفع"
          )}
        </button>
      </div>
    </form>
  );
};

export default InvoiceِApproveForm;

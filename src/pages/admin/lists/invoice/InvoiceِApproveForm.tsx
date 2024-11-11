import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {CircleLoadingIndecator, Dropdown, InputField, Row, SingleCheckbox,} from "@/components";
import {Heading} from "@/components/UI"
import {useAppDispatch} from "@/store/hooks";
import actSendDataToServer from "@/store/single-actions/actSendDataToServer";
import {useFeedback} from "@/store/context";
import {PAYMENT_OPTIONS} from "@/constants/dropdown-options";
import {useNavigate} from "react-router-dom";

const invoiceHistorySchema = z.object({
  amount: z.string().min(1, "برجاء ادخال المبلغ"),
  date: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  payment: z.string().min(1, "برجاء اختيار  طريقة الدفع"),
  send: z.boolean().optional(),
});
type TInvoiceHistoryFormData = z.infer<typeof invoiceHistorySchema>;

type TKeysToOmit = "customer_id" | "invoice_id";

export type TInvoiceHistoryFormDataForServer = Omit<
  TInvoiceHistoryFormData,
  TKeysToOmit
> & {
  customer_id: number;
  invoice_id: number;
};
// -------------------------------------------------------------------------

const InvoiceApproveForm = ({
                              customer_id,
                              invoice_id,
                              amount,
                              date,
                            }: {
  customer_id: number;
  invoice_id: number;
  amount: string;
  date: string;
}) => {
  const dispatch = useAppDispatch();

  const {openFeedbackModal} = useFeedback();

  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<TInvoiceHistoryFormData>({
    mode: "onBlur",
    resolver: zodResolver(invoiceHistorySchema),
    defaultValues: {
      amount: amount,
      date: date,
    },
  });

  const navigate = useNavigate()

  const onSubmit = (data: TInvoiceHistoryFormData) => {

    const serverData: TInvoiceHistoryFormDataForServer = {
      ...data,
      customer_id: customer_id,
      invoice_id: invoice_id,
    };

    dispatch(
      actSendDataToServer({
        purpose: "create_payment",
        formData: serverData,
      })
    )
    .unwrap()
    .then((res) => {
      console.log('from approve invoice: ', res)
      if (res !== "Invoice already paid or not approved for pay.") {
        openFeedbackModal("succeeded", "تم الدفع بنجاح");
        navigate('/admin/calendar/all-unscheduled-list')
      } else {
        openFeedbackModal("failed", "حدثت مشكلة أثناء إرسال طلبك.", res);
      }
      // dispatch action to get the updated data
    })
  };

  useEffect(() => {
    setValue("amount", amount);
  }, [amount, setValue]);

  return (
    <form action="post" onSubmit={handleSubmit(onSubmit)}>
      <Heading text="سجل الدفع"/>

      <Row style={{flexWrap: "wrap"}}>
        <InputField
          label=" المبلغ"
          isRequired
          placeholder=" المبلغ"
          register={register}
          name="amount"
          disabled={amount === "0"}
          error={errors.amount?.message as string}
        />
        <InputField
          type="date"
          label="تاريخ  "
          placeholder=" يوم / شهر / سنه"
          register={register}
          name="date"
          disabled
          error={errors.date?.message as string}
        />
        <InputField
          label="وصف "
          isRequired
          register={register}
          name="description"
          error={errors.description?.message as string}
        />
        <Dropdown
          label="طريقة الدفع"
          name="payment"
          register={register}
          options={PAYMENT_OPTIONS}
          error={errors.payment?.message as string}
        />
        <div>
          <SingleCheckbox
            register={register}
            name="send"
            label=" ارسال الايصال ؟  "
            error={errors?.send?.message as string}
            className=""
          />
        </div>
      </Row>

      <div className="submit-buttons-container">
        <button
          type="submit"
          className={`btn submit-btn ${amount === "0" ? "disabled" : ""}`}
          disabled={isSubmitting || amount === "0"}
        >
          {isSubmitting ? (
            <CircleLoadingIndecator size={16} color="#fff"/>
          ) : (
            " حفظ الدفع"
          )}
        </button>
      </div>
    </form>
  );
};

export default InvoiceApproveForm;

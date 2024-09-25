import {
  CircleLoadingIndecator,
  Dropdown,
  Heading,
  Row,
  SingleCheckbox,
} from "@/components";
import { InputField } from "@/components";
import { STATUS_OPTIONS, EMPLOYEE_TITLES } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  CreateInvoiceSchema,
  TCreateInvoiceFormData,
  // TCreateInvoiceSchemaFormDataForServer,
} from "@/schemas/CreateInvoiceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import CloseButton from "@/assets/close-button.svg?react";
import { actGetDropdownOptions } from "@/store/single-actions";
import { TOption } from "@/types/Dropdown";
import RichTextEditor from "@/components/forms/inputField/RichTextEditor";

const CreateInvoiceForm = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const [customersList, setCustomersList] = useState<TOption[]>([]);

  // const { openFeedbackModal } = useFeedback();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TCreateInvoiceFormData>({
    mode: "onBlur",
    resolver: zodResolver(CreateInvoiceSchema),
    defaultValues: {
      charges: [
        {
          title: "",
          description: "",
          quantity: "",
          unit_price: "",
          discount_rate: "",
          amount: "",
        },
      ],
      packages: [
        {
          description: "",
          quantity: "",
          unit_price: "",
          discount_rate: "",
          amount: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "charges",
  });

  const handleAdd = () => {
    console.log("add");

    // append({ start_time: "", end_time: "", description: "" });
  };
  const handleRemove = (index: number) => {
    remove(index); // Removes field at the specified index
  };

  const onSubmit = (data: TCreateInvoiceFormData) => {
    // dispatch(
    //   actSendDataToServer({
    //     token: user?.token,
    //     formData: data,
    //     hasFiles: true,
    //     purpose: "add_employee",
    //   })
    // )
    //   .unwrap()
    //   .then(() => {
    //     openFeedbackModal("succeeded", "تم اضافة الموظف بنجاح!");
    //   })
    //   .catch((error) => {
    //     openFeedbackModal("failed", "حدثت مشكلة أثناء إرسال طلبك.", error);
    //   });
  };

  useEffect(() => {
    dispatch(
      actGetDropdownOptions({ token: user?.token, optionsFor: "customers" })
    ).then((res) => {
      if (Array.isArray(res?.payload)) {
        setCustomersList(res.payload);
      } else {
        setCustomersList([]);
      }
      console.log("xxxr", res);
    });
  }, [dispatch, user?.token]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading text="انشاء فاتورة" />

      <Row>
        <Dropdown
          label="العميل"
          name="customer"
          register={register}
          // placeholder="حدد العميل"
          isRequired
          options={customersList}
          error={errors.customer?.message as string}
        />
      </Row>

      <Row>
        <InputField
          label="تاريخ"
          type="date"
          placeholder="02-05-2024"
          isRequired
          register={register}
          name="date"
          error={errors.date?.message as string}
        />
        <InputField
          label=" تاريخ الاستحقاق"
          type="date"
          placeholder="02-05-2024"
          isRequired
          register={register}
          name="due_date"
          error={errors.due_date?.message as string}
        />
        {/* ****** create new InputField style ******** */}
        <InputField
          label=" رقم"
          placeholder="INV- 0001"
          isRequired
          register={register}
          name="formatted_number"
          error={errors.formatted_number?.message as string}
        />

        <InputField
          label=" مرجع"
          placeholder="مرجع "
          isRequired
          register={register}
          name="reference"
          error={errors.reference?.message as string}
        />

        {/* ******** options  ******** */}
        <Dropdown
          label="المعاملة الضريبية"
          // placeholder="حصريا للضريبة"
          register={register}
          options={EMPLOYEE_TITLES}
          name="tax_treatment"
          isRequired
          error={errors.tax_treatment?.message as string}
        />
      </Row>

      {/* ********* START ROW ********************* */}
      {fields.map((field, index) => (
        <Row key={field.id} style={{ alignItems: "center" }}>
          <InputField
            label="الخدمة"
            placeholder="الخدمة"
            name={`charges.${index}.title`}
            register={register}
            error={errors?.charges?.[index]?.title?.message as string}
          />

          <InputField
            label="وصف "
            placeholder="وصف"
            name={`charges.${index}.description`}
            register={register}
            error={errors?.charges?.[index]?.description?.message as string}
          />

          <InputField
            label="الكمية"
            placeholder="الكمية"
            name={`charges.${index}.quantity`}
            register={register}
            error={errors?.charges?.[index]?.quantity?.message as string}
          />

          <InputField
            label="سعر الوحدة"
            placeholder="سعر الوحدة"
            name={`charges.${index}.unit_price`}
            register={register}
            error={errors?.charges?.[index]?.unit_price?.message as string}
          />

          <InputField
            label="خصم% "
            placeholder="خصم% "
            name={`charges.${index}.discount_rate`}
            register={register}
            error={errors?.charges?.[index]?.discount_rate?.message as string}
          />
          <InputField
            label="المبلغ"
            placeholder="المبلغ"
            name={`charges.${index}.amount`}
            register={register}
            error={errors?.charges?.[index]?.amount?.message as string}
          />

          {/* *********** add button should be "go"  ************* */}
          {index > 0 ? (
            <div className="mainContainer">
              <button type="button" onClick={() => handleRemove(index)}>
                <CloseButton />
              </button>
              <button
                className="add-action-btn mr-1"
                type="button"
                onClick={handleAdd}
              >
                + إضافة مواقيت عمل
              </button>
            </div>
          ) : (
            <div style={{ alignItems: "center" }}></div>
          )}
        </Row>
      ))}
      {/* ********* END ROW ********************* */}

      <Row>
        {/* ******** ENHANCE THIS DROPDOWN  ********* */}
        <Dropdown
          label="اضافة باقة"
          // placeholder="اضافة باقة"
          name="add"
          register={register}
          // placeholder="حدد العميل"
          options={STATUS_OPTIONS}
          error={errors.add?.message as string}
        />

        <button onClick={() => console.log("Go clicked")}>اذهب</button>
      </Row>

      {/* ********* START ROW ********************* */}
      {fields.map((field, index) => (
        <Row key={field.id} style={{ alignItems: "center" }}>
          <InputField
            label="الخدمة"
            placeholder="الخدمة"
            name={`charges.${index}.title`}
            register={register}
            error={errors?.charges?.[index]?.title?.message as string}
          />
          {/* ********** REVIEW NAMES  ****************** */}
          <InputField
            label="المجموع الفرعى"
            placeholder=" 0.00"
            isRequired
            register={register}
            name={`packages.${index}.unit_price`}
            error={errors?.packages?.[index]?.unit_price?.message as string}
          />
          <InputField
            label=" ضريبة المبيعات"
            placeholder=" 0.00"
            isRequired
            register={register}
            name={`packages.${index}.discount_rate`}
            error={errors?.packages?.[index]?.discount_rate?.message as string}
          />
          <InputField
            label=" الاجمالى "
            placeholder=" 0.00"
            isRequired
            register={register}
            name={`packages.${index}.amount`}
            error={errors?.packages?.[index]?.amount?.message as string}
          />

          {/* *********** add button should be "go"  ************* */}
          {index > 0 ? (
            <div className="mainContainer">
              <button type="button" onClick={() => handleRemove(index)}>
                <CloseButton />
              </button>
              <button
                className="add-action-btn mr-1"
                type="button"
                onClick={handleAdd}
              >
                + إضافة مواقيت عمل
              </button>
            </div>
          ) : (
            <div style={{ alignItems: "center" }}></div>
          )}
        </Row>
      ))}
      {/* ********* END ROW ********************* */}

      {/* ******* REVIE NAME  ******** */}

      <Row>
        <InputField
          label=" المجموع "
          placeholder=" 0.00"
          isRequired
          register={register}
          name="total"
          error={errors.total?.message as string}
        />
      </Row>

      <Row>
        <SingleCheckbox
          register={register}
          name="send_email"
          label=" إرسال الفاتورة بالبريد الألكتروني "
          // placeholder="سيتم إرسال البريد الإلكتروني إذا تم النقر علي ”موافقة”"
          error={errors.send_email?.message as string}
        />
      </Row>

      <Row>
        {/* <p>text</p>
        <InputField
          label=" تعليمات "
          placeholder=" 0.00"
          isRequired
          register={register}
          name="terms_text"
          error={errors.terms_text?.message as string}
        /> */}

        <RichTextEditor   register={register}
          name="terms_text" />
      </Row>
      <div className="submit-buttons-container">
        <button type="submit" className="btn submit-btn">
          {isSubmitting ? (
            <CircleLoadingIndecator size={16} color="#fff" />
          ) : (
            " حفظ"
          )}
        </button>
        *{isSubmitting}*
        <button
          type="button"
          onClick={() => {
            reset();
          }}
          className="btn cancel-btn"
        >
          يلغى
        </button>
        <button
          type="button"
          onClick={() => {
            console.log("errors", errors);
            console.log("values", control._getWatch("subject_choices"));
          }}
          className="btn cancel-btn"
        >
          test
        </button>
      </div>
    </form>
  );
};

export default CreateInvoiceForm;

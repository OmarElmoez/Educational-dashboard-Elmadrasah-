import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  actGetDropdownOptions,
  actGetData,
  actSendDataToServer,
} from "@/store/single-actions";
import { useFeedback } from "@/store/context";
import {
  CircleLoadingIndecator,
  Dropdown,
  DropdownWithSearch,
  Heading,
  Row,
  SingleCheckbox,
} from "@/components";
import { InputField } from "@/components";
import {
  CreateInvoiceSchema,
  TCreateInvoiceFormData,
  // TCreateInvoiceSchemaFormDataForServer,
} from "@/schemas/CreateInvoiceSchema";
import { TOption } from "@/types/Dropdown";
import {
  ADD_SERVICE_OPTIONS,
  REPORT_OPTIONS,
  TAX_TREATMENT_OPTIONS,
} from "@/constants";
import CloseButton from "@/assets/close-button.svg?react";
import styles from "./createInvoice.module.css";
import { TService, TTax_Treatment } from "@/types/shared";

const { row, close_btn_container } = styles;

interface filterRes {
  service: string;
  description: string;
  quantity: string;
  unit_price: string | number;
}
interface vatRes {
  id: number;
  created_at: string;
  updated_at: string;
  country: string;
  code: string;
  vat_rate: string;
}

type TServiceHandler = {
  [key in TService]: () => void;
};

// ------------------------------------------------------------------------

const CreateInvoiceForm = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { openFeedbackModal } = useFeedback();
  const navigate = useNavigate();

  const [customersList, setCustomersList] = useState<TOption[]>([]);
  const [servicesList, setServicesList] = useState<TOption[]>([]);
  const [dataStatus, setDataStatus] = useState<
    "Saved" | "Approved" | "Paid" | "Void"
  >("Saved");

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [serviceType, setServiceType] = useState<TService>();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TCreateInvoiceFormData>({
    mode: "onBlur",
    resolver: zodResolver(CreateInvoiceSchema),
    defaultValues: {
      tax_treatment: "Tax Exclusive",
      formatted_number: invoiceNumber,
      payment_allocations: [],
      charges: [],
      packages: [],
      lessons: [],
      filtration: [],
    },
  });

  const {
    fields: chargesFields,
    append: appendCharge,
    remove: removeCharge,
  } = useFieldArray({
    control,
    name: "charges",
  });

  const {
    fields: packagesFields,
    append: appendpackages,
    remove: removepackages,
  } = useFieldArray({
    control,
    name: "packages",
  });

  const {
    fields: lessonsFields,
    append: appendLessons,
    // remove: removeLessons,
  } = useFieldArray({
    control,
    name: "lessons",
  });

  const { fields: filtrationFields, append: appendfiltration } = useFieldArray({
    control,
    name: "filtration",
  });

  const handleAddCharge = () => {
    console.log("add charge");
    appendCharge({
      title: "",
      description: "",
      quantity: "",
      unit_price: "",
      discount_rate: "0",
      amount: "",
    });
  };

  const handleRemoveCharge = (index: number) => {
    removeCharge(index);
  };

  // const handleRemoveLessonsList = (index: number) => {
  //   removeLessons(index);
  // };

  const handleAddPackages = () => {
    appendpackages({
      service: "",
      description: "",
      quantity: "",
      unit_price: "",
      discount_rate: "0",
      amount: "",
    });
  };

  const handleRemovePackages = (index: number) => {
    removepackages(index);
  };

  const handleAddLessons = () => {
    appendfiltration({
      start_date: "",
      end_date: "",
      report: "All",
    });
  };

  const serviceHandlers: TServiceHandler = {
    charges: handleAddCharge,
    packages: handleAddPackages,
    lessons: handleAddLessons,
  };

  const watchFiltration = watch("filtration");

  const [customer, setCustomer] = useState("");

  const [treatmentType, setTreatmentType] = useState<TTax_Treatment>(
    watch("tax_treatment")
  );

  const handleFilter = async () => {
    if (watchFiltration) {
      const { start_date, end_date, report } = watchFiltration[0];

      try {
        if (!customer) {
          return openFeedbackModal("failed", "برجاء اختيار العميل اولا");
        }

        dispatch(
          actGetData({
            endpoint: "customer/lesson_filter/",
            params: {
              start_date,
              end_date,
              customer_id: customer,
              lesson_status: report,
            },
          })
        )
          .unwrap()
          .then((res: filterRes[]) => {
            if (res?.length) {
              res.forEach((item) =>
                appendLessons({
                  student: customer || "",
                  description: item?.description || "",
                  service: item?.service || "",
                  invoice_unit_price: item?.unit_price.toString() || "",
                  invoice_discount_rate: "",
                  invoice_amount: "",
                })
              );
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAppend = () => {
    const handler = serviceType && serviceHandlers[serviceType];

    if (handler) {
      handler();
      return;
    }
  };

  const handleServiceType = (service: TService) => {
    setServiceType(service);
  };

  const handleTaxTreatment = (treatment: TTax_Treatment) => {
    setTreatmentType(treatment);
  };

  const handleCustomer = (id: string) => {
    setCustomer(id);
    console.log("from dropdown with search:", id);
  };

  const handleGetVatValue = async () => {
    dispatch(actGetData({ endpoint: "customer/vat/?code=AE&paginate=false" }))
      .unwrap()
      .then((res: vatRes[]) => setValue("tax_count", `${res[0].vat_rate}%`));
  };

  const watchFields = watch(["tax_treatment", "tax_count"]);

  //  calculate packagesAmount and chargesAmount
  const calculateAmounts = useCallback(() => {
    let packagesAmount = 0;
    let chargesAmount = 0;

    packagesFields?.forEach((_, index) => {
      packagesAmount += Number(watch(`packages.${index}.amount`)) || 0;
    });

    chargesFields?.forEach((_, index) => {
      chargesAmount += Number(watch(`charges.${index}.amount`)) || 0;
    });

    return { packagesAmount, chargesAmount };
  }, [packagesFields, chargesFields, watch]);

  // TAX
  const calculateTotal = useCallback(
    (
      subtotal: number,
      salesTaxRate: number
    ): { total: number; salesTax: number; subtotal: number } => {
      let total = subtotal;
      let salesTax = 0;

      // const [taxTreatment] = watchFields;

      switch (treatmentType) {
        case "Tax Exclusive":
          salesTax = (salesTaxRate / 100) * subtotal;
          total = subtotal + salesTax;
          subtotal;
          break;

        case "Tax Inclusive":
          salesTax = (salesTaxRate / 100) * subtotal;
          subtotal = subtotal - salesTax;
          total = subtotal + salesTax;
          break;

        case "Tax Exempt":
          salesTax = 0;
          total = subtotal;
          subtotal;
          break;

        default:
          throw new Error("Invalid tax treatment");
      }

      return { total, salesTax, subtotal };
    },
    [treatmentType]
  );

  const handleCalcTax = useCallback(() => {
    const { packagesAmount, chargesAmount } = calculateAmounts();

    const sub_total = packagesAmount + chargesAmount;

    setValue("subtotal", sub_total.toFixed(2));

    const [tax_treatment, tax_count] = watchFields;

    if (tax_treatment !== null && tax_count !== "") {
      const { total, salesTax, subtotal } = calculateTotal(
        parseFloat(sub_total.toString()),
        parseFloat(tax_count)
      );

      setValue("total", total.toFixed(2));
      setValue("sales_tax_total", salesTax.toFixed(2));
      setValue("subtotal", subtotal.toFixed(2));
    }
  }, [calculateAmounts, calculateTotal, setValue, watchFields]);

  useEffect(() => {
    handleCalcTax();
  }, [handleCalcTax, treatmentType]);

  const handleChargeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    const unitPrice = name.includes("unit_price")
      ? parseFloat(value)
      : parseFloat(watch(`charges.${index}.unit_price`) || "0");
    const quantity = name.includes("quantity")
      ? parseFloat(value)
      : parseFloat(watch(`charges.${index}.quantity`) || "0");
    const discountRate = name.includes("discount_rate")
      ? parseFloat(value)
      : parseFloat(watch(`charges.${index}.discount_rate`) || "0");

    const amount = unitPrice * quantity * (1 - discountRate / 100);

    if (!isNaN(amount)) {
      setValue(`charges.${index}.amount`, amount.toFixed(2));
    }

    calculateAmounts();
    handleCalcTax();
  };
  const handlePackagesChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    const unitPrice = name.includes("unit_price")
      ? parseFloat(value)
      : parseFloat(watch(`packages.${index}.unit_price`)) || 0;
    const quantity = name.includes("quantity")
      ? parseFloat(value)
      : parseFloat(watch(`packages.${index}.quantity`)) || 0;
    const discountRate = name.includes("discount_rate")
      ? parseFloat(value)
      : parseFloat(watch(`packages.${index}.discount_rate`) || "0");

    const amount = unitPrice * quantity * (1 - discountRate / 100);

    if (!isNaN(amount)) {
      setValue(`packages.${index}.amount`, amount.toFixed(2));
    }

    calculateAmounts();
    handleCalcTax();
  };

  useEffect(() => {
    dispatch(
      actGetDropdownOptions({ token: user?.token, optionsFor: "customers" })
    ).then((res) => {
      console.log("customers:", res);

      if (Array.isArray(res?.payload)) {
        setCustomersList(res.payload);
      }
    });

    dispatch(
      actGetDropdownOptions({ token: user?.token, optionsFor: "services" })
    ).then((res) => {
      if (Array.isArray(res?.payload)) {
        setServicesList(res.payload);
      }
    });

    dispatch(actGetData({ endpoint: "customer/invoice/last" }))
      .unwrap()
      .then((res) => setInvoiceNumber(res.invoice_number));

    handleGetVatValue();
    // eslint-disable-next-line
  }, [dispatch, user?.token]);

  const onSubmit = (data: TCreateInvoiceFormData) => {
    data.formatted_number = invoiceNumber;
    data.tax_count = parseFloat(data.tax_count).toString();
    data.customer = customer;

    data.status = dataStatus;
    if (chargesFields?.length === 0 && packagesFields?.length === 0) {
      return openFeedbackModal("failed", "يجب عليك اختيار خدمة");
    }

    const serverData = {
      ...data,
      id: null,
    };

    console.log('from on Submit:', data);

    dispatch(
      actSendDataToServer({
        token: user?.token,
        formData: serverData,
        purpose: "create_invoice",
      })
    )
      .unwrap()
      .then((res) => {
        console.log("res:", res);
        openFeedbackModal("succeeded", "تم حفظ الفاتورة بنجاح!", "", 1000);
        navigate(`/admin/invoice-details/${res?.id}`);
      })
      .catch((error) =>
        openFeedbackModal("failed", "حدثت مشكلة أثناء إرسال طلبك.", error)
      );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading text="انشاء فاتورة" />

      <Row>
        <DropdownWithSearch
          options={customersList}
          handleChange={handleCustomer}
        />
        {/* <Dropdown
          label="العميل"
          name="customer"
          register={register}
          // placeholder="حدد العميل"
          isRequired
          options={customersList}
          handleChange={handleCustomer}
          error={errors?.customer?.message as string}
        /> */}
      </Row>

      <div className={row}>
        <InputField
          label="تاريخ"
          type="date"
          placeholder="02-05-2024"
          isRequired
          register={register}
          name="date"
          error={errors?.date?.message as string}
        />
        <InputField
          label=" تاريخ الاستحقاق"
          type="date"
          placeholder="02-05-2024"
          isRequired
          register={register}
          name="due_date"
          error={errors?.due_date?.message as string}
        />
        {/* ****** create new InputField style ******** */}
        {/* <section> */}
        <InputField
          label="رقم الفاتورة"
          placeholder={`INV- ${invoiceNumber}`}
          disabled
          value={invoiceNumber}
          register={register}
          name="formatted_number"
          error={errors?.formatted_number?.message as string}
        />
        {/* <div>-INV</div> */}
        {/* </section> */}

        <InputField
          label=" مرجع"
          placeholder="مرجع "
          isRequired
          register={register}
          name="reference"
          error={errors?.reference?.message as string}
        />

        {/* ******** options  ******** */}
        <Dropdown
          label="المعاملة الضريبية"
          // placeholder="حصريا للضريبة"
          register={register}
          options={TAX_TREATMENT_OPTIONS}
          name="tax_treatment"
          isRequired
          handleChange={handleTaxTreatment}
          error={errors?.tax_treatment?.message as string}
        />
      </div>

      <Row>
        <Dropdown
          label="اضافة خدمة"
          name="add"
          register={register}
          options={ADD_SERVICE_OPTIONS}
          handleChange={handleServiceType}
          error={errors?.add?.message as string}
        />

        <article className="group addBtn">
          <button
            type="button"
            onClick={handleAppend}
            className="btn submit-btn"
          >
            اضافة
          </button>
        </article>
      </Row>

      {/* ********* START ROW ********************* */}
      {chargesFields.map((field, index) => (
        <div key={field.id} className={row}>
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
            onChange={(e) => handleChargeChange(e, index)}
            name={`charges.${index}.quantity`}
            register={register}
            error={errors?.charges?.[index]?.quantity?.message as string}
          />

          <InputField
            label="سعر الوحدة"
            placeholder="سعر الوحدة"
            onChange={(e) => handleChargeChange(e, index)}
            name={`charges.${index}.unit_price`}
            register={register}
            error={errors?.charges?.[index]?.unit_price?.message as string}
          />

          <InputField
            label="خصم% "
            placeholder="خصم% "
            onChange={(e) => handleChargeChange(e, index)}
            name={`charges.${index}.discount_rate`}
            register={register}
            error={errors?.charges?.[index]?.discount_rate?.message as string}
          />

          <InputField
            label="المبلغ"
            placeholder="المبلغ"
            name={`charges.${index}.amount`}
            register={register}
            disabled
            error={errors?.charges?.[index]?.amount?.message as string}
          />
          <div className={close_btn_container}>
            <button type="button" onClick={() => handleRemoveCharge(index)}>
              <CloseButton />
            </button>
          </div>
        </div>
      ))}

      {/* ********* END ROW ********************* */}

      {/* ********* START ROW ********************* */}
      {packagesFields.map((field, index) => (
        <div key={field.id} className={row}>
          <Dropdown
            label="الخدمة"
            //  placeholder="الخدمة"
            options={servicesList}
            name={`packages.${index}.service`}
            register={register}
            error={errors?.packages?.[index]?.service?.message as string}
          />

          <InputField
            label="وصف "
            placeholder="وصف"
            name={`packages.${index}.description`}
            register={register}
            error={errors?.packages?.[index]?.description?.message as string}
          />

          <InputField
            label="الكمية"
            placeholder="الكمية"
            name={`packages.${index}.quantity`}
            register={register}
            onChange={(e) => handlePackagesChange(e, index)}
            error={errors?.packages?.[index]?.quantity?.message as string}
          />

          <InputField
            label="سعر الوحدة"
            placeholder="سعر الوحدة"
            name={`packages.${index}.unit_price`}
            register={register}
            onChange={(e) => handlePackagesChange(e, index)}
            error={errors?.packages?.[index]?.unit_price?.message as string}
          />

          <InputField
            label="خصم% "
            placeholder="خصم% "
            name={`packages.${index}.discount_rate`}
            register={register}
            onChange={(e) => handlePackagesChange(e, index)}
            error={errors?.packages?.[index]?.discount_rate?.message as string}
          />
          <InputField
            label="المبلغ"
            placeholder="المبلغ"
            disabled
            name={`packages.${index}.amount`}
            register={register}
            error={errors?.packages?.[index]?.amount?.message as string}
          />

          <div className={close_btn_container}>
            <button type="button" onClick={() => handleRemovePackages(index)}>
              <CloseButton />
            </button>
          </div>
        </div>
      ))}
      {/* ********* END ROW ********************* */}

      {/* ********* START ROW ********************* */}
      {filtrationFields.map((field, index) => (
        <div key={field.id} className={row}>
          <InputField
            label=" تاريخ البدء"
            type="date"
            placeholder="02-05-2024"
            isRequired
            register={register}
            name={`filtration.${index}.start_date`}
            error={errors?.filtration?.[index]?.start_date?.message as string}
          />
          <InputField
            label=" تاريخ النهاية"
            type="date"
            placeholder="02-05-2024"
            isRequired
            register={register}
            name={`filtration.${index}.end_date`}
            error={errors?.filtration?.[index]?.end_date?.message as string}
          />
          <Dropdown
            label="التقرير"
            options={REPORT_OPTIONS}
            register={register}
            name={`filtration.${index}.report`}
            error={errors?.filtration?.[index]?.report?.message as string}
          />

          <div className="group addBtn" style={{ maxWidth: "fit-content" }}>
            <button
              type="button"
              onClick={handleFilter}
              className="btn submit-btn"
            >
              عرض
            </button>
          </div>
        </div>
      ))}
      {/* ********* END ROW ********************* */}

      {/* ********* START ROW ********************* */}
      {/* ********* WHAT SHOULD BE HERE ? ********************* */}
      {lessonsFields.map((field, index) => (
        <div key={field.id} className={row}>
          <InputField
            label="الخدمة"
            placeholder="الخدمة"
            name={`lessons.${index}.service`}
            register={register}
            error={errors?.lessons?.[index]?.service?.message as string}
          />
          <InputField
            label="وصف "
            placeholder="وصف"
            name={`lessons.${index}.description`}
            register={register}
            error={errors?.lessons?.[index]?.description?.message as string}
          />

          {/* <InputField
            label="الكمية"
            placeholder="الكمية"
            onChange={(e) => handleChargeChange(e, index)}
            name={`lessons.${index}.quantity`}
            register={register}
            error={errors?.lessons?.[index]?.quantity?.message as string}
          /> */}

          <InputField
            label="سعر الوحدة"
            placeholder="سعر الوحدة"
            onChange={(e) => handleChargeChange(e, index)}
            name={`lessons.${index}.invoice_unit_price`}
            register={register}
            error={
              errors?.lessons?.[index]?.invoice_unit_price?.message as string
            }
          />

          <InputField
            label="خصم% "
            placeholder="خصم% "
            onChange={(e) => handleChargeChange(e, index)}
            name={`lessons.${index}.invoice_discount_rate`}
            register={register}
            error={
              errors?.lessons?.[index]?.invoice_discount_rate?.message as string
            }
          />

          <InputField
            label="المبلغ"
            placeholder="المبلغ"
            name={`lessons.${index}.invoice_amount`}
            register={register}
            disabled
            error={errors?.lessons?.[index]?.invoice_amount?.message as string}
          />
          <div className={close_btn_container}>
            <button type="button" onClick={() => handleRemoveCharge(index)}>
              <CloseButton />
            </button>
          </div>
        </div>
      ))}

      {/* ********* END ROW ********************* */}
      <hr className="hr" />

      <Row>
        {/* ****** REVIEW NAMES ******* */}

        {/* for: product price */}
        <InputField
          label="المجموع الفرعى"
          placeholder="0.00"
          disabled
          register={register}
          name="subtotal"
          error={errors?.subtotal?.message as string}
        />
        <InputField
          label=" ضريبة المبيعات"
          placeholder="0.00"
          register={register}
          disabled
          name="tax_count"
          error={errors?.tax_count?.message as string}
        />

        <InputField
          label="قيمة الضريبة"
          placeholder=" 0.00"
          register={register}
          name="sales_tax_total"
          disabled
          error={errors?.sales_tax_total?.message as string}
        />
      </Row>
      <hr className="hr" />

      <Row>
        <InputField
          label=" المجموع "
          placeholder=" 0.00"
          disabled
          register={register}
          name="total"
          error={errors?.total?.message as string}
        />
        <article className="group"></article>
      </Row>

      <Row>
        <SingleCheckbox
          register={register}
          name="send_email"
          label=" إرسال الفاتورة بالبريد الألكتروني "
          // placeholder="سيتم إرسال البريد الإلكتروني إذا تم النقر علي ”موافقة”"
          error={errors?.send_email?.message as string}
        />
      </Row>

      <Heading text="تعليمات" />
      <Row>
        <InputField
          label=""
          textarea
          register={register}
          name="terms_text"
          error={errors?.terms_text?.message as string}
        />
      </Row>
      <div className="submit-buttons-container">
        <button type="submit" className="btn submit-btn">
          {isSubmitting ? (
            <CircleLoadingIndecator size={16} color="#fff" />
          ) : (
            " حفظ"
          )}
        </button>

        <button
          onClick={() => {
            setDataStatus("Approved");
          }}
          className="btn cancel-btn"
        >
          يعتمد
        </button>

        <button
          type="button"
          onClick={() => {
            reset();
          }}
          className="btn cancel-btn"
        >
          يلغى
        </button>
      </div>
    </form>
  );
};

export default CreateInvoiceForm;

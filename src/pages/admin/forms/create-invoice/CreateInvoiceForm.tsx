import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetDropdownOptions } from "@/store/single-actions";
import actSendDataToServer from "@/store/single-actions/actSendDataToServer";
import { useFeedback } from "@/store/context";
import {
  CircleLoadingIndecator,
  Dropdown,
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
import ArrowDown from "@/assets/arrow_down.svg?react";
import axios from "axios";
import actGetInvoiceNumber from "@/store/single-actions/actGetInvoiceNumber";
import { TService, TTax_Treatment } from "@/types/shared";
import axiosErrorHandler from "@/utils/axiosErrorHandler";

const {
  row,
  container,
  close_btn_container,
  dropdown,
  dropdown_btn,
  dropdown_content,
  filter_btn
} = styles;

interface filterRes {
  service: string;
  description: string;
  quantity: string;
  unit_price: string | number;
}

type TServiceHandler = {
  [key in TService]: () => void;
};

// ------------------------------------------------------------------------

const CreateInvoiceForm = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { openFeedbackModal } = useFeedback();

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
      // ***** update it to get sales_tax_total dynamicaly from an API
      sales_tax_total: "10%",
      formatted_number: invoiceNumber,
      charges: [
        // {
        //   title: "",
        //   description: "",
        //   quantity: "",
        //   unit_price: "",
        //   discount_rate: "",
        //   amount: "",
        // },
      ],
      packages: [
        // {
        // description: "",
        // quantity: 0,
        // unit_price: 0,
        // discount_rate: 0,
        // amount: 0,
        // },
      ],
      lessons: [],
      filtration: [
        // {
        // start_date: "",
        // end_date: "",
        // report: "All"
        // }
      ],
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
    remove: removeLessons,
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
      discount_rate: "",
      amount: "",
    });
  };

  const handleRemoveCharge = (index: number) => {
    removeCharge(index);
  };

  /**
   *     {
        "service": "New test service 1.0",
        "description": "Mohamed Hassan with amr alaa physics - Scheduled - 2024-09-11 - 15:00:00 - 16:00:00",
        "quantity": 1,
        "unit_price": 120.0
    }
   */
  const handleAddLessonsList = () => {
    console.log("add charge");
    appendLessons({
      student: "",
      description: "",
      service: "",
      invoice_unit_price: "",
      invoice_discount_rate: "",
      invoice_amount: "",
    });
  };

  const handleRemoveLessonsList = (index: number) => {
    removeLessons(index);
  };

  const handleAddPackages = () => {
    appendpackages({
      service: "",
      description: "",
      quantity: "",
      unit_price: "",
      discount_rate: "",
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

  // const watchSelectService = watch("add");

  // console.log("watchSelectService", watchSelectService);

  const watchFiltration = watch("filtration");
  // const watchCustomer = watch("customer");
  // console.log('watch customer', watchCustomer);

  const [customer, setCustomer] = useState("");
  

  const [treatmentType, setTreatmentType] = useState<TTax_Treatment>(watch("tax_treatment"));

  const handleFilter = async () => {
    if (watchFiltration) {
      const { start_date, end_date, report } = watchFiltration[0];
      const token = user?.token;

      try {
        if (!customer) {
          return openFeedbackModal('failed', 'برجاء اختيار العميل اولا');
        }
        const { data }: { data: filterRes[] } = await axios.get(
          "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/lesson_filter/",
          {
            params: {
              start_date,
              end_date,
              customer_id: customer,
              lesson_status: report,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
       
        if (data?.length) {
          data.forEach((item) =>
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
    setCustomer(id)
  }

  const watchFields = watch(["tax_treatment", "sales_tax_total"]);

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

    const [tax_treatment, sales_tax_total] = watchFields;

    if (tax_treatment !== null && sales_tax_total !== "") {
      const { total, salesTax, subtotal } = calculateTotal(
        parseFloat(sub_total.toString()),
        parseFloat(sales_tax_total)
      );

      setValue("total", total.toFixed(2));
      setValue("tax_count", salesTax.toFixed(2));
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
      : parseFloat(watch(`charges.${index}.unit_price`)) || 0;
    const quantity = name.includes("quantity")
      ? parseFloat(value)
      : parseFloat(watch(`charges.${index}.quantity`)) || 0;
    const discountRate = name.includes("discount_rate")
      ? parseFloat(value)
      : parseFloat(watch(`charges.${index}.discount_rate`)) || 0;

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
      : parseFloat(watch(`packages.${index}.discount_rate`)) || 0;

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

    dispatch(actGetInvoiceNumber({ token: user?.token }))
      .unwrap()
      .then((res) => setInvoiceNumber(res));
  }, [dispatch, user?.token]);

  const onSubmit = (data: TCreateInvoiceFormData) => {
    console.log("data", data);

    data.status = dataStatus;
    if (chargesFields?.length === 0 && packagesFields?.length === 0) {
      return openFeedbackModal("failed", "يجب عليك اختيار خدمة");
    }

    dispatch(
      actSendDataToServer({
        token: user?.token,
        formData: data,
        purpose: "create_invoice",
      })
    )
      .unwrap()
      .then(() => openFeedbackModal("succeeded", "تم حفظ الفاتورة بنجاح!"))
      .catch((error) =>
        openFeedbackModal("failed", "حدثت مشكلة أثناء إرسال طلبك.", error)
      );
  };

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
          handleChange={handleCustomer}
          error={errors?.customer?.message as string}
        />
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
        {/* <div className={container}> */}
        <Dropdown
          label="اضافة خدمة"
          name="add"
          register={register}
          options={ADD_SERVICE_OPTIONS}
          handleChange={handleServiceType}
          error={errors?.add?.message as string}
        />

        {/* </div> */}

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

          <div className="group addBtn" style={{ maxWidth: 'fit-content' }}>
            <button type="button" onClick={handleFilter} className="btn submit-btn">
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
            error={errors?.lessons?.[index]?.invoice_unit_price?.message as string}
          />

          <InputField
            label="خصم% "
            placeholder="خصم% "
            onChange={(e) => handleChargeChange(e, index)}
            name={`lessons.${index}.invoice_discount_rate`}
            register={register}
            error={errors?.lessons?.[index]?.invoice_discount_rate?.message as string}
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
        {/* for: tax pres% */}
        <InputField
          label=" ضريبة المبيعات"
          placeholder=" 0.00"
          register={register}
          disabled
          name="sales_tax_total"
          error={errors?.sales_tax_total?.message as string}
        />
        {/* for: count tax in numbers based on product price  */}
        <InputField
          label="قيمة الضريبة"
          placeholder=" 0.00"
          register={register}
          name="tax_count"
          disabled
          error={errors?.tax_count?.message as string}
        />
      </Row>
      <hr className="hr" />

      <Row>
        {/* for: total price after tax */}

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

import React, { useEffect, useRef, useState } from "react";
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
import { ADD_SERVICE_OPTIONS, REPORT_OPTIONS, TAX_TREATMENT_OPTIONS } from "@/constants";
import CloseButton from "@/assets/close-button.svg?react";
import styles from "./createInvoice.module.css";
import ArrowDown from "@/assets/arrow_down.svg?react";
import axios from "axios";

const { row, container, close_btn_container,
  dropdown, dropdown_btn, dropdown_content,
} = styles;


interface filterRes {
  service: string;
  description: string;
  quantity: string;
}

// ------------------------------------------------------------------------

const CreateInvoiceForm = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { openFeedbackModal } = useFeedback();

  const [customersList, setCustomersList] = useState<TOption[]>([]);
  const [servicesList, setServicesList] = useState<TOption[]>([]);
  const [dataStatus, setDataStatus] = useState<"Saved" | "Approved" | "Paid" | "Void">("Saved");


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
      sales_tax_total: "10",
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
      filtration: [
        // {
        // start_date: "",
        // end_date: "",
        // report: "All"
        // }
      ]

    },
  });


  const { fields: chargesFields, append: appendCharge, remove: removeCharge } = useFieldArray({
    control,
    name: "charges",
  });

  const { fields: packagesFields, append: appendpackages, remove: removepackages } = useFieldArray({
    control,
    name: "packages",
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

  const handleAddpackages = () => {
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
  const watchSelectService = watch('add');

  const watchFiltration = watch('filtration');
  const watchCustomer = watch('customer');


  const handleFilter = async () => {
    if (watchFiltration) {
      const { start_date, end_date, report } = watchFiltration[0];
      const token = user?.token;

      try {
        const { data }: { data: filterRes[] } = await axios.get(
          "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/lesson_filter/",
          {
            params: {
              start_date,
              end_date,
              customer_id: watchCustomer,
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
            appendCharge({
              title: item?.service || "",
              description: item?.description || "",
              quantity: item?.quantity || "",
              unit_price: "",
              discount_rate: "",
              amount: "",
            })
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleAppend = () => {

    if (watchSelectService === "charges") {
      handleAddCharge();
    } else if (watchSelectService === "packages") {
      handleAddpackages();
    }
    else {
      handleAddLessons();
    }

  }


  //  calculate packagesAmount and chargesAmount
  const calculateAmounts = () => {
    let packagesAmount = 0;
    let chargesAmount = 0;

    packagesFields?.forEach((item, index) => {
      packagesAmount += Number(watch(`packages.${index}.amount`)) || 0;
    });

    chargesFields?.forEach((item, index) => {
      chargesAmount += Number(watch(`charges.${index}.amount`)) || 0;
    });

    return { packagesAmount, chargesAmount };
  };

  // TAX
  const calculateTotal = (
    taxTreatment: "Tax Exclusive" | "Tax Inclusive" | "Tax Exempt" | null,
    subtotal: number,
    salesTaxRate: number
  ): { total: number; salesTax: number, subtotal: number } => {
    let total = subtotal;
    let salesTax = 0;


    switch (taxTreatment) {
      case "Tax Exclusive":
        salesTax = (salesTaxRate / 100) * subtotal;
        total = subtotal + salesTax;
        subtotal;
        break;

      case "Tax Inclusive":

        salesTax = subtotal * (salesTaxRate / (100 + salesTaxRate));
        // total = subtotal;
        total = subtotal - (salesTaxRate / (100 + salesTaxRate));
        subtotal = subtotal - salesTax;
        console.log("Tax Inclusive", subtotal, total, salesTax);
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
  };

  const watchFields = watch(["tax_treatment", "sales_tax_total"]);

  const handleCalcTax = () => {

    const { packagesAmount, chargesAmount } = calculateAmounts();

    const sub_total = packagesAmount + chargesAmount;

    setValue("subtotal", sub_total.toFixed(2));

    const [tax_treatment, sales_tax_total] = watchFields;

    if (tax_treatment !== null && sales_tax_total !== "") {
      const { total, salesTax, subtotal } = calculateTotal(
        tax_treatment || "Tax Exclusive",
        parseFloat(sub_total.toString()),
        parseFloat(sales_tax_total )
      );

      setValue("total", total.toFixed(2));
      setValue("tax_count", salesTax.toFixed(2));
      setValue("subtotal", subtotal.toFixed(2));
    }
  };

  const handleChargeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;

    const unitPrice = name.includes("unit_price") ? parseFloat(value) : parseFloat(watch(`charges.${index}.unit_price`)) || 0;
    const quantity = name.includes("quantity") ? parseFloat(value) : parseFloat(watch(`charges.${index}.quantity`)) || 0;
    const discountRate = name.includes("discount_rate") ? parseFloat(value) : parseFloat(watch(`charges.${index}.discount_rate`)) || 0;

    const amount = (unitPrice * quantity) * (1 - discountRate / 100);

    if (!isNaN(amount)) {
      setValue(`charges.${index}.amount`, amount.toFixed(2));
    }

    calculateAmounts();
    handleCalcTax();
  };

  const handlePackagesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;

    const unitPrice = name.includes("unit_price") ? parseFloat(value) : parseFloat(watch(`packages.${index}.unit_price`)) || 0;
    const quantity = name.includes("quantity") ? parseFloat(value) : parseFloat(watch(`packages.${index}.quantity`)) || 0;
    const discountRate = name.includes("discount_rate") ? parseFloat(value) : parseFloat(watch(`packages.${index}.discount_rate`)) || 0;

    const amount = (unitPrice * quantity) * (1 - discountRate / 100);

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
      .catch((error) =>  openFeedbackModal("failed", "حدثت مشكلة أثناء إرسال طلبك.", error));
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
        <InputField
          label=" رقم"
          placeholder="INV- 0001"
          isRequired
          register={register}
          name="formatted_number"
          error={errors?.formatted_number?.message as string}
        />

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
          // onChange={handleCalcTax}
          error={errors?.tax_treatment?.message as string}
        />
      </div>

      <Row >
        <div className={container}>
          <Dropdown
            label="اضافة باقة"
            name="add"
            register={register}
            options={ADD_SERVICE_OPTIONS}
            error={errors?.add?.message as string}
          />
          <button type="button" onClick={handleAppend} className="btn submit-btn" >اذهب</button>
        </div>

        <article className="group"></article>
      </Row>



      {/* ********* START ROW ********************* */}
      {chargesFields.map((field, index) => (
        <div key={field.id} style={{ alignItems: "center" }} className={row}>
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
      <hr className="hr" />


      {/* ********* START ROW ********************* */}
      {packagesFields.map((field, index) => (
        <Row key={field.id} >
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
        </Row>
      ))}
      {/* ********* END ROW ********************* */}


      {/* ********* START ROW ********************* */}
      {filtrationFields.map((field, index) => (
        <>
          <Row key={field.id} >
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

            <div className={close_btn_container}>
              <button type="button" onClick={handleFilter}>
                اذهب
              </button>
            </div>
          </Row>
        </>
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
          label=" الاجمالى "
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

      <Row>

        <InputField
          label=" تعليمات "
          placeholder=" 0.00"
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
            setDataStatus("Approved")
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



// /**
//  
//  * update UI
//  * Update save dropdown 
//  */



import React, { act, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoiceOptionsDropdown from "../../forms/create-invoice/InvoiceOptionsDropdown";
import { actGetData } from "@/store/single-actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useFeedback } from "@/store/context";
import InvoiceِApproveForm from "./InvoiceِApproveForm";
import styles from "./invoiceDetails.module.css";
import actRemovePaymentAllocation from "@/store/single-actions/actRemovePaymentAllocation";

// -------------------------------------------------------------------------------

const {
  containerStyle,
  headerStyle,
  buttonStyle,
  linkTitle,
  RowContainer,
  thStyle,
  tdStyle,
  totalDetails,
  amountStyle,
  payHistory,
  flex_row,
  row,
  delete_btn,
  column,
  blue_text,
  caption,
} = styles;

interface Charge {
  id: number;
  tw_id: string | null;
  title: string;
  description: string;
  quantity: string;
  unit_price: string;
  discount_rate: string;
  amount: string;
  created_at: string;
  updated_at: string;
}

interface Package {
  id: number;
  tw_id: string | null;
  description: string;
  quantity: string;
  unit_price: string;
  discount_rate: string;
  amount: string;
  transaction_type: string | null;
  created_at: string;
  updated_at: string;
  student: number | null;
  service: number;
}

interface Lesson {
  id: number;
  tw_id: string | null;
  status: string;
  custom_status: string | null;
  description: string;
  invoice_unit_price: string;
  invoice_discount_rate: string;
  invoice_amount: string;
  created_at: string;
  updated_at: string;
  student: number;
  employee: number;
  service: number;
}

interface UnallocatedPayment {
  id: number;
  date: string;
  type: string;
  unallocated_amount: number;
}

interface PaymentAllocation {
  id: number;
  created_at: string;
  updated_at: string;
  date: string;
  amount: string;
  payment: number;
  invoice: number;
}

interface Details {
  id: number;
  charges: Charge[];
  packages: Package[];
  lessons: Lesson[];
  customer_name: string;
  customer_address: string;
  customer_city: string;
  customer_country: string;
  amount_due: number;
  total_unallocated_amount: number;
  unallocated_payments: UnallocatedPayment[];
  payment_allocations: PaymentAllocation[];
  tw_id: string | null;
  invoice_type: string;
  formatted_number: string;
  date: string;
  due_date: string;
  reference: string;
  tax_treatment: string;
  status: string;
  start_date: string;
  end_date: string;
  lesson_status: string | null;
  terms_text: string;
  subtotal: string;
  sales_tax_total: string;
  total: string;
  hide_flags: boolean;
  invoice_token: string | null;
  sent_at: string | null;
  reminder_sent_at: string | null;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  customer: number;
}

// -------------------------------------------------------------------------------

const InvoiceDetails: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const { openFeedbackModal } = useFeedback();

  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [details, setDetails] = useState<Details | null>(null);
  const [allocationsPay, setAllocationsPay] = useState<
    PaymentAllocation[] | null
  >(null);

  const componentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    const element = componentRef.current;

    if (element) {
      const scale = 2;
      const canvas = await html2canvas(element, {
        scale,
        useCORS: true,
        logging: true,
      });

      const data = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      const pageHeight = pdf.internal.pageSize.getHeight();
      let position = 0;
      let heightLeft = pdfHeight;

      // Add images to each page
      while (heightLeft > 0) {
        // const currentHeight = Math.min(pageHeight, heightLeft);
        pdf.addImage(data, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;

        // Add a new page if necessary
        if (heightLeft > 0) {
          pdf.addPage();
        }
      }

      // Add metadata (optional)
      pdf.setProperties({
        title: "Invoice",
        subject: "Invoice Download",
        author: "Your Name or Company",
        keywords: "invoice, pdf, download",
        creator: "html2canvas and jsPDF",
      });

      // Automatically prompt the user to download the file
      pdf.save(`invoice_${new Date().toISOString()}.pdf`);
    }
  };

  const getInvoiceDetailsById = async () => {

    try {
      dispatch(actGetData({ endpoint: `customer/invoices/${id}/` }))
      .unwrap()
      .then((data) => {          
        if (data) {
          setDetails(data);
          setFinalAmount(data?.amount_due);
          setAllocationsPay(data?.payment_allocations);
        }
            
      })
      .catch((err) => console.error(err));
    } catch (error) {
      console.log(error);
    }
  };
 

  const confirmRemovePaymentAllocation = (
    id: string | number,
    amount: number
  ) => {
    openFeedbackModal(
      "confirm",
      "تأكيد الحذف",
      "هل انت متأكد أنك تريد التراجع عن هذه العملية؟",
      100000,
      undefined,
      () => {
        dispatch(actRemovePaymentAllocation({ id, token: user?.token }))
          .unwrap()
          .then((res) => {
            if (res) {
              openFeedbackModal(
                "succeeded",
                "تم الحذف بنجاح",
                "تم حذف المدفوعات بنجاح",
                5000,
                () => {
                  calcRemovePaymentAllocation(id, amount);
                  getInvoiceDetailsById();
                }
              );
            } else {
              openFeedbackModal(
                "failed",
                "حدث خطأ",
                "حدث خطأ أثناء حذف المدفوعات",
                10000,
                () => {}
              );
            }
          });
      }
    );
  };

  const calcRemovePaymentAllocation = (id: string | number, amount: number) => {
    let total = finalAmount + amount;
    setFinalAmount(total);

    const filterPay = allocationsPay?.filter(
      (pay) => pay.id.toString() !== id.toString()
    );
    setAllocationsPay(filterPay || null);
  };

  useEffect(() => {
    getInvoiceDetailsById();

    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className={containerStyle} ref={componentRef}>
        <header className={headerStyle}>
          <div>
            <div
              className="user-name"
              style={{ fontWeight: "bold", fontSize: "18px" }}
            >
              INV- {id} {details?.status}
            </div>
          </div>
          <div className={flex_row}>
            <p>اخر ارسال {details?.sent_at}</p>

            {/* <button style={{ marginLeft: "10px" }} className={buttonStyle}>
              خيارات الفاتورة
            </button> */}

            <InvoiceOptionsDropdown />
            <button className={buttonStyle} onClick={handleDownload}>
              PDF
            </button>
          </div>
        </header>

        <h3
          style={{
            marginTop: "30px",
            fontSize: "20px",
            marginBottom: "3.2rem",
          }}
          className={linkTitle}
        >
          elmadrasah.com
        </h3>
        <section className={RowContainer}>
          <div className={RowContainer}>
            <p>الاسم: </p>
            <p>{details?.customer_name} </p>
            <p>العنوان:</p>
            <p>{details?.customer_address} </p>
            <p>المدينة: </p>
            <p>{details?.customer_city} </p>
            <p>الدولة: </p>
            <p>{details?.customer_country} </p>
          </div>

          <div className={RowContainer}>
            <p>رقم الفاتورة: </p>
            <p>{details?.formatted_number}</p>
            <p>تاريخ</p>
            <p>{details?.date}</p>
            <p>تاريخ الإستحقاق</p>
            <p>{details?.due_date}</p>
            <p>المبلغ المستحق: </p>
            {/* <p>{details?.amount_due}</p> */}
            <p>{finalAmount}</p>
          </div>
        </section>

        <section>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th className={thStyle}>الخدمة</th>
                <th className={thStyle}>الوصف</th>
                <th className={thStyle}>الكمية</th>
                <th className={thStyle}>سعر الوحدة</th>
                <th className={thStyle}>الخصم</th>
                <th className={thStyle}>الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              {details?.charges &&
                details?.charges?.map((charge) => (
                  <tr key={charge.id}>
                    <td className={tdStyle}>{charge?.title}</td>
                    <td className={tdStyle}>{charge?.description}</td>
                    <td className={tdStyle}>{charge?.quantity}</td>
                    <td className={tdStyle}>{charge?.unit_price}</td>
                    <td className={tdStyle}>{charge?.discount_rate} %</td>
                    <td className={tdStyle}>{charge?.amount}</td>
                  </tr>
                ))}
              {details?.packages &&
                details?.packages?.map((pack) => (
                  <tr key={pack.id}>
                    <td className={tdStyle}>{pack?.service}</td>
                    <td className={tdStyle}>{pack?.description}</td>
                    <td className={tdStyle}>{pack?.quantity}</td>
                    <td className={tdStyle}>{pack?.unit_price}</td>
                    <td className={tdStyle}>{pack?.discount_rate} %</td>
                    <td className={tdStyle}>{pack?.amount}</td>
                  </tr>
                ))}

              {details?.lessons &&
                details?.lessons?.map((lesson) => (
                  <tr key={lesson.id}>
                    <td className={tdStyle}>{lesson?.service}</td>
                    <td className={tdStyle}>{lesson?.description}</td>
                    <td className={tdStyle}>1</td>
                    <td className={tdStyle}>{lesson?.invoice_unit_price}</td>
                    <td className={tdStyle}>
                      {lesson?.invoice_discount_rate} %
                    </td>
                    <td className={tdStyle}>{lesson?.invoice_amount}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>

        <section className={`${RowContainer} ${totalDetails}`}>
          <div className={RowContainer}>
            <p> المجموع الفرعى: </p>
            <p> {details?.subtotal} </p>
            <p>ضريبة المبيعات: </p>
            <p> {details?.sales_tax_total}</p>
            <p> المجموع: </p>
            <p> {details?.total}</p>
          </div>
        </section>
        {/* <hr className="hr" /> */}

        {allocationsPay &&
          allocationsPay?.map((payment) => (
            <div key={payment?.id} className={RowContainer}>
              <div className={row}>
                <button
                  className={delete_btn}
                  onClick={() =>
                    confirmRemovePaymentAllocation(
                      payment?.id,
                      Number(payment?.amount)
                    )
                  }
                >
                  X
                </button>
                <span className={column}>
                  <p className={blue_text}>دفع اقل</p>
                  <p className={caption}>
                    {format(payment?.updated_at || "", "yyyy-MM-dd")}
                  </p>
                </span>
              </div>
              <p> {payment?.amount}</p>
            </div>
          ))}
        <hr className="hr" />
        <div className={RowContainer}>
          <p className={amountStyle}>المجموع المستحق: </p>
          <p className={amountStyle}>{finalAmount}</p>

          <div className={RowContainer}>
            <p></p>
            <p> </p>
          </div>
        </div>
        {details && details.total_unallocated_amount > 0 && (
          <p>
            {details?.customer_name} لديه {details?.total_unallocated_amount}{" "}
            درهم في المدفوعات أو الأرصدة غير المخصصة.
            {/* ************ Upd Link route  ********************************* */}
            <Link to="/" className="link-text">
              التقديم على الفاتورة
            </Link>
          </p>
        )}
      </div>

      <footer className={payHistory}>
        {details && (
          <InvoiceِApproveForm
            customer_id={details?.customer}
            invoice_id={details?.id}
            amount={finalAmount.toString()}
            date={details?.due_date}
          />
        )}
      </footer>
    </div>
  );
};

export default InvoiceDetails;

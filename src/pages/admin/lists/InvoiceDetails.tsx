import React from 'react';
import { useParams } from 'react-router-dom';
import styles from "./invoiceDetails.module.css";

const { containerStyle, headerStyle, buttonStyle, linkTitle, RowContainer, 
  thStyle, tdStyle, totalDetails, amountStyle, payHistory,historyTitle, inputStyle } = styles;

const InvoiceDetails: React.FC = () => {

  const { invoiceID } = useParams();


  const data = {
    date: "5/5/2025"
  };

  return (
    <div className={containerStyle}>
      {/* Header */}
      <header className={headerStyle}>
        <div>
          <div className="user-name" style={{ fontWeight: 'bold', fontSize: '18px' }}> INV- {invoiceID} **** status </div>
        </div>
        <div>
          <button >اخر ارسال {data?.date}</button>
          <button style={{ marginLeft: '10px' }} className={buttonStyle} >خيارات الفاتورة</button>
          <button className={buttonStyle}>PDF</button>
        </div>
      </header>

      <h3 style={{ marginTop: '30px', fontSize: '20px', marginBottom: '3.2rem' }} className={linkTitle}>elmadrasah.com</h3>
      <section className={RowContainer}>
        {/* Customer Details */}
        <div className={RowContainer}>
          <p>الاسم: </p>
          <p>Mohamed Ahmed </p>
          <p>العنوان:</p>
          <p>Giza  </p>
          <p>المدينة: </p>
          <p>Cairo: </p>
          <p>الدولة: </p>
          <p>Egypt: </p>
        </div>

        {/* Invoice Meta */}
        <div className={RowContainer}>
          <p>رقم الفاتورة: </p>
          <p>INV-12360</p>
          <p>تاريخ</p>
          <p>20-9-2024</p>
          <p>تاريخ الإستحقاق</p>
          <p>21-9-2024</p>
          <p>المبلغ المستحق: </p>
          <p>120.0</p>
        </div>
      </section>

      {/* Invoice Table */}
      <section>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
        }}>
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
            <tr>
              <td className={tdStyle}>Flex 25 session</td>
              <td className={tdStyle}>Flex 25 session Flex 25 session Flex 25 session</td>
              <td className={tdStyle}>25</td>
              <td className={tdStyle}>112.88</td>
              <td className={tdStyle}>5%</td>
              <td className={tdStyle}>1,234</td>
            </tr>
            <tr>
              <td className={tdStyle}>Flex 25 session</td>
              <td className={tdStyle}>Flex 25 session Flex 25 session Flex 25 session</td>
              <td className={tdStyle}>25</td>
              <td className={tdStyle}>112.88</td>
              <td className={tdStyle}>5%</td>
              <td className={tdStyle}>1,234</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Payment Details */}
      <section className={`${RowContainer} ${totalDetails}`}>
        <p >المجموع الفرعي:</p>
        <p> 1,200 درهم</p>
        <p className={amountStyle}>ضريبة المبيعات:  </p>
        <p> 80.80 درهم</p>
        <p className={amountStyle}>المجموع المستحق: 1,280 درهم</p>
        <p>1,280 درهم</p>
      </section>

      {/* Footer: Payment Log */}
      <footer className={payHistory} >
        <div className="payment-log" style={{ display: 'flex', alignItems: 'center' }}>
          <p className={historyTitle}>سجل الدفع</p>
          <button className={buttonStyle}>خطط الدفع</button>
          <div className="payment-methods" style={{ marginLeft: 'auto', display: 'flex' }}>
            <select className={inputStyle}>
              <option>وصف</option>
            </select>
            <input type="date" value="2024-09-20" className={inputStyle} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InvoiceDetails;

import { Heading } from "@/components/UI";
import { useNavigate, useParams } from "react-router-dom";
import EditPenIcon from "@/assets/edit_pen.svg?react";
import { useEffect, useState } from "react";
import {
  getSpecificFamily,
  TSpecificFamilyResponse,
} from "@/services/families.ts";
import { LoadingIndicator, Row } from "@/components";
import { InfoBox, InfoGroup, SimpleTable } from "../../../shared/components";
import formatFullArabicDate from "@/utils/formatFullArabicDate.ts";
import createObjectsWithCustomKeys from "@/pages/admin/students/profile/utils/createObjectsWithCustomKeys.ts";
import { TTableRow } from "@/pages/shared/components/SimpleTable.tsx";

const customRowStyle = {
  marginBottom: "0",
};
const FamilyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [specificFamilyData, setSpecificFamilyData] =
    useState<TSpecificFamilyResponse>();
  useEffect(() => {
    if (id) {
      getSpecificFamily(id).then((data) => {
        setSpecificFamilyData(data);
      });
    }
  }, [id]);

  return (
    <>
      {!specificFamilyData && (
        <div className="loadingBox">
          <LoadingIndicator />
        </div>
      )}
      <div className="flex justify-between mb-[4.8rem]">
        <div className="flex items-center gap-[2rem]">
          <Heading
            text={specificFamilyData?.full_name as string}
            style={{ marginBottom: "0", color: "#000" }}
          />
          <button
            onClick={() =>
              navigate(`/admin/students/families-list/${id}/edit`, {
                state: specificFamilyData,
              })
            }
          >
            <EditPenIcon />
          </button>
        </div>  
          {specificFamilyData?.status ? (
            <span className="w-[126px] h-[35px] flex justify-center items-center rounded-[10px] bg-[var(--main-color)] text-[#FFFFFF]">
              نشط
            </span>
          ) : (
            <span className="w-[126px] h-[35px] flex justify-center items-center rounded-[10px] bg-[#8D8D8D] text-[#FFFFFF]">غير نشط</span>
          )}
      </div>
      {/* Section One Contact Information */}
      <Heading text="معلومات الاتصال" style={{ color: "#000" }} />
      <InfoGroup>
        <Row style={customRowStyle}>
          <InfoBox
            boxKey="البريد الإلكتروني"
            boxValue={specificFamilyData?.email}
          />
          <InfoBox
            boxKey="هاتف المحمول"
            boxValue={specificFamilyData?.mobile_phone}
          />
          <InfoBox
            boxKey="هاتف المنزل"
            boxValue={specificFamilyData?.home_phone}
          />
        </Row>
        <Row style={customRowStyle}>
          <InfoBox boxKey="العنوان" boxValue={specificFamilyData?.address} />
          <InfoBox
            boxKey="العنوان 2"
            boxValue={specificFamilyData?.address_2}
          />
          <InfoBox boxKey="المدينة" boxValue={specificFamilyData?.city} />
        </Row>
        <Row style={customRowStyle}>
          <InfoBox boxKey="الولاية" boxValue={specificFamilyData?.state} />
          <InfoBox boxKey="الدولة" boxValue={specificFamilyData?.country} />
          <InfoBox boxKey="الرمز البريدى" boxValue={specificFamilyData?.zip} />
        </Row>
        <Row style={customRowStyle}>
          <InfoBox
            boxKey="المنطفة الزمنية"
            boxValue={specificFamilyData?.time_zone}
          />
        </Row>
      </InfoGroup>
      <hr className="hr" style={{ marginBottom: "4.8rem" }} />
      {/* Section Two Notifications */}
      <Heading text="الإشعارات" style={{ color: "#000" }} />
      <Row style={customRowStyle}>
        <InfoBox
          boxKey="تذكيرات الدرس"
          boxValue={
            specificFamilyData?.whatsapp_reminders &&
            specificFamilyData?.web_reminders &&
            specificFamilyData?.app_reminders
              ? "ممكن"
              : "وقف"
          }
        />
        <InfoBox
          boxKey="ملاحظات الدرس"
          boxValue={specificFamilyData?.email_lesson_notes ? "ممكن" : "وقف"}
        />
      </Row>
      <hr className="hr" style={{ marginBottom: "4.8rem" }} />
      {/* Section Three Family Account */}
      <Heading text="حساب المستخدم" style={{ color: "#000" }} />
      <InfoGroup>
        <Row style={customRowStyle}>
          <InfoBox
            boxKey="حساب المستخدم"
            boxValue={specificFamilyData?.user_account ? "ممكن" : "وقف"}
          />
        </Row>
        <Row style={customRowStyle}>
          <InfoBox
            boxKey="تم إرسال التأكيد"
            boxValue={
              formatFullArabicDate(specificFamilyData?.created_at) || "لايوجد"
            }
          />
          <InfoBox
            boxKey="تم التأكد عند"
            boxValue={
              formatFullArabicDate(specificFamilyData?.updated_at) || "لايوجد"
            }
          />
        </Row>
      </InfoGroup>
      <hr className="hr" style={{ marginBottom: "4.8rem" }} />
      {/* Section Four Students Information */}
      <Heading text="الطلاب" style={{ color: "#000" }} />
      <SimpleTable
        tableHead={["الاسم", "البريد الإلكتروني", "الهاتف المحمول", "الحالة"]}
        noDataMsg="لا توجد طلاب !"
        rows={
          createObjectsWithCustomKeys({
            arr: specificFamilyData?.students_attributes || [],
            keys: ["id", "first_name", "email", "mobile_phone", "status"],
          }) as TTableRow[]
        }
      />

      {/* Section Five Subscriptions Credits */}
      <Heading text="أرصدة الاشتركات" style={{ color: "#000", marginTop: '4.8rem' }} />
      <SimpleTable
        tableHead={[
          "نوع الخدمة",
          "تم شراؤها",
          "المقرر",
          "غير مجدولة",
          "مستخدم",
          "غير مستخدمة",
        ]}
        noDataMsg="لا توجد ارصدة !"
        rows={specificFamilyData?.subscriptions_credits || []}
      />

      {/* Section Six Last Invoices */}
      <div className="flex items-center justify-between my-[4.8rem]">
        <Heading
          text="الفواتير الأخيرة"
          style={{ marginBottom: "0", color: "#000" }}
        />
        <button
          onClick={() => navigate(`/admin/invoices/create-invoice`)}
          className="text-[var(--main-color)] underline"
        >
          إنشاء الفواتير
        </button>
      </div>
      <SimpleTable
        tableHead={[
          "التاريخ",
          "رقم الفاتورة",
          "حالة",
          "تاريخ الاستحقاق",
          "إجمالي الفاتورة",
        ]}
        noDataMsg="لا توجد فواتير حديثة."
        rows={
          createObjectsWithCustomKeys({
            arr: specificFamilyData?.invoices || [],
            keys: [
              "id",
              "date",
              "formatted_number",
              "status",
              "due_date",
              "total",
            ],
          }) as TTableRow[]
        }
      />
      {/* <div className="flex items-center justify-end gap-[3.2rem] mt-[3.2rem]">
        <button
          onClick={() => navigate(`/admin/invoices/create-invoice`)}
          className="text-[var(--main-color)] underline"
        >
          عرض كل الفواتير
        </button>
      </div> */}
      {/* Section Seven Last Payments */}
      <div className="flex items-center justify-between my-[4.8rem]">
        <Heading
          text="المدفوعات الأخيرة"
          style={{ marginBottom: "0", color: "#000" }}
        />
        <button
          onClick={() => navigate(`/admin/invoices/create-invoice`)}
          className="text-[var(--main-color)] underline"
        >
          إنشاء الفواتير
        </button>
      </div>
      <SimpleTable
        tableHead={["التاريخ", "نوع", "وصف", "كمية"]}
        noDataMsg="لا توجد مدفوعات حديثة."
        rows={
          createObjectsWithCustomKeys({
            arr: specificFamilyData?.payments || [],
            keys: ["date", "type", "description", "amount"],
          }) as TTableRow[]
        }
      />
      {/* <div className="flex items-center justify-end gap-[3.2rem] mb-[4.8rem] mt-[3.2rem]">
        <button
          onClick={() => navigate(`/admin/invoices/create-invoice`)}
          className="text-[var(--main-color)] underline"
        >
          عرض جميع المعاملات
        </button>
      </div> */}
    </>
  );
};

export default FamilyProfile;

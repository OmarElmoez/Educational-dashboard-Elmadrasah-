import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TDataForSpecificStudent } from "@/schemas/AddStudentSchema.ts";
import { getSpecificStudent } from "@/services/studentsAndTeachers.ts";
import { LoadingIndicator, Row } from "@/components";
import EditPenIcon from "@/assets/edit_pen.svg?react";
import { Heading } from "@/components/UI";
import { InfoBox, InfoGroup, SimpleTable } from "./components";
import createObjectsWithCustomKeys from "@/pages/admin/students/profile/utils/createObjectsWithCustomKeys.ts";

const customRowStyle = {
  marginBottom: "0",
}

const StudentProfile = () => {
  const {id} = useParams();

  const navigate = useNavigate();

  const [specificStudentData, setSpecificStudentData] = useState<TDataForSpecificStudent>()

  useEffect(() => {
    if (!id) return;
    getSpecificStudent({id}).then((data) => {
      setSpecificStudentData(data)
    })
  }, [id]);

  return (
    <>

      {!specificStudentData && <div className="loadingBox">
          <LoadingIndicator/>
      </div>}
      <div className="flex items-center gap-[2rem] mb-[4.8rem]">
        <Heading text={specificStudentData?.full_name as string}
                 style={{marginBottom: "0", color: "#000"}}/>
        <button onClick={() => navigate(`/admin/students/profile/${id}/edit`, {state: specificStudentData})}>
          <EditPenIcon/></button>
      </div>

      {specificStudentData?.student_type === 'child' && (
        <>
          <Heading text="معلومات العائلة" style={{color: "#000"}}/>
          <Row style={customRowStyle}>
            <InfoBox boxKey="اسم العائلة" boxValue={specificStudentData?.family_name}/>
          </Row>
          <hr className="hr" style={{marginBottom: "4.8rem"}}/>
        </>
      )}


      <Heading text="معلومات الاتصال" style={{color: "#000"}}/>
      <InfoGroup>
        <Row style={customRowStyle}>
          <InfoBox boxKey="البريد الإلكتروني" boxValue={specificStudentData?.email}/>
        </Row>
        <Row style={customRowStyle}>
          <InfoBox boxKey="هاتف المحمول" boxValue={specificStudentData?.mobile_phone}/>
          <InfoBox boxKey="هاتف المنزل" boxValue={specificStudentData?.home_phone}/>
        </Row>
      </InfoGroup>

      <hr className="hr" style={{marginBottom: "4.8rem"}}/>

      <Heading text="تفاصيل الطالب" style={{color: "#000"}}/>
      <InfoGroup>
        <Row style={customRowStyle}>
          <InfoBox boxKey="المنطقة الزمنية" boxValue={specificStudentData?.time_zone}/>
        </Row>
        <Row style={customRowStyle}>
          <InfoBox boxKey="تاريخ الميلاد" boxValue={specificStudentData?.birth_date}/>
          <InfoBox boxKey="تاريخ البدء" boxValue={specificStudentData?.start_date}/>
        </Row>
        <Row style={customRowStyle}>
          <InfoBox boxKey="المدرسة" boxValue={specificStudentData?.school}/>
          <InfoBox boxKey="الصف/السنة" boxValue={specificStudentData?.grade}/>
        </Row>
        <Row style={{...customRowStyle, alignItems: "flex-start"}}>
          <InfoBox boxKey="الخدمة الافتراضية" boxValue={specificStudentData?.services_str}/>
          <InfoBox boxKey="الموقع الافتراضي"
                   boxValue={specificStudentData?.initial_location?.link}/>
        </Row>
        <Row style={customRowStyle}>
          <InfoBox boxKey="المعلمين" boxValue={specificStudentData?.teachers_str}/>
          <InfoBox boxKey="المواد" boxValue={specificStudentData?.subjects_str}/>
        </Row>
        <Row style={customRowStyle}>
          <InfoBox boxKey="معلومات إضافية" boxValue={specificStudentData?.additional_notes}/>
        </Row>
      </InfoGroup>

      <hr className="hr" style={{marginBottom: "4.8rem"}}/>

      <Heading text="تفاصيل الفواتير" style={{color: "#000"}}/>
      <Row style={customRowStyle}>
        <InfoBox boxKey="طريقة الفوترة" boxValue={specificStudentData?.billing_method}/>
        <InfoBox boxKey="خصم الطالب" boxValue={`%${specificStudentData?.student_cost}`}/>
      </Row>

      <hr className="hr" style={{marginBottom: "4.8rem"}}/>

      <Heading text="الإشعارات" style={{color: "#000"}}/>
      <Row style={customRowStyle}>
        <InfoBox boxKey="تذكيرات الدرس"
                 boxValue={(specificStudentData?.whatsapp_reminders && specificStudentData?.web_reminders && specificStudentData?.app_reminders) ? "ممكن" : "وقف"}/>
        <InfoBox boxKey="ملاحظات الدرس" boxValue={(specificStudentData?.email_lesson_notes) ? "ممكن" : "وقف"}/>
      </Row>

      <hr className="hr" style={{marginBottom: "4.8rem"}}/>

      <Heading text="حساب المستخدم" style={{color: "#000"}}/>
      <InfoGroup>
        <Row style={customRowStyle}>
          <InfoBox boxKey="حساب المستخدم" boxValue={specificStudentData?.user_account ? "ممكن" : "وقف"}/>
        </Row>
      </InfoGroup>

      <hr className="hr" style={{marginBottom: "4.8rem"}}/>

      <Heading text="أرصدة الاشتركات" style={{color: "#000"}}/>
      <SimpleTable tableHead={["نوع الخدمة", "تم شراؤها", "المقرر", "غير مجدولة", "مستخدم", "غير مستخدمة"]}
                   noDataMsg="لا توجد ارصدة !"
                   rows={specificStudentData?.subscriptions_credits || []}
      />

      <div className="flex items-center justify-between gap-[2rem] my-[4.8rem]">
        <Heading text="الدروس القادمة" style={{marginBottom: "0", color: "#000"}}/>
        <button onClick={() => navigate(`/admin/reschedule-lesson/${id}`)}
                className="text-[var(--main-color)] underline">
          جدولة الدروس
        </button>
      </div>
      <SimpleTable tableHead={["التاريخ", "بداية الدرس", "نهاية الدرس", "اسم المادة", "تكلفة الدرس", "الحالة"]}
                   noDataMsg="لا توجد دروس قادمة !"
                   rows={specificStudentData?.upcoming_lessons || []}/>

      <div className="flex items-center justify-between gap-[2rem] my-[4.8rem]">
        <Heading text="الدروس الحالية" style={{marginBottom: "0", color: "#000"}}/>
        <button onClick={() => navigate(`/admin/reschedule-lesson/${id}`)}
                className="text-[var(--main-color)] underline">
          عرض الكل
        </button>
      </div>
      <SimpleTable tableHead={["التاريخ", "بداية الدرس", "نهاية الدرس", "اسم المادة", "تكلفة الدرس", "الحالة"]}
                   noDataMsg="لا توجد دروس حالية !"
                   rows={specificStudentData?.today_lessons || []}/>

      {specificStudentData?.student_type === 'individual' &&
          <>

              <div className="flex items-center justify-between gap-[2rem] my-[4.8rem]">
                  <Heading text="الفواتير الأخيرة" style={{marginBottom: "0", color: "#000"}}/>
                  <button onClick={() => navigate(`/admin/invoices/create-invoice`)}
                          className="text-[var(--main-color)] underline">
                      إنشاء فاتورة
                  </button>
              </div>
              <SimpleTable tableHead={["التاريخ", "رقم الفاتورة", "حالة", "تاريخ الاستحقاق", "إجمالي الفاتورة"]}
                           noDataMsg="لا توجد فواتير حديثة."
                           rows={createObjectsWithCustomKeys({
                             arr: specificStudentData?.invoices,
                             keys: ["date", "formatted_number", "status", "due_date", "total"]
                           })}/>

              <div className="flex items-center justify-between gap-[2rem] my-[4.8rem]">
                  <Heading text="المدفوعات الأخيرة" style={{marginBottom: "0", color: "#000"}}/>
                  <button onClick={() => navigate(`/admin/invoices/create-invoice`)}
                          className="text-[var(--main-color)] underline">
                      إنشاء الفواتير
                  </button>
              </div>
              <SimpleTable tableHead={["التاريخ", "نوع", "وصف", "كمية"]} noDataMsg="لا توجد مدفوعات حديثة."
                           rows={createObjectsWithCustomKeys({
                             arr: specificStudentData?.payments,
                             keys: ["date", "type", "description", "amount"]
                           })}/>
          </>
      }
    </>
  )
}

export default StudentProfile;
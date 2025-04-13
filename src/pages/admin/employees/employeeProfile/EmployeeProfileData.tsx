import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { TDataForSpecificEmployee } from "@/schemas/AddEmployeeSchema";
import actGetSpecificEmployees from "@/store/table/act/actGetSpecificEmployee";
import Styles from "./EmployeeProfileData.module.css";
import EditPenIcon from "@/assets/edit_pen.svg?react";
import formatFullArabicDate from "@/utils/formatFullArabicDate.ts";
import { SimpleTable } from "@/pages/shared/components";
import { LoadingIndicator } from "@/components";

const { sectionContainer, infoContainer, iconButton } = Styles;
const EmployeeProfileData = () => {
  const [specificEmployeeData, setSpecificEmployeeData] =
    useState<TDataForSpecificEmployee>();
  const dispatch = useAppDispatch();
  const params = useParams();
  const employeeId = Number(params.id);
  const navigate = useNavigate();
  const editEmployee = () => {
    navigate(`/admin/employees/edit-employee/${employeeId}`, {
      state: specificEmployeeData,
    });
  };
  useEffect(() => {
    dispatch(actGetSpecificEmployees({ employeeID: employeeId })).then(
      (res) => {
        setSpecificEmployeeData(res.payload as TDataForSpecificEmployee);
      }
    );
    // eslint-disable-next-line
  }, [dispatch, employeeId]);
  return (
    <>
      {!specificEmployeeData && <div className="loadingBox">
          <LoadingIndicator/>
      </div>}
      <div className="flex justify-between mb-[4.8rem]">
        <div className="flex items-center gap-[2rem]">
        <p className="font-medium text-[2.4rem]">{specificEmployeeData?.full_name || `${specificEmployeeData?.first_name} ${specificEmployeeData?.last_name}`}</p>
        <EditPenIcon className={iconButton} onClick={editEmployee} />
        </div>
        {specificEmployeeData?.is_active ? (
          <span className="w-[126px] h-[35px] flex justify-center items-center rounded-[10px] bg-[var(--main-color)] text-[#FFFFFF]">
            نشط
          </span>
        ) : (
          <span className="w-[126px] h-[35px] flex justify-center items-center rounded-[10px] bg-[#8D8D8D] text-[#FFFFFF]">
            غير نشط
          </span>
        )}
      </div>
      {/* Section One Contact Information */}
      <section className={sectionContainer}>
        <p>معلومات الاتصال</p>
        <div className={infoContainer}>
          <h2>البريد الإلكترونى: </h2>
          <span>{specificEmployeeData?.email || "لايوجد"}</span>
        </div>
        <div className={infoContainer}>
          <h2>الهاتف المحمول: </h2>
          <span>{specificEmployeeData?.phone || "لايوجد"}</span>
        </div>
        <div className={infoContainer}>
          <h2>هاتف المنزل: </h2>
          <span>{specificEmployeeData?.home_phone || "لايوجد"}</span>
        </div>
        <div className={infoContainer}>
          <h2>العنوان: </h2>
          <span>{specificEmployeeData?.address || "لايوجد"}</span>
        </div>
        <div className={infoContainer}>
          <h2>العنوان 2: </h2>
          <span>{specificEmployeeData?.address_2 || "لايوجد"}</span>
        </div>
        <div className={infoContainer}>
          <h2>المدينة: </h2>
          <span>{specificEmployeeData?.city || "لايوجد"}</span>
        </div>
        <div className={infoContainer}>
          <h2>المحافظة/الإمارة/الولاية: </h2>
          <span>{specificEmployeeData?.state || "لايوجد"}</span>
        </div>
        <div className={infoContainer}>
          <h2>الرقم البريدى: </h2>
          <span>{specificEmployeeData?.zip || "لايوجد"}</span>
        </div>
        <div className={infoContainer}>
          <h2>البلد: </h2>
          <span>{specificEmployeeData?.country || "لايوجد"}</span>
        </div>
        <div className={infoContainer}>
          <h2>المنطقة الزمنية: </h2>
          <span>{specificEmployeeData?.time_zone || "لايوجد"}</span>
        </div>
      </section>
      <hr className="hr" />
      {/* Section Two Bio Information */}
      <section className={sectionContainer}>
        <p>المؤهلات الدراسية</p>
        <div className={infoContainer}>
          <h2>الوظيفة: </h2>
          <span>{specificEmployeeData?.position || "لايوجد"}</span>
        </div>
        <div className={infoContainer}>
          <h2>المؤهلات: </h2>
          <span>{specificEmployeeData?.bio || "لايوجد"}</span>
        </div>
        <div className={infoContainer}></div>
      </section>
      <hr className="hr" />
      {/* Section Three Available Times */}
      <section className={sectionContainer}>
        <p>المواعيد المتاحة</p>
        <div className={infoContainer}>
          <span>أخر تحديث</span>
          <span>
            {(specificEmployeeData &&
              formatFullArabicDate(specificEmployeeData?.updated_at)) ||
              "لايوجد"}
          </span>
        </div>
        <div className={infoContainer}>
          <span>الأوقات في المنطقة الزمنية للموظف</span>
          <span>{specificEmployeeData?.time_zone || "لايوجد"}</span>
        </div>
        <div className={infoContainer}></div>
      </section>
      <hr className="hr" />
      {/* Section Four Bio Information */}
      <section className={sectionContainer}>
        <p>تفاصيل الموظف</p>
        <div className={infoContainer}>
          <h2>نوع الموظف: </h2>
          <span>{specificEmployeeData?.employee_type || "لايوجد"}</span>
        </div>
        <div className={infoContainer}>
          <h2>المُسمي الوظيفي: </h2>
          <span>{specificEmployeeData?.position || "لايوجد"}</span>
        </div>
        <div className={infoContainer}>
          <h2>لون الجدول: </h2>
          <span
            style={{
              width: "50px",
              height: "10px",
              backgroundColor: `${
                specificEmployeeData?.calendar_color || "لايوجد"
              }`,
            }}
          ></span>
        </div>
        <div className={infoContainer}>
          <h2>تاريخ الميلاد: </h2>
          <span>{specificEmployeeData?.birth_date || "لايوجد"}</span>
        </div>
        <div className={infoContainer}>
          <h2>تاريخ التعيين: </h2>
          <span>{specificEmployeeData?.hire_date || "لايوجد"}</span>
        </div>
        <div className={infoContainer}>
          <h2>نوع أجر الدرس: </h2>
          <span>{specificEmployeeData?.wage_type || "لايوجد"}</span>
        </div>
        {specificEmployeeData?.wage_type === "wage" ? (
          <div className={infoContainer}>
            <h2>معدل الأجر التدريسى: </h2>
            <span>{specificEmployeeData?.employee_wage || "لايوجد"}</span>
          </div>
        ) : null}
        <div className={infoContainer}>
          <h2>نوع الأجر غير التدريسى: </h2>
          <span>{specificEmployeeData?.work_wage_type || "لايوجد"}</span>
        </div>
        {specificEmployeeData?.wage_type === "wage" ? (
          <div className={infoContainer}>
            <h2>معدل الأجر غير التدريسى: </h2>
            <span>{specificEmployeeData?.work_wage || "لايوجد"}</span>
          </div>
        ) : null}
        <div className={infoContainer}>
          <h2>المواد: </h2>
          {specificEmployeeData &&
            specificEmployeeData?.subject_choices_response?.map((subject) => {
              return (
                <>
                  <span key={subject.id}>
                    {`,${subject.name_ar}` || "لايوجد"}
                  </span>
                </>
              );
            })}
        </div>
        <div className={infoContainer}>
          <h2>ملاحظات أخري: </h2>
          <span>{specificEmployeeData?.additional_notes || "لايوجد"}</span>
        </div>
      </section>
      <hr className="hr" />
      {/* Section Five Employee Link */}
      <section className={sectionContainer}>
        <p>رابط موقع المعلم</p>
        <div className={infoContainer}>
          <h2>عنوان URL لرابط الموقع: </h2>
          {specificEmployeeData?.link ? (
            <a
              href={specificEmployeeData?.link}
              rel="noreferrer"
              target="_blank"
            >
              الرابط
            </a>
          ) : (
            <span>لايوجد</span>
          )}
        </div>
        <div className={infoContainer}></div>
      </section>
      <hr className="hr" />
      {/* Section Six Students */}
      <section className={sectionContainer}>
        <p>الطلاب المعينون</p>
        <SimpleTable
          tableHead={["الاسم", "البريد الإلكتروني", "رقم الهاتف", "حالة"]}
          rows={specificEmployeeData?.initial_students_response || []}
          noDataMsg="لا يوجد طلاب !"
        />
      </section>
      <hr className="hr" />
      {/* Section Seven Notifications */}
      <section className={sectionContainer}>
        <p>الإشعارات</p>
        <div className={infoContainer}>
          <h2>التذكير عبر التطبيق: </h2>
          <span>
            {specificEmployeeData
              ? specificEmployeeData.app_reminders
                ? "يعمل"
                : "متوقف"
              : "لايوجد"}
          </span>
        </div>
        <div className={infoContainer}>
          <h2>التذكير عبر الموقع: </h2>
          <span>
            {specificEmployeeData
              ? specificEmployeeData.web_reminders
                ? "يعمل"
                : "متوقف"
              : "لايوجد"}
          </span>
        </div>
        <div className={infoContainer}>
          <h2>التذكير عبر الواتساب: </h2>
          <span>
            {specificEmployeeData
              ? specificEmployeeData.whatsapp_reminders
                ? "يعمل"
                : "متوقف"
              : "لايوجد"}
          </span>
        </div>
      </section>
      <hr className="hr" />
      {/* Section Eight Employee Account */}
      <section className={sectionContainer}>
        <p>حساب المستخدم</p>
        <div className={infoContainer}>
          <h2>حساب المستخدم: </h2>
          <span>
            {specificEmployeeData
              ? specificEmployeeData.is_active
                ? "نشط"
                : "غير نشط"
              : "لايوجد"}
          </span>
        </div>
        <div className={infoContainer}></div>
        <div className={infoContainer}></div>
        <div className={infoContainer}>
          <h2>تم إرسال التأكيد: </h2>
          <span>
            {formatFullArabicDate(specificEmployeeData?.created_at) || "لايوجد"}
          </span>
        </div>
        <div className={infoContainer}>
          <h2>تم التأكد عند: </h2>
          <span>
            {formatFullArabicDate(specificEmployeeData?.updated_at) || "لايوجد"}
          </span>
        </div>
        <div className={infoContainer}></div>
      </section>
      <hr className="hr" />
    </>
  );
};
export default EmployeeProfileData;

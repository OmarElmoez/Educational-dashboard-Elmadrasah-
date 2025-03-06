import { useEffect, useState, useCallback } from 'react';
import {
  Dropdown,
  InputField,
  MultiChoices,
  PhoneField,
  Row,
  UploadFile,
  CircleLoadingIndecator,
} from "@/components";
import { STATUS_OPTIONS, TIMEZONES_OPTIONS } from "@/constants";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { actGetDropdownOptions } from "@/store/single-actions";
import actGetSpecificEmployees from "@/store/table/act/actGetSpecificEmployee";
import { Heading } from "@/components/UI";
import { useForm } from "react-hook-form";
import Styles from "./EditEmployeeForm.module.css";
import { AddEmployeeSchema } from "../../../../schemas/AddEmployeeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TAddEmployeeFormDataForServer } from '@/schemas/AddEmployeeSchema';
import { TEditEmployeeForm, EditEmployeeSchema } from '../../../../schemas/EditEmployeeSchema';
import {
  DAYS_OPTIONS,
  WAGE_TYPES,
  WORK_WAGE_TYPES,
} from "@/constants/dropdown-options";

const { elementContainer } = Styles;
const EditEmployeeForm = () => {
  const location = useLocation();
  const specificEmployeeData :  TAddEmployeeFormDataForServer = location.state;
  const dispatch = useAppDispatch();
  console.log(specificEmployeeData);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
  } = useForm<TEditEmployeeForm>({
    mode: "onBlur",
    resolver: zodResolver(EditEmployeeSchema),
  });
  const setPreviousData = useCallback((response: TAddEmployeeFormDataForServer) => {
    console.log({response})
    setValue('is_active', response.is_active=== true? "true":"false");
    setValue('subject_choices', response.subject_choices as number[]);
  }, [setValue])
  useEffect(() => {
    dispatch(actGetDropdownOptions({ optionsFor: "subjects" }));
    reset(specificEmployeeData);
    setPreviousData(specificEmployeeData);
  }, [dispatch, reset, specificEmployeeData]);

  const isTeacher = watch("include_as_teacher");
  const employType = watch("employee_type");
  const onSubmit = (data: TEditEmployeeForm) => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading text="نوع الموظف" />
        <div className={elementContainer}>
          <Dropdown
            label="الحالة"
            name="is_active"
            register={register}
            options={STATUS_OPTIONS}
            error={errors.is_active?.message as string}
          />
        </div>
        <Row>
          <InputField
            label="الأسم الأول"
            placeholder="الأسم الأول"
            // isRequired
            register={register}
            name="first_name"
            error={errors.first_name?.message as string}
          />
          <InputField
            label="الأسم الأخير"
            placeholder="الأسم الأخير"
            // isRequired
            register={register}
            name="last_name"
            error={errors.last_name?.message as string}
          />
        </Row>
        <Row>
          <InputField
            label="الأسم بالكامل"
            placeholder="الأسم بالكامل"
            register={register}
            // isRequired
            name="full_name"
            error={errors.full_name?.message as string}
          />
          <InputField
            label="البريد الإلكتروني"
            placeholder="البريد الإلكتروني"
            // isRequired
            register={register}
            name="email"
            error={errors.email?.message as string}
          />
        </Row>
        <Row>
          <Dropdown
            label="التوقيت الزمني"
            name="time_zone"
            // isRequired
            options={TIMEZONES_OPTIONS}
            register={register}
            error={errors.time_zone?.message as string}
          />
          <PhoneField
            control={control as any}
            name="phone"
            // isRequired
            error={errors.phone?.message as string}
            label="الهاتف المحمول"
          />
        </Row>
        <hr className="hr" />
        <span className="mainContainer">
          <Heading text="المرفقات" />{" "}
          <span
            className="required"
            style={{ position: "relative", top: "0px" }}
          ></span>
        </span>

        <Row>
          <UploadFile
            label="إضافة صورة شخصية"
            name="uploaded_pp"
            control={control}
            register={register}
            setValue={setValue}
            fileTypes={["images"]}
            error={errors.uploaded_pp?.message as string}
          />
          <UploadFile
            label="إضافة السيرة الذاتية"
            name="uploaded_cv"
            control={control}
            register={register}
            setValue={setValue}
            fileTypes={["pdfs", "word"]}
            error={errors.uploaded_cv?.message as string}
          />
        </Row>

        <Row>
          <UploadFile
            label="إضافة الرقم  القومي"
            name="uploaded_id"
            control={control}
            register={register}
            setValue={setValue}
            fileTypes={["images"]}
            error={errors.uploaded_id?.message as string}
          />

          <InputField
            label="تاريخ إنتهاء الرقم القومى"
            placeholder="يوم / شهر / سنه"
            type="date"
            register={register}
            name="national_id_expiration_date"
            error={errors.national_id_expiration_date?.message as string}
          />
        </Row>

        <Row>
          <UploadFile
            label="إضافة جواز السفر"
            name="uploaded_passport"
            control={control}
            register={register}
            setValue={setValue}
            fileTypes={["images"]}
            error={errors.uploaded_passport?.message as string}
          />

          <InputField
            label="تاريخ إنتهاء جواز السفر"
            placeholder="يوم / شهر / سنه"
            type="date"
            register={register}
            name="passport_expiration_date"
            error={errors.passport_expiration_date?.message as string}
          />
        </Row>
        <hr className="hr" />
        <Heading text="المواد" />
        <Row>
          <MultiChoices
            register={register}
            name="subject_choices"
            // isRequired
            disabled={!isTeacher && employType === "Staff"}
            error={errors.subject_choices?.message as string}
            predefinedChoices={
              specificEmployeeData && specificEmployeeData?.subject_choices
            }
          />
          <article className="group"></article>
        </Row>
        <hr className="hr" />
        <Heading text="تفاصيل التوظيف" />

        <div className={elementContainer}>
          <InputField
            label="مُسمي"
            placeholder="مُعلم العلوم"
            register={register}
            name="position"
            error={errors.position?.message as string}
          />
        </div>

        <div className={elementContainer}>
          <Dropdown
            label="نوع أجر الدرس"
            name="wage_type"
            register={register}
            options={WAGE_TYPES}
            disabled={!isTeacher && employType === "Staff"}
            error={errors.wage_type?.message as string}
          />

          {watch("work_wage_type") === "wage" ? (
            <InputField
              label="معدل الأجر"
              placeholder="معدل الأجر"
              register={register}
              name="employee_wage"
              disabled={!isTeacher && employType === "Staff"}
              error={errors.employee_wage?.message as string}
            />
          ) : (
            <article className="group"></article>
          )}
        </div>
        <div className={elementContainer}>
          <Dropdown
            label="نوع الأجر غير التدريسي"
            name="work_wage_type"
            register={register}
            options={WORK_WAGE_TYPES}
            disabled={!isTeacher && employType === "Staff"}
            error={errors.work_wage_type?.message as string}
          />

          {watch("work_wage_type") === "wage" ? (
            <InputField
              label="معدل الأجر"
              placeholder="معدل الأجر"
              register={register}
              name="work_wage"
              disabled={!isTeacher && employType === "Staff"}
              error={errors.work_wage?.message as string}
            />
          ) : (
            <article className="group"></article>
          )}
        </div>
        <hr className="hr" />

        <Heading text="الطلاب المعينون" />

        <div className={elementContainer}>
          <MultiChoices
            register={register}
            name="initial_students"
            disabled={!isTeacher && employType === "Staff"}
            error={errors.initial_students?.message as string}
            predefinedChoices={
              specificEmployeeData && specificEmployeeData?.initial_students
            }
          />

          <article className="group"></article>
        </div>

        <hr className="hr" />
        <Heading text="إضافة صلاحيات" />
        <div className={elementContainer}>
          <MultiChoices
            register={register}
            name="groups_id"
            // isRequired
            error={errors.groups_id?.message as string}
            predefinedChoices={
              specificEmployeeData && specificEmployeeData?.groups_id
            }
            position="relative"
          />
          <article className="group"></article>
        </div>

        <hr className="hr" />

        <Heading text="إضافة صلاحيات خاصة" />
        <div className={elementContainer}>
          <MultiChoices
            register={register}
            name="user_permissions_id"
            // isRequired
            error={errors.user_permissions_id?.message as string}
            predefinedChoices={
              specificEmployeeData && specificEmployeeData?.user_permissions_id
            }
            position="relative"
          />
          <article className="group"></article>
        </div>
        <div className="submit-buttons-container">
          <button type="submit" className="btn submit-btn">
            {isSubmitting ? (
              <CircleLoadingIndecator size={16} color="#fff" />
            ) : (
              " حفظ"
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              console.log("errors", errors);

            }}
            className="btn cancel-btn"
          >
            errors
          </button>
          {/*<button*/}
          {/*  type="button"*/}
          {/*  onClick={() => {*/}
          {/*    console.log("errors", errors);*/}
          {/*    console.log("values", control._getWatch("subject_choices"));*/}
          {/*  }}*/}
          {/*  className="btn cancel-btn"*/}
          {/*>*/}
          {/*  test*/}
          {/*</button>*/}
        </div>
      </form>
    </>
  );
};
export default EditEmployeeForm;

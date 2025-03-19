import { useCallback, useEffect, useState } from 'react';
import {
  DatePicker,
  Dropdown,
  InputField,
  LoadingIndicator,
  MultiChoices,
  PhoneField,
  Row,
  UploadFile,
} from "@/components";
import { STATUS_OPTIONS, TIMEZONES_OPTIONS } from "@/constants";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { actGetDropdownOptions, actSendDataToServer } from "@/store/single-actions";
import { Heading } from "@/components/UI";
import { useForm } from "react-hook-form";
import { TDataForSpecificEmployee } from "@/schemas/AddEmployeeSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditEmployeeSchema, TEditEmployeeForm } from '@/schemas/EditEmployeeSchema.ts';
import { WAGE_TYPES, WORK_WAGE_TYPES, } from "@/constants/dropdown-options";
import createListOfIds from "./utils/createListOfIds.ts";
import { useFeedback } from "@/store/context";
import usePredefinedChoices from "./hooks/usePredefinedChoices.ts";
import actGetSpecificEmployees from "@/store/table/act/actGetSpecificEmployee.ts";
import { TLoading } from "@/types/shared.ts";

const EditEmployeeForm = () => {
  const {id} = useParams();
  const location = useLocation();
  const [specificEmployeeData, setSpecificEmployeeData] = useState<TDataForSpecificEmployee>(location.state)
  const dispatch = useAppDispatch();
  const {openFeedbackModal} = useFeedback();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<TLoading>('idle')
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
    setValue,
    reset,
  } = useForm<TEditEmployeeForm>({
    mode: "onBlur",
    resolver: zodResolver(EditEmployeeSchema),
  });
  const setPreviousData = useCallback((response: TDataForSpecificEmployee) => {
    setValue('is_active', response.is_active ? "true" : "false");
    setValue('subject_choices', createListOfIds(response?.subject_choices_response || []));
    setValue('initial_students', createListOfIds(response?.initial_students_response || []));
    setValue('groups_id', createListOfIds(response?.groups || []));
    setValue('user_permissions_id', createListOfIds(response?.user_permissions || []));
    setValue('employee_wage', response?.employee_wage || '')
    setValue('work_wage', response?.work_wage || '')
  }, [setValue])

  const [wage, setWage] = useState({
    wage_type: "",
    work_wage_type: "",
  })

  useEffect(() => {
    dispatch(actGetSpecificEmployees({ employeeID: Number(id) })).unwrap().then(
      (res) => {
        // @ts-ignore
        setSpecificEmployeeData(res);
        setWage({
          wage_type: res?.wage_type,
          work_wage_type: res?.work_wage_type,
        })
      }
    );
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(actGetDropdownOptions({optionsFor: "subjects"}));
    if (specificEmployeeData) {
      reset(specificEmployeeData);
      setPreviousData(specificEmployeeData);
    }
  }, [dispatch, reset, setPreviousData, specificEmployeeData]);

  const isTeacher = specificEmployeeData?.include_as_teacher === true;
  const isStaff = specificEmployeeData?.employee_type === 'Staff';

  const onSubmit = (data: TEditEmployeeForm) => {
    if (data.is_active === "") {
      setLoading('failed')
      openFeedbackModal('failed', "برجاء تحديد الحالة.");
      return;
    }

    data['groups_id'] = data['groups_id']?.map(item => Number(item));
    data['user_permissions_id'] = data['user_permissions_id']?.map(item => Number(item));
    data['subject_choices'] = data['subject_choices']?.map(item => Number(item));
    data['initial_students'] = data['initial_students']?.map(item => Number(item));
    data["is_active"] = data["is_active"] === "true" ? 'True' : 'False';

    dispatch(
      actSendDataToServer({
        purpose: "add_employee",
        formData: data,
        hasFiles: true,
        isEdit: true,
        id
      })
    )
    .unwrap()
    .then((res) => {
      if (typeof res === 'string') {
        setLoading('failed')
        openFeedbackModal('failed', "حدثت مشكلة أثناء إرسال طلبك.");
        return;
      }

      setLoading('succeeded')
      openFeedbackModal("succeeded", "تم تعديل بيانات الموظف بنجاح!");
      navigate(-1);
    })
    .catch((error) => {
      setLoading('failed')
      openFeedbackModal("failed", error);
    });
  };

  const subjectChoices = usePredefinedChoices(specificEmployeeData, 'subject_choices_response');
  const initialStudentsChoices = usePredefinedChoices(specificEmployeeData, 'initial_students_response');
  const groupsIdsChoices = usePredefinedChoices(specificEmployeeData, 'groups');
  const userPermissionsChoices = usePredefinedChoices(specificEmployeeData, 'user_permissions');

  return (
    <>
      {!specificEmployeeData && <div className="loadingBox">
          <LoadingIndicator/>
      </div>}
      {loading === 'pending' && <div className="loadingBox">
          <LoadingIndicator/>
      </div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading text="نوع الموظف"/>
        <Row>
          <Dropdown
            label="الحالة"
            name="is_active"
            register={register}
            options={STATUS_OPTIONS}
            error={errors.is_active?.message as string}
            isEdit
          />
          <article className="group"></article>
        </Row>
        <Row>
          <InputField
            label="الأسم الأول"
            placeholder="الأسم الأول"
            register={register}
            name="first_name"
            error={errors.first_name?.message as string}
          />
          <InputField
            label="الأسم الأخير"
            placeholder="الأسم الأخير"
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
            name="full_name"
            error={errors.full_name?.message as string}
          />
          <InputField
            label="البريد الإلكتروني"
            placeholder="البريد الإلكتروني"
            register={register}
            name="email"
            error={errors.email?.message as string}
          />
        </Row>
        <Row>
          <Dropdown
            label="التوقيت الزمني"
            name="time_zone"
            options={TIMEZONES_OPTIONS}
            register={register}
            error={errors.time_zone?.message as string}
            isEdit
          />
          <PhoneField
            control={control}
            name="phone"
            error={errors.phone?.message as string}
            label="الهاتف المحمول"
          />
        </Row>
        <hr className="hr"/>
        <span className="mainContainer">
          <Heading text="المرفقات"/>
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

          {/*<InputField*/}
          {/*  label="تاريخ إنتهاء الرقم القومى"*/}
          {/*  placeholder="يوم / شهر / سنه"*/}
          {/*  type="date"*/}
          {/*  register={register}*/}
          {/*  name="national_id_expiration_date"*/}
          {/*  error={errors.national_id_expiration_date?.message as string}*/}
          {/*  style={{alignSelf: 'flex-end'}}*/}
          {/*/>*/}

          <DatePicker
            setValue={setValue}
            label="تاريخ إنتهاء الرقم القومى"
            register={register}
            name="national_id_expiration_date"
            error={errors.national_id_expiration_date?.message as string}
            style={{alignSelf: 'flex-end'}}
            predefinedDate={specificEmployeeData?.national_id_expiration_date}
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

          <DatePicker
            setValue={setValue}
            label="تاريخ إنتهاء جواز السفر"
            register={register}
            name="passport_expiration_date"
            error={errors.passport_expiration_date?.message as string}
            style={{alignSelf: 'flex-end'}}
            predefinedDate={specificEmployeeData?.passport_expiration_date}
          />
        </Row>
        <hr className="hr"/>
        <Heading text="المواد"/>
        <Row>
          <MultiChoices
            register={register}
            name="subject_choices"
            disabled={!isTeacher && isStaff}
            error={errors.subject_choices?.message as string}
            predefinedChoices={subjectChoices}
            setValue={setValue}
          />
          <article className="group"></article>
        </Row>
        <hr className="hr"/>
        <Heading text="تفاصيل التوظيف"/>

        <Row>
          <InputField
            label="مُسمي"
            placeholder="مُعلم العلوم"
            register={register}
            name="position"
            error={errors.position?.message as string}
          />
          <article className="group"></article>
        </Row>

        <Row>
          <Dropdown
            label="نوع أجر الدرس"
            name="wage_type"
            register={register}
            options={WAGE_TYPES}
            disabled={!isTeacher && isStaff}
            handleChange={(val) => setWage((prev) => ({
              ...prev,
              wage_type: val,
            }))}
            error={errors.wage_type?.message as string}
            isEdit
          />

          {wage.wage_type === "wage" ? (
            <InputField
              label="معدل الأجر"
              placeholder="معدل الأجر"
              register={register}
              name="employee_wage"
              disabled={!isTeacher && isStaff}
              error={errors.employee_wage?.message as string}
            />
          ) : (
            <article className="group"></article>
          )}
        </Row>
        <Row>
          <Dropdown
            label="نوع الأجر غير التدريسي"
            name="work_wage_type"
            register={register}
            options={WORK_WAGE_TYPES}
            disabled={!isTeacher && isStaff}
            error={errors.work_wage_type?.message as string}
            handleChange={(val) => setWage((prev) => ({
              ...prev,
              work_wage_type: val,
            }))}
            isEdit
          />

          {wage.work_wage_type === "wage" ? (
            <InputField
              label="معدل الأجر"
              placeholder="معدل الأجر"
              register={register}
              name="work_wage"
              disabled={!isTeacher && isStaff}
              error={errors.work_wage?.message as string}
            />
          ) : (
            <article className="group"></article>
          )}
        </Row>
        <hr className="hr"/>

        <Heading text="الطلاب المعينون"/>

        <Row>
          <MultiChoices
            register={register}
            name="initial_students"
            disabled={!isTeacher && isStaff}
            error={errors.initial_students?.message as string}
            predefinedChoices={initialStudentsChoices}
            setValue={setValue}
          />

          <article className="group"></article>
        </Row>

        <hr className="hr"/>
        <Heading text="إضافة صلاحيات"/>
        <Row>
          <MultiChoices
            register={register}
            name="groups_id"
            error=""
            predefinedChoices={groupsIdsChoices}
            position="relative"
            setValue={setValue}
          />
          <article className="group"></article>
        </Row>

        <hr className="hr"/>

        <Heading text="إضافة صلاحيات خاصة"/>
        <Row>
          <MultiChoices
            register={register}
            name="user_permissions_id"
            error=""
            predefinedChoices={userPermissionsChoices}
            position="relative"
            setValue={setValue}
          />
          <article className="group"></article>
        </Row>
          <button type="submit" className="btn submit-btn">
              تعديل
          </button>
      </form>
    </>
  );
};
export default EditEmployeeForm;

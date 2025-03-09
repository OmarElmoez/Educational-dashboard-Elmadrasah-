import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CountriesDropdown,
  Dropdown,
  InputField, LoadingIndicator,
  PhoneField,
  Row,
} from "@/components";
import { Heading } from "@/components/UI";
import { NotificationForm } from "@/components/mini-forms";
import { useFeedback } from "@/store/context";
import { actGetCountries } from "@/store/location/LocationSlice";
import { actSendDataToServer } from "@/store/single-actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { EMPLOYEE_TITLES, TIMEZONES_OPTIONS } from "@/constants";
import { STATUS_OPTIONS } from "@/constants/dropdown-options";
import { TAddParentFormData, AddParentSchema } from "@/schemas/AddParentSchema";
import formatCities from "@/utils/formatCities";
import formatStates from "@/utils/formatStates";
import { TLoading } from "@/types/shared.ts";
import removeLeadingZero from "./utils/removeLeadingZero.ts";
// -------------------------------------------------------------------------

const AddParentForm = () => {
  const dispatch = useAppDispatch();

  const { countries, cities, states, chosenState } =
    useAppSelector((state) => state.location);

  const { openFeedbackModal } = useFeedback()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TAddParentFormData>({
    mode: "onBlur",
    resolver: zodResolver(AddParentSchema),
  });

  const [loading, setLoading] = useState<TLoading>('idle')

  const onSubmit = async (data: TAddParentFormData) => {
    setLoading('pending')

    const processedData = {
      ...data,
      customer_type: "family",
      mobile_phone: removeLeadingZero(data['mobile_phone']),
      is_superuser: false,
    }

    try {
      const res = await dispatch(
        actSendDataToServer({
          purpose: "add_family",
          formData: processedData,
        })
      )
      .unwrap()

      if (typeof res === 'string') {
        setLoading('failed')
        openFeedbackModal('failed', "حدثت مشكلة أثناء إرسال طلبك.");
        return;
      }

      setLoading('succeeded')
      openFeedbackModal("succeeded", "تم اضافة العائلة بنجاح!");
      reset()

    } catch (error) {
      openFeedbackModal("failed", "حدثت مشكلة أثناء إرسال طلبك.", error as string);
      setLoading('failed')
    }

  };

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(actGetCountries());
    }
  }, [dispatch, countries]);

  const formattedCities = formatCities(cities, chosenState);

  const formattedStates = formatStates(states);

  return (
    <>
      {loading === 'pending' && <div className="loadingBox">
          <LoadingIndicator/>
      </div>}
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <Heading text="معلومات الاتصال"/>

        <Row>
          <Dropdown
            label="الحالة"
            name="status"
            register={register}
            options={STATUS_OPTIONS}
            error={errors.status?.message as string}
          />

          <Dropdown
            label="اللقب"
            register={register}
            options={EMPLOYEE_TITLES}
            isRequired
            name="salutation"
            error={errors.salutation?.message as string}
          />
        </Row>

        <Row>
          <InputField
            label="الأسم  الأول"
            isRequired
            placeholder="الأسم الأول"
            register={register}
            name="first_name"
            error={errors.first_name?.message as string}
          />

          <InputField
            label="الأسم الأخير"
            isRequired
            placeholder="الأسم الأخير"
            register={register}
            name="last_name"
            error={errors.last_name?.message as string}
          />
        </Row>

        <Row>
          <InputField
            label="الأسم بالكامل"
            isRequired
            placeholder="الأسم بالكامل"
            register={register}
            name="full_name"
            error={errors.full_name?.message as string}
          />
        </Row>

        <Row>
          <InputField
            label="البريد الإلكتروني"
            isRequired
            placeholder="البريد الإلكتروني"
            register={register}
            name="email"
            error={errors.email?.message as string}
          />
          <InputField
            label=" البريد الإلكتروني اخر"
            isRequired
            placeholder="البريد الإلكتروني"
            register={register}
            name="additional_email"
            error={errors.additional_email?.message as string}
          />
        </Row>

        <Row>
          <PhoneField
            control={control as any}
            name="mobile_phone"
            error={errors.mobile_phone?.message as string}
            isRequired
            label="الهاتف المحمول"
          />

          <PhoneField
            control={control as any}
            error={errors.work_phone?.message as string}
            name="work_phone"
            label="هاتف العمل"
          />
        </Row>

        <Row>
          <InputField
            label="هاتف المنزل"
            type="tel"
            register={register}
            name="home_phone"
            placeholder="071453343"
            error={errors.home_phone?.message as string}
          />

          <InputField
            label="العنوان"
            placeholder="الرياض / السعودية"
            register={register}
            name="address"
            error={errors.address?.message as string}
          />
        </Row>

        <Row>
          <InputField
            label="عنوان أخر"
            placeholder="الرياض / السعودية"
            register={register}
            name="address_2"
            error={errors.address_2?.message as string}
          />
        </Row>

        <Row>
          <CountriesDropdown
            name="country"
            register={register}
            setValue={setValue}
            error={errors.country?.message as string}
          />

          <Dropdown
            label="الولاية/المحافظة"
            name="state"
            register={register}
            options={formattedStates}
            error={errors.state?.message as string}
          />
        </Row>

        <Row>
          <Dropdown
            label="المدينة"
            name="city"
            register={register}
            options={formattedCities}
            error={errors.city?.message as string}
          />

          <Dropdown
            label="التوقيت الزمني"
            isRequired
            name="time_zone"
            options={TIMEZONES_OPTIONS}
            register={register}
            error={errors.time_zone?.message as string}
          />
        </Row>

        <Row>
          <InputField
            label="الرمز البريدي"
            placeholder="232322+"
            register={register}
            name="zip"
            error={errors.zip?.message as string}
          />

          {/* ***************************** اضافة جهات اتصال ************************** */}
          <InputField
            label="معلومات إضافية"
            placeholder="اكتب معلوماتك الإضافية"
            register={register}
            name="additional_notes"
            error={errors.additional_notes?.message as string}
            textarea
          />
        </Row>

        <hr className="hr"/>

        <NotificationForm register={register}/>

        <hr className="hr"/>

        <div className="submit-buttons-container">
          <button type="submit" className="btn submit-btn">
            حفظ
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
    </>
  );
};

export default AddParentForm;

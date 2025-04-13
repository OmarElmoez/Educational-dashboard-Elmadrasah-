import { useState } from "react";
import { DateOrTimePicker, Dropdown, Row } from "@/components";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { TFilterData } from "@/pages/admin/lists/InvoicesList.tsx";

const FILTER_STATUS_OPTIONS = [
  {label: "الجميع", value: "all"},
  {label: "فى انتظار الموافقة", value: "Saved"},
  {label: "فى انتظار الدفع", value: "Approved"},
  {label: "مدفوع", value: "Paid"},
  {label: "استبعاد", value: "Void"},
];

interface FilterFormProps {
  submitFn: (data: TFilterData) => void
}

// -------------------------------------------------------------------

const FilterForm = ({submitFn}: FilterFormProps) => {

  const {setValue, register, reset, handleSubmit} = useForm<TFilterData>();


  const onSubmit = (data: TFilterData) => {
    setRemovePreviewChoices(false);
    submitFn(data)
  };

  const [removePreviewChoices, setRemovePreviewChoices] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <h3 className="adminFormLabel !text-[1.6rem]">الفترة الزمنية</h3>
      <Row style={{gap: "1.6rem", marginTop: "0.5rem", marginBottom: "0"}}>

        <DateOrTimePicker
          setValue={setValue}
          label="من"
          register={register}
          name="startDate"
          error=""
          removePreviewChoices={removePreviewChoices}
          style={{alignSelf: 'flex-end'}}
        />

        <DateOrTimePicker
          setValue={setValue}
          label="الى"
          register={register}
          name="endDate"
          error=""
          removePreviewChoices={removePreviewChoices}
          style={{alignSelf: 'flex-end'}}
        />
      </Row>

      <h3 className="adminFormLabel !text-[1.6rem]">حالة الفاتورة</h3>
      <Row style={{marginTop: "0.8rem"}}>
        <Dropdown
          name="status"
          register={register}
          options={FILTER_STATUS_OPTIONS}
          error=""
        />
      </Row>

      <div className="search-button-container">
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          بحث
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            reset();
            setRemovePreviewChoices(true)
            submitFn({
              startDate: '',
              endDate: '',
              status: ''
            })
          }}
        >
          إلغاء
        </Button>
      </div>
    </form>
  );
};

export default FilterForm;

import { useForm } from "react-hook-form";
import { useState } from "react";
import { DateOrTimePicker, Row } from "@/components";
import { Button } from "@mui/material";
import { TOrdersFilterData } from "@/pages/admin/orders/list/ordersList.tsx";

interface FilterFormProps {
  submitFn: (data: TOrdersFilterData) => void
}

const FilterForm = ({submitFn}: FilterFormProps) => {

  const {setValue, register, reset, handleSubmit} = useForm<TOrdersFilterData>();


  const onSubmit = (data: TOrdersFilterData) => {
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
          name="start_date"
          error=""
          removePreviewChoices={removePreviewChoices}
          style={{alignSelf: 'flex-end'}}
        />

        <DateOrTimePicker
          setValue={setValue}
          label="الى"
          register={register}
          name="end_date"
          error=""
          removePreviewChoices={removePreviewChoices}
          style={{alignSelf: 'flex-end'}}
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
              start_date: '',
              end_date: '',
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
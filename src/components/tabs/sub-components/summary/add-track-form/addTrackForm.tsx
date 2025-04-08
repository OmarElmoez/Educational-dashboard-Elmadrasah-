import {Dropdown, InputField, Row} from "@/components";

import styles from './addTrackForm.module.css'
import {useFieldArray, useForm} from "react-hook-form";
import {Button} from "@/components/UI";
import {actAddNewTrack} from "@/services/lessons.ts";
import {useParams} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import AddTrackSchema, {TTrack} from "@/schemas/AddTrackSchema.ts";
import {TTrackFromServer} from "@/components/tabs/sub-components/summary/Summary.tsx";

const {trackForm, add_goal, goals_container} = styles;

const TRACK_STATUS_OPTIONS = [
  {
    label: "قادم",
    value: "upcoming"
  },
  {
    label: "منتهي",
    value: "finished"
  }
]

// export type TTrackSubmittedData = {
//   title: string;
//   description: string;
//   status: string;
//   track_goals: {
//     text: string
//   }[]
// }

const AddTrackForm = ({addNewTrack}: { addNewTrack: (track: TTrackFromServer) => void }) => {

  const {classId} = useParams();

  const {register, control, handleSubmit, reset, formState: {errors}} = useForm<TTrack>({
    resolver: zodResolver(AddTrackSchema),
    defaultValues: {
      track_goals: [
        {
          text: ""
        }
      ],
      title: "",
      description: "",
      status: "",
    }
  });

  const {fields, append} = useFieldArray({
    control,
    name: "track_goals"
  });

  const addNewGoal = () => {
    append({text: ""});
  }

  const onSubmit = (data: TTrack) => {
    if (classId) {
      actAddNewTrack(classId, data).then((res) => {
        addNewTrack(res)
        reset();
      })

    }
  }

  return (
    <form method="post" className={trackForm} onSubmit={handleSubmit(onSubmit)}>
      <Row style={{ alignItems: "flex-start" }}>
        <span>عنوان</span>
        <InputField name="title" register={register} error={errors.title?.message as string} />
        {/*<input type="text" className='inputField' {...register('title')} />*/}
      </Row>

      <Row style={{ alignItems: "flex-start" }}>
        <span>الحالة</span>
        <Dropdown name="status" options={TRACK_STATUS_OPTIONS} register={register}
                  error={errors.status?.message as string}/>
      </Row>

      <Row style={{alignItems: "flex-start"}}>
        <span>الوصف</span>
        <textarea {...register("description")} />
      </Row>
      {errors &&
          <p className="error" style={{marginTop: "-1rem", marginBottom: "1rem"}}>{errors.description?.message}</p>}

      <Row style={{gap: "1.9rem", alignItems: "flex-start"}}>
        <span>الأهداف</span>
        <section className={goals_container}>
          {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <input type="text" className='inputField' {...register(`track_goals.${index}.text`)}
                         placeholder={`هدف رقم ${index + 1}`}/>
                  {errors && <p className="error">{errors?.track_goals?.[index]?.text?.message}</p>}
                </div>
              )
            }
          )}
        </section>
      </Row>

      <div className={add_goal} onClick={addNewGoal}>
        <span>
          +
        </span>
        <span>إضافة هدف</span>
      </div>

      <Button>
        <span>إضافة مسار</span>
      </Button>
    </form>
  )
}

export default AddTrackForm;
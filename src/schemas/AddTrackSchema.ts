import {z} from "zod";

const AddTrackSchema = z.object({
  title: z.string().min(1, "برجاء ادخال عنوان المسار"),
  description: z.string().min(1, 'برجاء كتابة وصف مختصر للمسار'),
  status: z.string().min(1, 'يجب اختيار حالة المسار'),
  track_goals: z.array(z.object({
    text: z.string().min(1, "برجاء كتابة الهدف")
  }))
})

export type TTrack = z.infer<typeof AddTrackSchema>

export default AddTrackSchema;
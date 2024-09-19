import { z } from "zod";

const AddSubjectSchema = z.object({
  name_ar: z.string().min(1, "برجاء ادخال الاسم بالعربية"),
  name_en: z.string().min(1, "برجاء ادخال الاسم بالانجليزية"),
})

export type TAddSubjectFormData = z.infer<typeof AddSubjectSchema>;

export default AddSubjectSchema;
import {z} from "zod";

const RolesSchema = z.object({
  name: z.string().min(1, "يجب كتابة اسم للدور الوظيفي"),
  permissions: z.array(z.string()).refine((data) => data.length > 0, {
    message: "يجب ان يحتوي الدور علي صلاحية واحدة علي الاقل",
  })
})
export type TRoles = z.infer<typeof RolesSchema>;
export default RolesSchema

export type TRolesForServer = Omit<TRoles, 'permissions'> & {
  permissions: number[];
}
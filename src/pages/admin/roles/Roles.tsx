import {Heading} from "@/components/UI";

import styles from './roles.module.css'
import {InputField, MultiChoices, Row} from "@/components";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import RolesSchema, {TRoles, TRolesForServer} from "@/schemas/RolesSchema.ts";
import {createAPermissionGroup} from "@/services/permissions.ts";
import {useFeedback} from "@/store/context";
import {useState} from "react";

const {desc, line} = styles;

const Roles = () => {

  const {register, formState: {errors}, handleSubmit, reset} = useForm<TRoles>(
    {
      defaultValues: {
        permissions: []
      },
      resolver: zodResolver(RolesSchema),
    }
  );

  const {openFeedbackModal} = useFeedback();
  const [removePreviewChoices, setRemovePreviewChoices] = useState(false)

  const onSubmit = (data: TRoles) => {
    const serverData: TRolesForServer = {
      ...data,
      permissions: data.permissions.map((item) => Number(item))
    }

    createAPermissionGroup(serverData).then((res) => {
      if (typeof res === "string") {
        openFeedbackModal("failed", res)
      } else {
        openFeedbackModal("succeeded", "تم إضافة الدور بنجاح");
        reset();
        setRemovePreviewChoices(true)
      }
    })
  }

  return (
    <>
      <Heading text="إضافة دور جديد" style={{fontWeight: "700", marginBottom: "0"}}/>
      <p className={desc}>اكتب اسم للدور و قم باختيار الصلاحيات المناسبة</p>
      <hr className={line} style={{marginTop: "0.8rem"}}/>
      <form style={{paddingTop: "2.4rem"}} onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <InputField name="name" register={register} error={errors.name?.message as string} label="اسم الدور الوظيفي"
                      isRequired/>
          <section className="group"></section>
        </Row>
        <hr className={line} style={{marginBlock: "2.4rem"}}/>
        <MultiChoices
          register={register}
          name="permissions"
          isRequired
          error={errors.permissions?.message as string}
          removePreviewChoices={removePreviewChoices}
        />
        <Row style={{justifyContent: "flex-end", marginTop: "1.4rem"}}>
          <button type="submit" className="btn submit-btn">
            حفظ
          </button>
          <button
            type="button"
            className="btn cancel-btn"
            onClick={() => {
              reset();
              setRemovePreviewChoices(true)
            }}
          >
            إلغاء
          </button>
        </Row>
      </form>
    </>
  )
}

export default Roles;
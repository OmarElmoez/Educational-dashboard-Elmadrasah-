import { InputField } from "@/components";
import { useForm } from "react-hook-form";
import { Button, Heading } from "@/components/UI";
import ShareIcon from "@/assets/share.svg?react"
import FlagIcon from "@/assets/flag.svg?react"
import { useParams } from "react-router-dom";
import { sendBehaviorNote, sendNoteToAdmin } from "@/services/lessons.ts";
import { useFeedback } from "@/store/context";

type TManagementForm = {
  "description": string
}

type TBehaviorForm = {
  "description": string
}

const Notes = () => {

  const {register, handleSubmit, reset} = useForm<TManagementForm>();
  const {register: behaviorRegister, handleSubmit: behaviorSubmit, reset: behaviorReset} = useForm<TBehaviorForm>();

  const {classId} = useParams();

  const {openFeedbackModal} = useFeedback();

  const onSubmitNote = (data: TManagementForm) => {
    if(!data.description || data.description.trim() === "") {
      openFeedbackModal('failed', "لا يمكن ارسال ملاحظة فارغة.")
      return
    }
    if (classId) {
      sendNoteToAdmin({data, classId}).then((res) => {
        if (res.status === 400) {
          openFeedbackModal('failed', JSON.parse(res.response).error)
        } else {
          openFeedbackModal('succeeded', res.data.message)
        }
        reset()
      })
    }
  }

  const onSubmitBehaviour = (data: TBehaviorForm) => {
    if(!data.description || data.description.trim() === "") {
      openFeedbackModal('failed', "لا يمكن ارسال ملاحظة فارغة.")
      return
    }
    if (classId) {
      sendBehaviorNote({data, classId}).then((res) => {
        if (res.status === 400) {
          openFeedbackModal('failed', JSON.parse(res.response).error)
        } else {
          openFeedbackModal('succeeded', res.data.message)
        }
        behaviorReset()
      })
    }
  }

  return (
    <article className="mt-[2.8rem]">
      <form onSubmit={handleSubmit(onSubmitNote)}>
        <Heading text="إرسال ملاحظة إلى الإدارة" style={{marginBottom: "2rem"}}/>
        <InputField name="description" register={register} error="" textarea placeholder="أدخل ملاحظاتك إلي الإدارة"/>
        <Button style={{width: '204px', height: '51px', paddingBlock: '14.5px', marginRight: 'auto'}}>
          <ShareIcon/>
          <span>إرسال ملاحظة</span>
        </Button>
      </form>
      <form onSubmit={behaviorSubmit(onSubmitBehaviour)}>
        <Heading text="توضيح سلوك الطالب" style={{marginBottom: "2rem"}}/>
        <InputField name="description" register={behaviorRegister} error="" textarea
                    placeholder="وصف سبب الإبلاغ عن الطالب"/>
        <Button style={{
          width: '204px',
          height: '51px',
          paddingBlock: '14.5px',
          marginRight: 'auto',
          backgroundColor: '#C92516'
        }}>
          <FlagIcon/>
          <span>إرسال</span>
        </Button>
      </form>
    </article>
  )
}

export default Notes;
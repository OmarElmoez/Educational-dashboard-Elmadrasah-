import SuccessFeedback from '@/assets/successFeedback.svg?react';
import FailedFeedback from '@/assets/failedFeedback.svg?react';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './reviewFeedback.module.css'

const { reviewModal } = styles

type TContentForStatus = {
  [key in "succeeded" | "failed"]: {
    icon: React.ReactNode;
    title: string;
    desc?: string;
  }

}


const ReviewFeedback = forwardRef(({ status, error }: { status: "succeeded" | "failed", error?: string }, ref) => {

  const dialog = useRef<HTMLDialogElement>(null)

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current?.showModal()
      },
      close() {
        dialog.current?.close()
      }
    }
  })

  const contentForStatus: TContentForStatus = {
    "succeeded": {
      icon: <SuccessFeedback />,
      title: "تم إرسال تقييمك بنجاح!",
    },
    "failed": {
      icon: <FailedFeedback />,
      title: "حدث خطأ اثناء التقييم.",
      desc: error
    }
  }

  return createPortal(
    <dialog ref={dialog} className={`modal ${reviewModal}`}>
      {contentForStatus[status].icon}
      <h3>{contentForStatus[status].title}</h3>
      {contentForStatus[status].desc && <p className='error'>{contentForStatus[status].desc}</p>}
    </dialog>,
    document.getElementById("modal")!
  )
})

ReviewFeedback.displayName = "ReviewFeedback"
ReviewFeedback.propTypes

export default ReviewFeedback
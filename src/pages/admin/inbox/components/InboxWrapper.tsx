import { ImgBox } from "@/components/UI";
import ImgPlaceholder from "@/assets/person-placeholder.svg?react";
import { Rate } from "@/components";
import { ReactNode } from "react";
import { TInboxReview } from "@/services/inbox";
import formatFullArabicDate from "@/utils/formatFullArabicDate.ts";

type TInboxWrapperProps = {
  children?: ReactNode;
  review: TInboxReview;
}

const InboxWrapper = ({children, review}: TInboxWrapperProps) => {
  return (
    <article className="pb-[1.6rem] border-b-1 border-[#E4E4E4] border-dashed flex justify-between items-center">
      <section className="flex items-center gap-[1.4rem]">
        <ImgBox size="63px">
          {review?.reviewer_image ? (
            <img
              src={review?.reviewer_image}
              alt="employee image"
              style={{minWidth: "56px"}}
            />
          ) : (
            <ImgPlaceholder style={{minWidth: "56px"}}/>
          )}
        </ImgBox>
        <div className="grid gap-[1.6rem]">
          <h2
            className="text-black text-[1.5rem]">{review?.reviewed_by === "Teacher" ? `قام المعلم ${review?.reviewer_name} بتقييم الطالب ${review?.reviewed_name} مادة الرياضيات` : `قام الطالب ${review?.reviewer_name} بتقييم المعلم ${review?.reviewed_name} مادة الرياضيات`}</h2>
          <div className="flex gap-[0.8rem]">
            {review?.answer && <p className="text-[#969292] text-[1.4rem]">{review?.answer}</p>}
            <Rate defaultRate={Math.trunc(review.average_rating)}/>
          </div>
          <p className="text-[#969292] text-[1.4rem]">{formatFullArabicDate(review?.created_at)}</p>
        </div>
      </section>
      {children && <section className="flex  gap-[1.6rem] items-center">
        {children}
      </section>}
    </article>
  )
}

export default InboxWrapper
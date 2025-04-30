import { ImgBox } from "@/components/UI";
import ImgPlaceholder from "@/assets/person-placeholder.svg?react";
import { Rate } from "@/components";
import { ReactNode } from "react";

type TInboxWrapperProps = {
  img?: string;
  children?: ReactNode;
}

const InboxWrapper = ({img, children}: TInboxWrapperProps) => {
  return (
    <article className="pb-[1.6rem] border-b-1 border-[#E4E4E4] border-dashed flex justify-between items-center">
      <section className="flex items-center gap-[1.4rem]">
        <ImgBox size="63px">
          {img ? (
            <img
              src={img}
              alt="employee image"
              style={{ minWidth: "56px" }}
            />
          ) : (
            <ImgPlaceholder style={{ minWidth: "56px" }} />
          )}
        </ImgBox>
        <div className="grid gap-[1.6rem]">
          <h2 className="text-black text-[1.5rem]">قام الطالب omar أشرف بتقيم المعلم خالد يوسف مادة الرياضيات</h2>
          <div className="flex gap-[0.8rem]">
            <p className="text-[#969292] text-[1.4rem]">اشكر المعلم على مجهوده معى</p>
            <Rate defaultRate={4} />
          </div>
          <p className="text-[#969292] text-[1.4rem]">التاريخ : 31/1/2025</p>
        </div>
      </section>
      {children && <section className="flex  gap-[1.6rem] items-center">
        {children}
      </section>}
    </article>
  )
}

export default InboxWrapper
import { ReactNode } from "react";

const InfoGroup = ({children}: {children: ReactNode}) => {
  return (
    <section className="grid gap-[1.6rem]">
      {children}
    </section>
  )
}

export default InfoGroup;
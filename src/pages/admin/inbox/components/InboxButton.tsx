import { Button } from "@/components/UI";
import { ReactNode } from "react";

type TInboxButtonProps = {
  title: string;
  bgColor?: string;
  onClick: () => void;
  icon?: ReactNode;
}

const InboxButton = ({title, onClick, bgColor = "var('main-color')", icon}: TInboxButtonProps) => {
  return (
    <Button
      style={{
      fontSize: '1.4rem',
      fontWeight: 400,
      height: '48px',
      width: '113px',
      paddingBlock: '1.4rem',
      backgroundColor: bgColor,
      }}
      onClick={onClick}
    >
      {icon}
      {title}
    </Button>
  )
}

export default InboxButton
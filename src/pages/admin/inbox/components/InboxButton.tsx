import { Button } from "@/components/UI";
import CheckCircle from '@/assets/check-circle.svg?react'
import CloseIcon from "@/assets/inbox-close-icon.svg?react"
import EyeIcon from '@/assets/EyeIcon.svg?react'

type TInboxButtonProps = {
  onClick: () => void;
  type: 'accept' | 'reject' | 'view';
  disableKey?: boolean;
}

const TYPE_VARIANTS = {
  accept: {
    icon: <CheckCircle />,
    bgColor: "var(--main-color)",
  },
  reject: {
    icon: <CloseIcon />,
    bgColor: '#C92516',
  },
  view: {
    icon: <EyeIcon />,
    bgColor: '#0650A7',
  }
}

const InboxButton = ({onClick, type, disableKey}: TInboxButtonProps) => {

  return (
    <Button
      style={{
      fontSize: '1.4rem',
      fontWeight: 400,
      paddingBlock: '0',
      backgroundColor: "transparent",
      width: 'fit-content',
      height: 'auto'
      }}
      onClick={onClick}
      disableKey={disableKey}
    >
      {TYPE_VARIANTS[type].icon}
    </Button>
  )
}

export default InboxButton
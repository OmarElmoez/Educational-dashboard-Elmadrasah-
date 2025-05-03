import { Button } from "@/components/UI";
import CheckCircle from '@/assets/check-circle.svg?react'
import CloseIcon from "@/assets/inbox-close-icon.svg?react"
import DownloadIcon from '@/assets/download.svg?react'

type TInboxButtonProps = {
  onClick: () => void;
  type: 'accept' | 'reject' | 'download';
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
  download: {
    icon: <DownloadIcon />,
    bgColor: '#EDA61C',
  }
}

const InboxButton = ({onClick, type}: TInboxButtonProps) => {

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
    >
      {TYPE_VARIANTS[type].icon}
    </Button>
  )
}

export default InboxButton
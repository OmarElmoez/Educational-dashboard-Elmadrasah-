import InboxWrapper from "./components/InboxWrapper.tsx";
import InboxButton from "./components/InboxButton.tsx";
import DownloadIcon from '@/assets/inbox-download.svg?react'

const Reviews = () => {
  return <>
    <InboxWrapper>
      <InboxButton title="تنزيل الملف" bgColor="#EDA61C" onClick={() => console.log('download')} icon={<DownloadIcon />} />
      <InboxButton title="قبول" onClick={() => console.log('accept')} />
      <InboxButton title="رفض" bgColor="#C92516" onClick={() => console.log('reject')} />
    </InboxWrapper>
  </>
}

export default Reviews
const InfoBox = ({boxKey, boxValue}: {boxKey: string, boxValue: string | undefined}) => {
  return (
    <div className="flex flex-1 gap-[2rem]">
      <span className="text-[#000000CC] text-nowrap">{boxKey}:</span>
      <span className="text-[#818181] text-[1.4rem]" style={{direction: "ltr"}}>{boxValue}</span>
    </div>
  )
}

export default InfoBox;
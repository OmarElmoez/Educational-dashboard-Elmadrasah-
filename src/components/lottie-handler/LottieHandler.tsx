import LottieFilesPaths from "public/lottieFiles";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

const LottieHandler = ({type}: { type: keyof typeof LottieFilesPaths }) => {
  if (type === 'loading') {
    return (<div
      style={{width: '600px', marginInline: 'auto', top: "50%", transform: 'translate(-50%, -50%)', position: 'absolute', left: '50%'}}>
      <DotLottieReact
        loop
        autoplay
        src={`${LottieFilesPaths["loading"]}`}
      />
    </div>)
  }
  return (
    <DotLottieReact
      loop
      autoplay
      src={`${LottieFilesPaths[type]}`}
    />
  )
}

export default LottieHandler;
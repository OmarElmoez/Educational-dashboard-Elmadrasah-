import LottieFilesPaths from "public/lottieFiles";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

const LottieHandler = ({type}: { type: keyof typeof LottieFilesPaths }) => {
  return (
    <DotLottieReact
      loop
      autoplay
      src={`${LottieFilesPaths[type]}`}
    />
  )
}

export default LottieHandler;
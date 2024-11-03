import LottieHandler from "@/components/lottie-handler/LottieHandler.tsx";
import {Link} from "react-router-dom";
import LottieFilesPaths from "public/lottieFiles";

const Error = ({type, isLogin = false}: { type: keyof typeof LottieFilesPaths, isLogin?: boolean }) => {
  return (
    <>
      <LottieHandler type={type}/>
      {isLogin && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "3rem",
          position: "absolute",
          bottom: "16rem",
        }}>
          <span className="error" style={{ fontSize: '1.6rem' }}>لم نستطع إيجاد هذا الإيميل</span>
          <Link to='../' style={{
            backgroundColor: 'var(--main-color)',
            color: "#fff",
            borderRadius: "0.5rem",
            paddingBlock: "1.2rem",
            width: "150px",
            textAlign: "center"
          }}>الرجوع</Link>
        </div>
      )}
    </>
  )
}

export default Error;


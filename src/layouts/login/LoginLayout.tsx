import LoginImg from '@/assets/login-img.svg?react'
import styles from "./loginLayout.module.css";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {

  const {
    wrapper,
    leftBox,
    rightBox,
    login_imgBox
  } = styles;

  return (
    <main className={`container ${wrapper}`}>
    <section className={rightBox} data-testid="right-box">
      <Outlet />
    </section>
    <section className={leftBox} data-testid="left-box">
      <div className={login_imgBox} data-testid="login-img">
        <LoginImg />
      </div>
    </section>
  </main>
  )
}

export default LoginLayout
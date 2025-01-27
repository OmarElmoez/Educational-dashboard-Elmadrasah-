
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
    <section className={rightBox}>
      <Outlet />
    </section>
    <section className={leftBox}>
      <div className={login_imgBox}>
        <LoginImg />
      </div>
    </section>
  </main>
  )
}

export default LoginLayout
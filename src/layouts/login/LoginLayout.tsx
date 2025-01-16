
import LoginImg from '@/assets/login-img.svg?react'
import styles from "./loginLayout.module.css";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {

  const {
    wrapper,
    leftBox,
    rightBox,
  } = styles;

  return (
    <main className={`container ${wrapper}`}>
    <section className={rightBox}>
      <Outlet />
    </section>
    <section className={leftBox}>
      <LoginImg />
    </section>
  </main>
  )
}

export default LoginLayout
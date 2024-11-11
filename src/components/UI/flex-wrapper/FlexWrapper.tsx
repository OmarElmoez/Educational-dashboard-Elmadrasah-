import {ReactNode} from "react";
import styles from "./flexWrapper.module.css"

const { wrapper } = styles;

const FlexWrapper = ({children}: {children: ReactNode}) => {
  return <section className={wrapper}>{children}</section>
}

export default FlexWrapper;
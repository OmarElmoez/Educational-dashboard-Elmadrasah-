import styles from './imgBox.module.css'
import {ReactNode} from "react";

const {img_box} = styles;

const ImgBox = ({children, size}: {children: ReactNode, size: string}) => {
  return (
    <div className={img_box} style={{ width: size, height: size }}>
      {children}
    </div>
  )
}

export default ImgBox;
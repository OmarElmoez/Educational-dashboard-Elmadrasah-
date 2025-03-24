import {CSSProperties, ReactNode} from "react";
import styles from './button.module.css'

const { button } = styles;

type TButtonProps = {
  variant?: 'text' | 'outlined' | 'contained';
  children: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
}

const Button = ({children, style, onClick}: TButtonProps) => {
  return (
    <button className={button} style={style} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;
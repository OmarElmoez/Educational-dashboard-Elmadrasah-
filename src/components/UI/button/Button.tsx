import {CSSProperties, ReactNode} from "react";
import styles from './button.module.css'

const { button } = styles;

type TButtonProps = {
  variant?: 'text' | 'outlined' | 'contained';
  children: ReactNode;
  style?: CSSProperties;
  disableKey?: boolean;
  onClick?: () => void;
}

const Button = ({children, style, onClick, disableKey}: TButtonProps) => {
  return (
    <button className={button} style={style} onClick={onClick} disabled={disableKey}>
      {children}
    </button>
  )
}

export default Button;
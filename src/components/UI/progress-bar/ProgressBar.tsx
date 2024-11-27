import styles from './progressbar.module.css'
import {CSSProperties} from "react";

const {progress_box, progress_bar} = styles;

type TProgressBar = {
  width: string,
  color1?: string,
  color2?: string,
  style?: CSSProperties,
}

const ProgressBar = ({width, color1 = "#1C8A44", color2 = "#68aa80", style}: TProgressBar) => {
  return (
    <div className={progress_box} style={style}>
      <div className={progress_bar} style={{
        width: width,
        backgroundImage: `repeating-linear-gradient(70deg, ${color1}, ${color1} 10px, ${color2} 10px, ${color2} 20px)`
      }}></div>
    </div>
  )
}

export default ProgressBar;
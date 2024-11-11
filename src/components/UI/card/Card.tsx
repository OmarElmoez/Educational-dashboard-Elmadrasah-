import styles from './card.module.css'
import {ReactNode} from "react";

const {card} = styles

const Card = ({children}: {children: ReactNode}) => {
  return (
    <article className={card}>
      {children}
    </article>
  )
}

export default Card
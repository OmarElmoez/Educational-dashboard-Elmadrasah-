import HappyIcon from '@/assets/happy.svg?react'
import SadIcon from '@/assets/sad.svg?react'
import styles from './satisfaction.module.css'

const {satisfaction_wrapper} = styles;

type TSatisfaction = {
  type: 'happy' | 'sad',
  rate: string,
}

const Satisfaction = ({type, rate}: TSatisfaction) => {
  return (
    <div className={satisfaction_wrapper}>
      {type === 'happy' ? <HappyIcon /> : <SadIcon />}
      <span>{rate}</span>
    </div>
  )
}

export default Satisfaction;
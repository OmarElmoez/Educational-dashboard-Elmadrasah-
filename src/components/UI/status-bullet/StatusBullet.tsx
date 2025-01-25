import styles from './statusBullet.module.css'

const {status_container, bullet, title} = styles;

type TStatusBullet = {
  color: string,
  label: string,
  size?:number,
  fontSize?:number,
}

const StatusBullet = ({color, label, size = 8, fontSize=8}: TStatusBullet) => {
  return (
    <div className={status_container}>
      <span className={bullet} style={{ backgroundColor: color, width:`${size}px`, height:`${size}px` }}></span>
      <span className={title} style={{fontSize:`${fontSize}px`}}>{label}</span>
    </div>
  );
}

export default StatusBullet
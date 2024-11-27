import styles from './statusBullet.module.css'

const {status_container, bullet, title} = styles;

type TStatusBullet = {
  color: string,
  label: string,
}

const StatusBullet = ({color, label}: TStatusBullet) => {
  return (
    <div className={status_container}>
      <span className={bullet} style={{ backgroundColor: color }}></span>
      <span className={title}>{label}</span>
    </div>
  );
}

export default StatusBullet
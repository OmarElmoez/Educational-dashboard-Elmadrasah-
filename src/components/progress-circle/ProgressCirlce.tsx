import {useEffect, useState} from "react"
import styles from './progressCircle.module.css'

const {wrapper, svg, progress_circle, progress_number} = styles;

const ProgressCircle = ({
                          size = 77,
                          value = 80,
                          strokeWidth = 4,
                          color = "rgb(22 163 74)",
                        }: {
  value?: number
  size?: number
  strokeWidth?: number
  color?: string
} = {}) => {
  const [progress, setProgress] = useState(0)

  // Calculate circle properties
  const center = size / 2
  const radius = center - strokeWidth
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    // Animate the progress
    setProgress(value)
  }, [value])

  return (
    <div className={wrapper}>
      <svg width={size} height={size} className={svg}>
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
          strokeLinecap="round"
          className={progress_circle}
        />
      </svg>
      <div className={progress_number}>{Math.round(progress)}</div>
    </div>
  )
}

export default ProgressCircle;
import StarIcon from "@/assets/star.svg?react"

import styles from './starRating.module.css'

const {stars_container} = styles;

type TRateProps = {
  numberOfStars?: number,
  defaultRate?: number,
}

const Rate = ({numberOfStars = 5, defaultRate = 0}: TRateProps) => {

  return (
      <section className={stars_container}>
        {[...Array(numberOfStars)].map((_, idx) => {
            const starNumber = idx + 1;
            return (
                <StarIcon key={idx} style={{color: starNumber <= defaultRate ? "#FFB800" : "#E0E0E0"}}/>
            )
          }
        )}
      </section>
  )
}

export default Rate;
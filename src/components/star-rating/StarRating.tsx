/*
  Todo:
   2- define props => number of stars, defaultValue, onChange function and label
*/

import StarIcon from "@/assets/star.svg?react"
import {useState} from "react";

import styles from './starRating.module.css'
import {FieldValues, Path, UseFormRegister} from "react-hook-form";

const {rating_label, stars_container} = styles;

type TStarRatingProps<T extends FieldValues> = {
  numberOfStars?: number,
  onChange?: (rating: number) => void,
  defaultRate?: number,
  label?: string,
  name: Path<T>,
  setValue: (name: Path<T>, val: number) => void,
  register: UseFormRegister<T>,
}

const StarRating = <T extends FieldValues>({numberOfStars = 5, defaultRate = 0, label, name, setValue, register}: TStarRatingProps<T>) => {

  const [rating, setRating] = useState(defaultRate)
  const [hover, setHover] = useState(0)

  const onClickHandler = (num: number) => {
    setRating(num);
    setValue(name, num);
  }

  return (
    <article>
      {label && <h3 className={rating_label}>{label}</h3>}
      <section className={stars_container}>
        {[...Array(numberOfStars)].map((_, idx) => {
            const starNumber = idx + 1;
            return (
              <button {...register(name)} type="button" key={idx} onClick={() => onClickHandler(starNumber) } onMouseEnter={() => setHover(starNumber)}
                      onMouseLeave={() => setHover(0)}>
                <StarIcon style={{color: starNumber <= (hover || rating) ? "#FFB800" : "#E0E0E0"}}/>
              </button>
            )
          }
        )}
      </section>
    </article>
  )
}

export default StarRating;
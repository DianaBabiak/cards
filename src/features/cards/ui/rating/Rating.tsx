import { ComponentPropsWithoutRef } from 'react'

import { Icon } from '@/components/ui/Icon'

import s from './rating.module.scss'

type RatingProps = {
  maxRating?: number
  rating: number
} & ComponentPropsWithoutRef<'div'>

export const Rating = ({ className, maxRating = 5, rating, ...restProps }: RatingProps) => {
  const stars = [...Array(maxRating)].map((_, index) => index + 1)

  return (
    <div className={`${s.root} ${className}`} {...restProps}>
      {stars.map((star, index) => {
        return rating >= star ? (
          <span className={s.grade} key={index}>
            <Icon height={'16px'} iconId={'fillStar'} width={'16px'}></Icon>
          </span>
        ) : (
          <span className={s.grade} key={index}>
            <Icon height={'16px'} iconId={'emptyStar'} width={'16px'}></Icon>
          </span>
        )
      })}
    </div>
  )
}

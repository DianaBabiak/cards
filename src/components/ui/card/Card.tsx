import { ComponentPropsWithoutRef, forwardRef } from 'react'

import s from './card.module.scss'

export type CardProps = {} & ComponentPropsWithoutRef<'div'>

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...rest }, ref) => {
  const classNames = `${s.card} ${className}`

  return <div className={classNames} ref={ref} {...rest}></div>
})

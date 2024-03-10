import { ComponentPropsWithoutRef, ElementType } from 'react'

import { Icon } from '@/components/ui/Icon/Icon'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  isFullWidth?: boolean
  isImg?: boolean
  variant?: 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const {
    as: Component = 'button',
    children,
    className,
    isFullWidth,
    isImg,
    variant = 'primary',
    ...rest
  } = props

  return (
    <Component
      className={`${s[variant]} ${isFullWidth ? s.fullWidth : ''} ${className} ${s.button}`}
      {...rest}
    >
      <span className={s.buttonContent}>
        {isImg && <Icon height={'16px'} iconId={'buttonIcon'} width={'16px'} />}
        {children}
      </span>
    </Component>
  )
}

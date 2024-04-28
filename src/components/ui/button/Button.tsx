import { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef } from 'react'

import s from './button.module.scss'

import { Icon } from '../Icon'

type InferType<T> = T extends ElementType<infer U> ? U : never

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  buttonImg?: 'buttonIcon' | 'trash'
  isFullWidth?: boolean
  isImg?: boolean
  variant?: 'primary' | 'secondary'
  viewBox?: string
} & ComponentPropsWithoutRef<T>

export const Button = forwardRef(
  <T extends ElementType = 'button'>(props: ButtonProps<T>, ref: ForwardedRef<InferType<T>>) => {
    const {
      as: Component = 'button',
      buttonImg = 'buttonIcon',
      children,
      className,
      isFullWidth,
      isImg,
      variant = 'primary',
      viewBox,
      ...rest
    } = props

    return (
      <Component
        className={`${s[variant]} ${isFullWidth ? s.fullWidth : ''} ${className} ${s.button}`}
        ref={ref}
        {...rest}
      >
        <span className={s.buttonContent}>
          {isImg && (
            <Icon
              height={'16px'}
              iconId={`${buttonImg}`}
              viewBox={viewBox || '0 0 16 16'}
              width={'16px'}
            />
          )}
          {children}
        </span>
      </Component>
    )
  }
)

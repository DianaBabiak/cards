import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef, useState } from 'react'

import { Typography } from '@/components/ui/typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropDownMenu.module.scss'

type Props = {
  align?: 'center' | 'end' | 'start'
  children?: ReactNode
  className?: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root>
export const DropDownMenu = forwardRef<ElementRef<typeof DropdownMenu.Trigger>, Props>(
  ({ align, children, className, trigger, ...restProps }: Props, ref) => {
    const [open, setOpen] = useState(false)
    const classNames = `${s.content} ${className}`

    return (
      <DropdownMenu.Root onOpenChange={setOpen} open={open}>
        <DropdownMenu.Trigger asChild className={s.trigger} ref={ref}>
          {trigger}
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content align={align} className={classNames} sideOffset={4} {...restProps}>
            <div>{children}</div>
            <DropdownMenu.Arrow className={s.arrowWrap} />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  }
)

type PropsItem = {
  children?: ReactNode
  className?: string
  disabled?: boolean
} & ComponentPropsWithoutRef<typeof DropdownMenu.Item>
export const DropdownItem = forwardRef<ElementRef<typeof DropdownMenu.Item>, PropsItem>(
  ({ children, className, disabled, onSelect, ...restProps }: PropsItem, ref) => {
    const classNames = `${s.item} ${className}`

    return (
      <DropdownMenu.Item
        className={classNames}
        disabled={disabled}
        onSelect={onSelect}
        ref={ref}
        {...restProps}
      >
        {children}
      </DropdownMenu.Item>
    )
  }
)

type PropsItemWithImg = Omit<PropsItem, 'children'> & {
  email?: string
  icon?: ReactNode
  name?: string
}
export const DropdownItemWithImg = forwardRef<
  ElementRef<typeof DropdownMenu.Item>,
  PropsItemWithImg
>(({ className, disabled, email, icon, name, onSelect, ...restProps }: PropsItemWithImg, ref) => {
  const classNames = `${s.item} ${className}`

  return (
    <DropdownMenu.Item
      className={classNames}
      disabled={disabled}
      onSelect={onSelect}
      ref={ref}
      {...restProps}
    >
      <div className={s.icon}>{icon}</div>
      <div className={s.nameAndEmailWrapper}>
        <Typography variant={'body1'}>{name}</Typography>
        <Typography colorTheme={'dark'} variant={'caption'}>
          {email}
        </Typography>
      </div>
    </DropdownMenu.Item>
  )
})

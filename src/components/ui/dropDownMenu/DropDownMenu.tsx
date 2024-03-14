import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef, useState } from 'react'

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
          <DropdownMenu.Content align={align} className={classNames} sideOffset={8} {...restProps}>
            <DropdownMenu.Arrow className={s.arrowWrap} />
            <div>{children}</div>
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
    return (
      <DropdownMenu.Item
        className={s.item}
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

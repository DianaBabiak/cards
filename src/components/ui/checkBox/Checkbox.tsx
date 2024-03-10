import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkBox.module.scss'

export type Props = ComponentPropsWithoutRef<typeof RadixCheckbox.Root> & {
  label?: string
  onChange?: (checked: boolean) => void
}
export const Checkbox = forwardRef<ElementRef<typeof RadixCheckbox.Root>, Props>(
  ({ checked, className, disabled, id, label, onChange, ...rest }, ref) => {
    const classNames = `${s.checkboxContainer} ${className}`

    return (
      <div className={classNames}>
        <RadixCheckbox.Root
          checked={checked}
          className={s.checkBox}
          disabled={disabled}
          id={id}
          onCheckedChange={onChange}
          ref={ref}
          {...rest}
        >
          <RadixCheckbox.Indicator className={s.checkboxIndicator}>
            <CheckIcon />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label && (
          <Typography as={'label'} className={s.label} variant={'body2'}>
            {label}
          </Typography>
        )}
      </div>
    )
  }
)

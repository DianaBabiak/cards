import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as RadixSelect from '@radix-ui/react-select'

import s from './select.module.scss'

type Option = { disabled?: boolean; label: string; value: string }

export type SelectProps = {
  defaultValue?: string
  disabled?: boolean
  label?: string
  options: Array<Option>
  placeholder?: string
  required?: boolean
} & ComponentPropsWithoutRef<'div'>

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ defaultValue, disabled, label, options, placeholder, required }, ref) => {
    return (
      <RadixSelect.Root defaultValue={defaultValue} required={required}>
        <RadixSelect.Trigger
          aria-label={label}
          className={s.SelectTrigger}
          disabled={disabled}
          ref={ref}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className={`${s.SelectIcon} ${disabled && s.disabled}`}>
            <ChevronDownIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className={s.SelectContent} position={'popper'}>
            <RadixSelect.Viewport className={s.SelectViewport}>
              <RadixSelect.Group>
                {options.map(option => (
                  <SelectItem disabled={option.disabled} key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </RadixSelect.Group>
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    )
  }
)

export type SelectItemProps = {
  disabled?: boolean
  value: string
} & ComponentPropsWithoutRef<'div'>

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, disabled, value, ...props }, forwardedRef) => {
    return (
      <RadixSelect.Item
        className={`${s.SelectItem} ${className} ${disabled && s.disabled}`}
        disabled={disabled}
        value={value}
        {...props}
        ref={forwardedRef}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      </RadixSelect.Item>
    )
  }
)

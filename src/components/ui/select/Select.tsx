import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Label } from '@radix-ui/react-label'
import * as RadixSelect from '@radix-ui/react-select'

import s from './select.module.scss'

export type Option = { disabled?: boolean; label: string; value: string }

export type SelectProps = {
  className?: string
  disabled?: boolean
  label?: string
  options: Array<Option>
  placeholder?: string
} & ComponentPropsWithoutRef<typeof RadixSelect.Root>

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ className, defaultValue, disabled, label, options, placeholder, required, ...props }, ref) => {
    return (
      <Label className={`${s.label} ${className}`}>
        {label}
        <RadixSelect.Root defaultValue={defaultValue} required={required} {...props}>
          <RadixSelect.Trigger
            aria-label={label}
            className={s.selectTrigger}
            disabled={disabled}
            ref={ref}
          >
            <RadixSelect.Value placeholder={placeholder} />
            <RadixSelect.Icon className={`${s.selectIcon} ${disabled && s.disabled}`}>
              <ChevronDownIcon />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>
          <RadixSelect.Portal>
            <RadixSelect.Content className={s.selectContent} position={'popper'}>
              <RadixSelect.Viewport className={s.selectViewport}>
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
      </Label>
    )
  }
)

export type SelectItemProps = {
  disabled?: boolean
  value: string
} & ComponentPropsWithoutRef<typeof RadixSelect.Item>

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, disabled, value, ...props }, forwardedRef) => {
    return (
      <RadixSelect.Item
        className={`${s.selectItem} ${className} ${disabled && s.disabled}`}
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

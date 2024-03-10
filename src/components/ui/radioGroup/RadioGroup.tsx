import { ElementRef, forwardRef } from 'react'

import * as RadixRadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type Option = {
  label: string
  value: string
}

export type RadioGroupProps = {
  defaultValue?: string
  disabled?: boolean
  name?: string
  onChange: () => void
  options: Option[]
}
export const RadioGroup = forwardRef<ElementRef<typeof RadixRadioGroup.Root>, RadioGroupProps>(
  ({ defaultValue, disabled, name, onChange, options }, ref) => {
    return (
      <>
        <RadixRadioGroup.Root
          aria-label={'View density'}
          className={s.radioGroupRoot}
          defaultValue={defaultValue}
          disabled={disabled}
          name={name}
          onValueChange={onChange}
          ref={ref}
        >
          {options.map(option => {
            return (
              <div key={option.value} style={{ alignItems: 'center', display: 'flex' }}>
                <RadixRadioGroup.Item
                  className={s.radioGroupItem}
                  id={option.value}
                  value={option.value}
                >
                  <RadixRadioGroup.Indicator
                    className={`${s.radioGroupIndicator} ${disabled && s.disabledIndicator}`}
                  />
                </RadixRadioGroup.Item>
                <label
                  className={`${s.label} ${disabled && s.disabledLabel}`}
                  htmlFor={option.value}
                >
                  {option.label}
                </label>
              </div>
            )
          })}
        </RadixRadioGroup.Root>
      </>
    )
  }
)

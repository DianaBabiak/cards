import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/components/ui/radioGroup'

export type ControlledRadioGroupProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<RadioGroupProps, 'id' | 'onBlur' | 'onChange' | 'onValueChange' | 'value'>

export const ControlledRadioGroup = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...radioGroupProps
}: ControlledRadioGroupProps<T>) => {
  const {
    field: { onBlur, onChange, ref, value },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <RadioGroup
      {...{
        id: name,
        onBlur,
        onChange,
        ref,
        value,
        ...radioGroupProps,
      }}
    />
  )
}

import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, Props as CheckboxProps } from '@/components/ui/checkBox'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'checked' | 'onBlur' | 'onChange' | 'onCheckedChange' | 'value'>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  disabled,
  name,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field: { onBlur, onChange, ref, value },
  } = useController({
    control,
    disabled,
    name,
    shouldUnregister,
  })

  return (
    <Checkbox
      checked={value}
      disabled={disabled}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      ref={ref}
      {...rest}
    />
  )
}

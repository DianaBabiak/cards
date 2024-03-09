import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkBox.module.scss'

type Props = {
  checked: boolean
  className?: string
  disabled?: boolean
  id?: string
  label?: string
  onChange: (checked: boolean) => void
}
export const Checkbox = ({ checked, className, disabled, id, label, onChange }: Props) => {
  const classNames = `${s.checkboxContainer} ${className}`

  return (
    <div className={classNames}>
      <RadixCheckbox.Root
        checked={checked}
        className={s.checkBox}
        disabled={disabled}
        id={id}
        onCheckedChange={onChange}
      >
        <RadixCheckbox.Indicator className={s.checkboxIndicator}>
          <CheckIcon />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <label className={s.label} htmlFor={'c1'}>
          {label}
        </label>
      )}
    </div>
  )
}

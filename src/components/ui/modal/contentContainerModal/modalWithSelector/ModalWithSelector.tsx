import { Checkbox } from '@/components/ui/checkBox'
import { Option, Select } from '@/components/ui/select'
import { TextField } from '@/components/ui/textField'

import s from '@/components/ui/modal/modal.module.scss'

export type ModalWithSelectorProps = {
  labelCheckBox?: string
  labelSelector?: string
  labelTextFields?: string[]
  selectOptions?: Option[]
  selectPlaceholder?: string
}
export const ModalWithSelector = ({
  labelCheckBox,
  labelSelector,
  labelTextFields,
  selectOptions,
  selectPlaceholder,
}: ModalWithSelectorProps) => {
  return (
    <>
      {selectOptions && (
        <Select
          className={s.hundredPercentWidth}
          label={labelSelector}
          options={selectOptions}
          placeholder={selectPlaceholder}
        />
      )}
      <TextField className={s.hundredPercentWidth} label={labelTextFields?.[0]} />
      <TextField className={s.hundredPercentWidth} label={labelTextFields?.[1]} />
      <div className={s.wrapperCheckbox}>
        <Checkbox label={labelCheckBox} />
      </div>
    </>
  )
}

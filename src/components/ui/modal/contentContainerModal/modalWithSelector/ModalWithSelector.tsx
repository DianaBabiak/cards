import { Checkbox } from '@/components/ui/checkBox'
import { Option, Select } from '@/components/ui/select'
import { TextField } from '@/components/ui/textField'

import s from '@/components/ui/modal/modal.module.scss'

export type ModalWithSelectorProps = {
  labelCheckBox?: string
  labelSelector?: string
  labelTextFields?: string[]
  selectOptions?: Option[]
}
export const ModalWithSelector = ({
  labelCheckBox,
  labelSelector,
  labelTextFields,
  selectOptions,
}: ModalWithSelectorProps) => {
  return (
    <>
      {selectOptions && <Select label={labelSelector} options={selectOptions} width={'100%'} />}
      <TextField className={s.hundredPercentWidth} label={labelTextFields?.[0]} />
      <TextField className={s.hundredPercentWidth} label={labelTextFields?.[1]} />
      <div className={s.wrapperCheckbox}>
        <Checkbox label={labelCheckBox} />
      </div>
    </>
  )
}

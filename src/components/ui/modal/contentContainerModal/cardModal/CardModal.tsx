import { Checkbox } from '@/components/ui/checkBox'
import { ItemCardModal } from '@/components/ui/modal/contentContainerModal/cardModal/itemCardModal/ItemCardModal'
import { TextField } from '@/components/ui/textField'

import s from '@/components/ui/modal/modal.module.scss'

export type CardModalProps = {
  labelCheckBox?: string
  labelTextField?: string
  placeholderTextFields?: string[]
}
export const CardModal = ({
  labelCheckBox,
  labelTextField,
  placeholderTextFields,
}: CardModalProps) => {
  return (
    <>
      <ItemCardModal label={'Question'} placeholder={placeholderTextFields?.[0]} />
      <ItemCardModal label={'Answer'} placeholder={placeholderTextFields?.[1]} />
      <TextField
        className={s.hundredPercentWidth}
        label={labelTextField}
        placeholder={placeholderTextFields?.[2]}
      />
      <div className={s.wrapperCheckbox}>
        <Checkbox label={labelCheckBox} />
      </div>
    </>
  )
}

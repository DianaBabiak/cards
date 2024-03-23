import { Checkbox } from '@/components/ui/checkBox'
import { ItemAddModal } from '@/components/ui/modal/contentContainerModal/itemAddModal/ItemAddModal'

import s from '@/components/ui/modal/modal.module.scss'

export type DeckModalProps = {
  labelCheckBox?: string
  labelTextField?: string[]
  placeholderTextFields?: string[]
}
export const DeckModal = ({
  labelCheckBox,
  labelTextField,
  placeholderTextFields,
}: DeckModalProps) => {
  return (
    <>
      <ItemAddModal label={labelTextField?.[0]} placeholder={placeholderTextFields?.[0]} />
      <div className={s.wrapperCheckbox}>
        <Checkbox label={labelCheckBox} />
      </div>
    </>
  )
}

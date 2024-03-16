import { Checkbox } from '@/components/ui/checkBox'
import { ItemCardModal } from '@/components/ui/modal/contentContainerModal/cardModal/itemCardModal/ItemCardModal'

import s from '@/components/ui/modal/modal.module.scss'

export type CardModalProps = {
  labelCheckBox?: string
}
export const CardModal = ({ labelCheckBox }: CardModalProps) => {
  return (
    <>
      <ItemCardModal label={'Question'} />
      <ItemCardModal label={'Answer'} />
      <div className={s.wrapperCheckbox}>
        <Checkbox label={labelCheckBox} />
      </div>
    </>
  )
}

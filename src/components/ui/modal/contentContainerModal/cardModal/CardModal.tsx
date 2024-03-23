import { Checkbox } from '@/components/ui/checkBox'
import { ItemAddModal } from '@/components/ui/modal/contentContainerModal/itemAddModal/ItemAddModal'

import s from '@/components/ui/modal/modal.module.scss'

export type CardModalProps = {
  defaultImage?: string
  labelCheckBox?: string
  placeholderTextFields?: string[]
}
export const CardModal = ({
  defaultImage,
  labelCheckBox,
  placeholderTextFields,
}: CardModalProps) => {
  return (
    <>
      <ItemAddModal
        defaultImage={defaultImage}
        label={'Question?'}
        placeholder={placeholderTextFields?.[0]}
        title={'Question'}
      />
      <ItemAddModal
        defaultImage={defaultImage}
        label={'Question?'}
        placeholder={placeholderTextFields?.[1]}
        title={'Answer'}
      />
      <div className={s.wrapperCheckbox}>
        <Checkbox label={labelCheckBox} />
      </div>
    </>
  )
}

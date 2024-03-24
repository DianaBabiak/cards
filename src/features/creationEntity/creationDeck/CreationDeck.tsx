import { Checkbox } from '@/components/ui/checkBox'
import { Modal } from '@/components/ui/modal'
import { VariantModalContent } from '@/components/ui/modal/contentContainerModal/ContentContainerModal'
import { CreationItem } from '@/features/creationEntity/creationItem/CreationItem'

import s from '../creationEntity.module.scss'

export type CreationDeckProps = {}
export const CreationDeck = ({}: CreationDeckProps) => {
  return (
    <Modal
      headerTitle={'Add New Deck'}
      labelFooterPrimaryButton={'Add New Pack'}
      labelFooterSecondaryButton={'Cancel'}
      variant={VariantModalContent.withChildren}
    >
      <CreationItem label={'Name Pack'} placeholder={'Name'} />
      <div className={s.wrapperCheckbox}>
        <Checkbox label={'Private pack'} />
      </div>
    </Modal>
  )
}

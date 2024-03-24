import { Modal } from '@/components/ui/modal'
import { VariantModalContent } from '@/components/ui/modal/contentContainerModal/ContentContainerModal'
import { CreationItem } from '@/features/creationEntity/creationItem/CreationItem'

export type CreationCardProps = {
  defaultImage?: string
}
export const CreationCard = ({ defaultImage }: CreationCardProps) => {
  return (
    <Modal
      headerTitle={'Add New Card'}
      labelFooterPrimaryButton={'Add New Card'}
      labelFooterSecondaryButton={'Cancel'}
      variant={VariantModalContent.withChildren}
    >
      <CreationItem
        defaultImage={defaultImage}
        label={'Question?'}
        placeholder={'Name'}
        title={'Question'}
      />
      <CreationItem
        defaultImage={defaultImage}
        label={'Question?'}
        placeholder={'Name'}
        title={'Answer'}
      />
    </Modal>
  )
}

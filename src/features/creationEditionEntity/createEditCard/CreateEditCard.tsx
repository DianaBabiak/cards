import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Modal } from '@/components/ui/modal'
import { VariantModalContent } from '@/components/ui/modal/contentContainerModal/ContentContainerModal'
import { CreationCardFormValues } from '@/features/creationEditionEntity/create/creationCard'
import { Item } from '@/features/creationEditionEntity/createEditCard/item'
import { DevTool } from '@hookform/devtools'

interface CreateEditCardProps {
  answerError?: string
  answerUrlImage?: string
  control: Control<any>
  isOpen: boolean
  onClickPrimaryButton: () => void
  questionError?: string
  questionUrlImage?: string
  register: UseFormRegister<any>
  setIsOpen: (isOpen: boolean) => void
  setValue: UseFormSetValue<any>
  variant: 'add' | 'update'
}

export const CreateEditCard = ({
  answerError,
  answerUrlImage,
  control,
  isOpen,
  onClickPrimaryButton,
  questionError,
  questionUrlImage,
  register,
  setIsOpen,
  setValue,
  variant,
}: CreateEditCardProps) => {
  return (
    <>
      <DevTool control={control} />
      <Modal
        headerTitle={variant === 'add' ? 'Add New Card' : 'Edit Card'}
        isOpen={isOpen}
        labelFooterPrimaryButton={variant === 'add' ? 'Add New Card' : 'Edit Card'}
        labelFooterSecondaryButton={'Cancel'}
        onClickPrimaryButton={onClickPrimaryButton}
        onClickSecondaryButton={() => {}}
        setIsOpen={setIsOpen}
        variant={VariantModalContent.withChildren}
      >
        <Item<CreationCardFormValues>
          control={control}
          defaultImage={questionUrlImage}
          error={questionError}
          label={'Question?'}
          nameImg={'questionImage'}
          nameTextField={'questionName'}
          placeholder={'Name'}
          register={register}
          setValue={setValue}
          title={'Question'}
        />
        <Item<CreationCardFormValues>
          control={control}
          defaultImage={answerUrlImage}
          error={answerError}
          label={'Question?'}
          nameImg={'answerImage'}
          nameTextField={'answerName'}
          placeholder={'Name'}
          register={register}
          setValue={setValue}
          title={'Answer'}
        />
      </Modal>
    </>
  )
}

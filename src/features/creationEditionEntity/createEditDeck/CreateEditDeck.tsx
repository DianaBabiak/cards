import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox'
import { Modal } from '@/components/ui/modal'
import { VariantModalContent } from '@/components/ui/modal/contentContainerModal/ContentContainerModal'
import { CreationDeckFormValues } from '@/features/creationEditionEntity/create/creationDeck'
import { Item } from '@/features/creationEditionEntity/createEditCard/item'
import { DevTool } from '@hookform/devtools'

import s from '@/features/creationEditionEntity/creationEditionEntity.module.scss'

interface CreateEditDeckProps {
  control: Control<any>
  errors?: string
  isOpen: boolean
  onClickPrimaryButton: () => void
  register: UseFormRegister<any>
  setIsOpen: (isOpen: boolean) => void
  setValue: UseFormSetValue<any>
  urlImage?: string
  variant: 'add' | 'update'
}

export const CreateEditDeck = ({
  control,
  errors,
  isOpen,
  onClickPrimaryButton,
  register,
  setIsOpen,
  setValue,
  urlImage,
  variant,
}: CreateEditDeckProps) => {
  return (
    <>
      <DevTool control={control} />
      <Modal
        headerTitle={variant === 'add' ? 'Add New Deck' : 'Edit Deck'}
        isOpen={isOpen}
        labelFooterPrimaryButton={variant === 'add' ? 'Add New Pack' : 'Edit Pack'}
        labelFooterSecondaryButton={'Cancel'}
        onClickPrimaryButton={onClickPrimaryButton}
        onClickSecondaryButton={() => {}}
        setIsOpen={setIsOpen}
        variant={VariantModalContent.withChildren}
      >
        <Item<CreationDeckFormValues>
          control={control}
          defaultImage={urlImage}
          error={errors}
          label={'Name Pack'}
          nameImg={'image'}
          nameTextField={'name'}
          placeholder={'Name'}
          register={register}
          setValue={setValue}
        />
        <div className={s.wrapperCheckbox}>
          <ControlledCheckbox control={control} label={'Private pack'} name={'private'} />
        </div>
      </Modal>
    </>
  )
}

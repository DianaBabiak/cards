import { useForm } from 'react-hook-form'

import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox'
import { Modal } from '@/components/ui/modal'
import { VariantModalContent } from '@/components/ui/modal/contentContainerModal/ContentContainerModal'
import { CreationItem } from '@/features/creationEntity/creationItem/CreationItem'
import { useCreateDeckMutation } from '@/features/decksList/api'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from '../creationEntity.module.scss'

export type CreationDeckProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const CreationDeckFormSchema = z.object({
  image: z.any().optional(),
  name: z.string().min(3),
  private: z.boolean().default(false),
})

export type CreationDeckFormValues = z.infer<typeof CreationDeckFormSchema>
export const CreationDeck = ({ isOpen, setIsOpen }: CreationDeckProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreationDeckFormValues>({
    resolver: zodResolver(CreationDeckFormSchema),
  })
  const [createDeckMutation, { isError }] = useCreateDeckMutation()
  const onSubmit = async (dataFormValues: CreationDeckFormValues) => {
    try {
      await createDeckMutation({
        cover: dataFormValues.image,
        isPrivate: dataFormValues.private,
        name: dataFormValues.name,
      })
      if (!isError) {
        reset({ image: null, name: '', private: false })
        setIsOpen(false)
      }
    } catch (err) {
      console.error('Ошибка при создании дека:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <Modal
        headerTitle={'Add New Deck'}
        isOpen={isOpen}
        labelFooterPrimaryButton={'Add New Pack'}
        labelFooterSecondaryButton={'Cancel'}
        onClickPrimaryButton={handleSubmit(onSubmit)}
        onClickSecondaryButton={() => {}}
        setIsOpen={setIsOpen}
        variant={VariantModalContent.withChildren}
      >
        <CreationItem<CreationDeckFormValues>
          control={control}
          error={errors.name?.message}
          label={'Name Pack'}
          nameImg={'image'}
          nameTextField={'name'}
          placeholder={'Name'}
          register={register}
        />
        <div className={s.wrapperCheckbox}>
          <ControlledCheckbox control={control} label={'Private pack'} name={'private'} />
        </div>
      </Modal>
    </form>
  )
}

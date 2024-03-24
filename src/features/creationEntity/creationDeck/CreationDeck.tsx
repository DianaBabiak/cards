import { useForm } from 'react-hook-form'

import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox'
import { Modal } from '@/components/ui/modal'
import { VariantModalContent } from '@/components/ui/modal/contentContainerModal/ContentContainerModal'
import { CreationItem } from '@/features/creationEntity/creationItem/CreationItem'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from '../creationEntity.module.scss'

export type CreationDeckProps = {}

const CreationDeckFormSchema = z.object({
  image: z.any().optional(),
  name: z.string(),
  private: z.boolean().default(false),
})

export type CreationDeckFormValues = z.infer<typeof CreationDeckFormSchema>
export const CreationDeck = ({}: CreationDeckProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreationDeckFormValues>({
    resolver: zodResolver(CreationDeckFormSchema),
  })

  const onSubmit = (data: CreationDeckFormValues) => {
    console.log(data, 'jjjjjj')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <Modal
        headerTitle={'Add New Deck'}
        labelFooterPrimaryButton={'Add New Pack'}
        labelFooterSecondaryButton={'Cancel'}
        onClickPrimaryButton={handleSubmit(onSubmit)}
        onClickSecondaryButton={() => {}}
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

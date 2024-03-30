import { useForm } from 'react-hook-form'

import { Modal } from '@/components/ui/modal'
import { VariantModalContent } from '@/components/ui/modal/contentContainerModal/ContentContainerModal'
import { CreationItem } from '@/features/creationEntity/creationItem/CreationItem'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export type CreationCardProps = {
  defaultImage?: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const CreationCardFormSchema = z.object({
  answerImage: z.any().optional(),
  answerName: z.string(),
  questionImage: z.any().optional(),
  questionName: z.string(),
})

export type CreationCardFormValues = z.infer<typeof CreationCardFormSchema>
export const CreationCard = ({ defaultImage, isOpen, setIsOpen }: CreationCardProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreationCardFormValues>({
    resolver: zodResolver(CreationCardFormSchema),
  })
  const onSubmit = (data: CreationCardFormValues) => {
    console.log(data, 'jjjjjj')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <Modal
        headerTitle={'Add New Card'}
        isOpen={isOpen}
        labelFooterPrimaryButton={'Add New Card'}
        labelFooterSecondaryButton={'Cancel'}
        onClickPrimaryButton={handleSubmit(onSubmit)}
        onClickSecondaryButton={() => {}}
        setIsOpen={setIsOpen}
        variant={VariantModalContent.withChildren}
      >
        <CreationItem<CreationCardFormValues>
          control={control}
          defaultImage={defaultImage}
          error={errors.questionName?.message}
          label={'Question?'}
          nameImg={'questionImage'}
          nameTextField={'questionName'}
          placeholder={'Name'}
          register={register}
          title={'Question'}
        />
        <CreationItem<CreationCardFormValues>
          control={control}
          defaultImage={defaultImage}
          error={errors.answerName?.message}
          label={'Question?'}
          nameImg={'answerImage'}
          nameTextField={'answerName'}
          placeholder={'Name'}
          register={register}
          title={'Answer'}
        />
      </Modal>
    </form>
  )
}

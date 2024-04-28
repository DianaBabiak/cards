import { useForm } from 'react-hook-form'

import { useAppDispatch } from '@/common/hooks/hooks'
import { useCreateCardMutation } from '@/features/cards/api'
import { CreateEditCard } from '@/features/creationEditionEntity/createEditCard/CreateEditCard'
import { handleServerNetworkError } from '@/utils/handleServerNetworkError'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export type CreationCardProps = {
  id?: string
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
export const CreationCard = ({ id, isOpen, setIsOpen }: CreationCardProps) => {
  const dispatch = useAppDispatch()

  const [createCardMutation, { isError }] = useCreateCardMutation()
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<CreationCardFormValues>({
    resolver: zodResolver(CreationCardFormSchema),
  })
  const onSubmit = async (dataFormValues: CreationCardFormValues) => {
    try {
      await createCardMutation({
        answer: dataFormValues.answerName,
        answerImg: dataFormValues.answerImage ? dataFormValues.answerImage : null,
        id,
        question: dataFormValues.questionName,
        questionImg: dataFormValues.questionImage ? dataFormValues.questionImage : null,
      })
      if (!isError) {
        reset({ answerImage: null, answerName: '', questionImage: null, questionName: '' })
        setIsOpen(false)
      }
    } catch (err) {
      handleServerNetworkError(dispatch, err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CreateEditCard
        answerError={errors.answerName?.message}
        control={control}
        isOpen={isOpen}
        onClickPrimaryButton={handleSubmit(onSubmit)}
        questionError={errors.questionName?.message}
        register={register}
        setIsOpen={setIsOpen}
        setValue={setValue}
        variant={'add'}
      />
    </form>
  )
}

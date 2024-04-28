import { useForm } from 'react-hook-form'

import { useAppDispatch } from '@/common/hooks/hooks'
import { useGetCardByIdQuery, useUpdateCardMutation } from '@/features/cards/api'
import { CreateEditCard } from '@/features/creationEditionEntity/createEditCard/CreateEditCard'
import { handleServerNetworkError } from '@/utils/handleServerNetworkError'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export type UpdateCardProps = {
  idCard: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const UpdateCardFormSchema = z.object({
  answerImage: z.any().optional(),
  answerName: z.string(),
  questionImage: z.any().optional(),
  questionName: z.string(),
})

export type UpdateCardFormValues = z.infer<typeof UpdateCardFormSchema>
export const UpdateCard = ({ idCard, isOpen, setIsOpen }: UpdateCardProps) => {
  const dispatch = useAppDispatch()

  const { data } = useGetCardByIdQuery({
    id: idCard,
  })
  const [updateCardMutation, { isError }] = useUpdateCardMutation()
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<UpdateCardFormValues>({
    resolver: zodResolver(UpdateCardFormSchema),
    values: {
      answerName: data?.answer || '',
      questionName: data?.question || '',
    },
  })
  const onSubmit = async (dataFormValues: UpdateCardFormValues) => {
    try {
      await updateCardMutation({
        answer: dataFormValues.answerName,
        answerImg: dataFormValues.answerImage ? dataFormValues.answerImage : null,
        id: idCard,
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
        answerUrlImage={data?.answerImg}
        control={control}
        isOpen={isOpen}
        onClickPrimaryButton={handleSubmit(onSubmit)}
        questionError={errors.questionName?.message}
        questionUrlImage={data?.questionImg}
        register={register}
        setIsOpen={setIsOpen}
        setValue={setValue}
        variant={'update'}
      />
    </form>
  )
}

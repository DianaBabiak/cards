import { useForm } from 'react-hook-form'

import { useAppDispatch } from '@/common/hooks/hooks'
import { CreateEditDeck } from '@/features/creationEditionEntity/createEditDeck/CreateEditDeck'
import { useCreateDeckMutation } from '@/features/decksList/api'
import { handleServerNetworkError } from '@/utils/handleServerNetworkError'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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
  const dispatch = useAppDispatch()

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
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
      handleServerNetworkError(dispatch, err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CreateEditDeck
        control={control}
        errors={errors.name?.message}
        isOpen={isOpen}
        onClickPrimaryButton={handleSubmit(onSubmit)}
        register={register}
        setIsOpen={setIsOpen}
        setValue={setValue}
        variant={'add'}
      />
    </form>
  )
}

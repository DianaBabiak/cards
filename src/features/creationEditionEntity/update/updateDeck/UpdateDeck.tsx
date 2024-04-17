import { useForm } from 'react-hook-form'

import { CreateEditDeck } from '@/features/creationEditionEntity/createEditDeck/CreateEditDeck'
import { useGetDeckByIdQuery, useUpdateDeckMutation } from '@/features/decksList/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export type UpdateDeckProps = {
  idDeck: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const UpdateDeckFormSchema = z.object({
  image: z.any().optional(),
  name: z.string().min(3),
  private: z.boolean().default(false),
})

export type UpdateDeckFormValues = z.infer<typeof UpdateDeckFormSchema>
export const UpdateDeck = ({ idDeck, isOpen, setIsOpen }: UpdateDeckProps) => {
  const { data } = useGetDeckByIdQuery({
    id: idDeck,
  })
  const [updateDeckMutation, { isError }] = useUpdateDeckMutation()
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<UpdateDeckFormValues>({
    resolver: zodResolver(UpdateDeckFormSchema),
    values: {
      name: data?.name || '',
      private: data?.isPrivate || false,
    },
  })
  const onSubmit = async (dataFormValues: UpdateDeckFormValues) => {
    try {
      await updateDeckMutation({
        cover: dataFormValues.image ? dataFormValues.image : null,
        id: idDeck,
        isPrivate: dataFormValues.private,
        name: dataFormValues.name,
      })
      if (!isError) {
        reset({ image: null, name: '', private: false })
        setIsOpen(false)
      }
    } catch (err) {
      console.error('Ошибка при редактировании deck:', err)
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
        urlImage={data?.cover}
        variant={'update'}
      />
    </form>
  )
}

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { IsCompletedPart } from '@/components/auth/editable-form/isCompletedPart'
import { IsEditablePart } from '@/components/auth/editable-form/isEditabledPart'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useMeQuery, useUpdateUserDataMutation } from '@/features/auth/api/auth-api'
import { LinkBackHome } from '@/features/cards/ui/linkBackHome/LinkBackHome'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './editable-form.module.scss'

const loginSchema = z.object({
  avatar: z.any().optional(),
  nickname: z.string().min(1).max(50).optional(),
})

export type FormValues = z.infer<typeof loginSchema>

export const EditableForm = () => {
  const [isEditable, setIsEditable] = useState(false)
  const { data: meData, refetch } = useMeQuery()
  const [updateUserData, { isError }] = useUpdateUserDataMutation()
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: FormValues) => {
    try {
      await updateUserData({
        avatar: data.avatar,
        name: data.nickname,
      })
      await refetch()
      if (!isError) {
        setIsEditable(false)
      }
    } catch (err) {
      console.error('Ошибка при изменении данных:', err)
    }
  }

  const email = meData?.email || ''

  const containerStyle = clsx(isEditable ? s.isEditableContainer : '', s.container)

  return (
    <div className={s.wrapper}>
      <LinkBackHome />
      <Card className={containerStyle}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography as={'h1'} className={s.formTitle} variant={'h1'}>
            Personal Information
          </Typography>

          {isEditable ? (
            <IsEditablePart
              avatar={meData?.avatar}
              control={control}
              currentName={meData?.name || ''}
              errorMessage={errors.nickname?.message}
              updatedUserDataHandler={handleSubmit(onSubmit)}
            />
          ) : (
            <IsCompletedPart
              avatar={meData?.avatar}
              currentName={meData?.name || ''}
              email={email}
              nameImg={'avatar'}
              onChange={handleSubmit(onSubmit)}
              register={register}
              setIsEditable={setIsEditable}
              setValue={setValue}
            />
          )}
        </form>
      </Card>
    </div>
  )
}

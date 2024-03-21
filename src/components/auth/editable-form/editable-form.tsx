import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { IsCompletedPart } from '@/components/auth/editable-form/isCompletedPart'
import { IsEditablePart } from '@/components/auth/editable-form/isEditabledPart'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './editable-form.module.scss'

const loginSchema = z.object({
  nickname: z.string().min(1).max(50),
})

export type FormValues = z.infer<typeof loginSchema>

type EditableFormProps = {
  profileName?: string
}

export const EditableForm = ({ profileName }: EditableFormProps) => {
  const [isEditable, setIsEditable] = useState(false)
  const [currentName, setCurrentName] = useState(profileName || 'Edit Name')

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = (data: FormValues) => {
    console.log(data)
    setCurrentName(data.nickname)
    setIsEditable(false)
  }

  const email = 'j&johnson@gmail.com'

  const containerStyle = clsx(isEditable ? s.isEditableContainer : '', s.container)

  return (
    <Card className={containerStyle}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography as={'h1'} className={s.formTitle} variant={'h1'}>
          Personal Information
        </Typography>

        {isEditable ? (
          <IsEditablePart
            control={control}
            currentName={currentName}
            errorMessage={errors.nickname?.message}
          />
        ) : (
          <IsCompletedPart currentName={currentName} email={email} setIsEditable={setIsEditable} />
        )}
      </form>
    </Card>
  )
}

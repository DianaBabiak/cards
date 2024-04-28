import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/common/hooks/hooks'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-textField/controlled-textField'
import { PreLoader } from '@/components/ui/preLoader'
import { Typography } from '@/components/ui/typography'
import { useResetPasswordMutation } from '@/features/auth/api/auth-api'
import { handleServerNetworkError } from '@/utils/handleServerNetworkError'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './createNewPassword-form.module.scss'

const loginSchema = z.object({
  password: z.string().min(3),
})

export type FormValues = z.infer<typeof loginSchema>

export const CreateNewPasswordForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) })

  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const { token } = useParams()

  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const onSubmit = async (data: FormValues) => {
    try {
      await resetPassword({ token, ...data }).unwrap()
      navigate('/login')
    } catch (error: unknown) {
      handleServerNetworkError(dispatch, error)
    }
  }

  if (isLoading) {
    return <PreLoader />
  }

  return (
    <Card className={s.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography as={'h1'} className={s.formTitle} variant={'h1'}>
          Create new password
        </Typography>

        <ControlledTextField
          className={s.formInput}
          control={control}
          errorMessage={errors.password?.message}
          inputType={'password'}
          label={'Password'}
          name={'password'}
          type={'password'}
        />

        <Typography as={'p'} className={s.formDescription} colorBalance={900} variant={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>

        <Button isFullWidth type={'submit'}>
          <Typography variant={'subtitle2'}>Create New Password</Typography>
        </Button>
      </form>
    </Card>
  )
}

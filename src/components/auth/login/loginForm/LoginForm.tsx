import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { useAppDispatch } from '@/common/hooks/hooks'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox'
import { ControlledTextField } from '@/components/ui/controlled/controlled-textField/controlled-textField'
import { Typography } from '@/components/ui/typography'
import { useLoginMutation } from '@/features/auth/api/auth-api'
import { handleServerNetworkError } from '@/utils/handleServerNetworkError'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from '../login.module.scss'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof loginSchema>

const initialFormValues = {
  email: '',
  password: '',
  rememberMe: false,
}

export const LoginForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: initialFormValues,
    resolver: zodResolver(loginSchema),
  })

  const dispatch = useAppDispatch()

  const [signIn, {}] = useLoginMutation()

  const onSubmit = async (data: FormValues) => {
    try {
      await signIn(data).unwrap()
    } catch (error) {
      handleServerNetworkError(dispatch, error)
    }
  }

  return (
    <Card className={s.container}>
      <div className={s.containerData}>
        <span>Login: demo@gmail.com</span>
        <span>Password: 1234</span>
      </div>
      <Typography variant={'h1'}>Sign In</Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <ControlledTextField
          className={s.textField}
          control={control}
          errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
        />
        <ControlledTextField
          className={s.textField}
          control={control}
          errorMessage={errors.password?.message}
          inputType={'password'}
          label={'Password'}
          name={'password'}
        />
        <ControlledCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
        <div className={s.containerTypography}>
          <Typography
            as={Link}
            style={{ cursor: 'pointer' }}
            to={'/login/forgot-password'}
            variant={'body2'}
          >
            Forgot Password?
          </Typography>
        </div>
        <Button isFullWidth type={'submit'}>
          Sign In
        </Button>
      </form>
      <Typography variant={'body2'}>Don&apos;t have an account?</Typography>
      <Typography as={Link} className={s.link} to={'/login/registration'} variant={'link1'}>
        Sign Up
      </Typography>
    </Card>
  )
}

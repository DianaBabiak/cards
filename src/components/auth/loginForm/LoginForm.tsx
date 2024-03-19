import { useController, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkBox'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './loginForm.module.scss'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue: false,
    name: 'rememberMe',
  })

  console.log(errors, 'erroremaооооооо')
  console.log(errors.email?.message, 'errorema')
  console.log(errors.password?.message, 'errorpas')

  return (
    <Card className={s.container}>
      <Typography variant={'h1'}>Sign In</Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <input {...register('email')} />
        <input {...register('password')} />
        <Checkbox checked={value} label={'remember me'} onCheckedChange={onChange} />
        <div className={s.containerTypography}>
          <Typography variant={'body2'}>Forgot Password?</Typography>
        </div>
        <Button isFullWidth type={'submit'}>
          Sign In
        </Button>
      </form>

      <Typography variant={'body2'}>Do not have an account?</Typography>
      <a className={s.link}>Sign Up</a>
    </Card>
  )
}

import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-textField/controlled-textField'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgotPassword-form.module.scss'

const loginSchema = z.object({
  email: z.string().email(),
})

type FormValues = z.infer<typeof loginSchema>

export const ForgotPasswordForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Card className={s.container}>
      <Typography variant={'h1'}>Forgot your password?</Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <ControlledTextField
          className={s.textField}
          control={control}
          errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
        />

        <div className={s.containerTypography}>
          <Typography colorBalance={900} variant={'body2'}>
            Enter your email address and we will send you further instructions{' '}
          </Typography>
        </div>
        <Button className={s.button} isFullWidth type={'submit'}>
          Send Instructions
        </Button>
      </form>
      <Typography colorBalance={900} variant={'body2'}>
        Did you remember your password?
      </Typography>
      <a className={s.link}>Try logging in</a>
    </Card>
  )
}

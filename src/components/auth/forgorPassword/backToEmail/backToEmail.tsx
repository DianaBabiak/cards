import icon from '@/assets/Group 281.svg'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './backToEmail.module.scss'

export const BackToEmail = () => {
  const usersEmail = localStorage.getItem('currentEmail')

  return (
    <Card className={s.container}>
      <Typography as={'h1'} className={s.formTitle} variant={'h1'}>
        Check Email
      </Typography>

      <img alt={'icon'} src={icon} />

      <Typography as={'p'} className={s.formDescription} colorBalance={900} variant={'body2'}>
        We’ve sent an Email with instructions to {usersEmail}
      </Typography>

      <Button as={'a'} href={'/login'} isFullWidth>
        <Typography variant={'subtitle2'}>Back to Sign In</Typography>
      </Button>
    </Card>
  )
}

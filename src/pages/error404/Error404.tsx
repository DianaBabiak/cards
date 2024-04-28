import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './error404.module.scss'

import img from '../../assets/404.svg'

export const Error404 = () => {
  return (
    <div className={s.wrapper}>
      <img alt={'error-404'} src={img} />
      <Typography className={s.text} variant={'body2'}>
        Sorry! Page not found!
      </Typography>
      <Button as={'a'} href={'/'}>
        Back to home page
      </Button>
    </div>
  )
}

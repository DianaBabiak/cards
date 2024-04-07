import { Link } from 'react-router-dom'

import { Icon } from '@/components/ui/Icon'
import { Typography } from '@/components/ui/typography'

import s from '../cards.module.scss'

export const LinkBackHome = () => {
  return (
    <Link className={s.link} to={'/'}>
      <Icon height={'16'} iconId={'backArrow'} viewBox={'0 0 16 16'} width={'16'}></Icon>
      <Typography variant={'body2'}>Back to Decks List</Typography>
    </Link>
  )
}

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from '../decks.module.scss'

export const DecksTitleAddDeck = () => {
  return (
    <div className={s.addDeckWrapper}>
      <Typography as={'h1'} variant={'h1'}>
        Decks list
      </Typography>
      <Button>Add New Deck</Button>
    </div>
  )
}

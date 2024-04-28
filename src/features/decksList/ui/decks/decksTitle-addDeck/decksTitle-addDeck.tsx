import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from '../decks.module.scss'

type DecksTitleAddDeckProps = {
  onOpenCreateCardHandler: () => void
}
export const DecksTitleAddDeck = ({ onOpenCreateCardHandler }: DecksTitleAddDeckProps) => {
  return (
    <div className={s.addDeckWrapper}>
      <Typography as={'h1'} variant={'h1'}>
        Decks list
      </Typography>
      <Button onClick={onOpenCreateCardHandler}>Add New Deck</Button>
    </div>
  )
}

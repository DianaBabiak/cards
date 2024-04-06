import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { CreationCard } from '@/features/creationEditionEntity/create/creationCard'

import s from '../cards.module.scss'
type EmptyDeckProps = {
  id?: string
}
export const EmptyDeck = ({ id }: EmptyDeckProps) => {
  const [isOpenCreateCard, setIsOpenCreateCard] = useState(false)
  const onOpenCreateCardHandler = () => {
    setIsOpenCreateCard(true)
  }

  return (
    <div className={s.wrapperEmptyContent}>
      <Typography colorTheme={'dark'}>
        This pack is empty. Click add new card to fill this pack
      </Typography>
      <Button onClick={onOpenCreateCardHandler}>Add New Card</Button>
      <CreationCard id={id} isOpen={isOpenCreateCard} setIsOpen={setIsOpenCreateCard} />
    </div>
  )
}

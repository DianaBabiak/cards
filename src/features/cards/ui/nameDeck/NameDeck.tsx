import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/button'
import { DropDownMenu, DropdownItem } from '@/components/ui/dropDownMenu'
import { Modal } from '@/components/ui/modal'
import { VariantModalContent } from '@/components/ui/modal/contentContainerModal/ContentContainerModal'
import { Typography } from '@/components/ui/typography'
import { useDeleteDeckMutation } from '@/features/decksList/api'

import s from '../cards.module.scss'

type NameDeckProps = {
  deckId: string
  deckName?: string
  isOwner: boolean
  onOpenCreateCardHandler: () => void
}
export const NameDeck = ({ deckId, deckName, isOwner, onOpenCreateCardHandler }: NameDeckProps) => {
  const [isOpenDeleteDeck, setIsOpenDeleteDeck] = useState(false)
  const [currentIdDeck, setCurrentIdDeck] = useState('')
  const [deleteDeck, {}] = useDeleteDeckMutation()
  const onOpenDeleteDeckModalHandler = () => {
    setIsOpenDeleteDeck(true)
    setCurrentIdDeck(deckId)
  }
  const onDeleteDeckHandler = async () => {
    try {
      await deleteDeck({
        id: currentIdDeck,
      })
    } catch (err) {
      console.error('Ошибка при удалении дека:', err)
    }
  }

  return (
    <div className={s.titleContainer}>
      <div className={s.containerDropDownMenu}>
        <Typography variant={'h1'}>{deckName}</Typography>
        {isOwner && (
          <DropDownMenu
            trigger={
              <button className={s.buttonDropDownMenu}>
                <Icon
                  height={'24px'}
                  iconId={'moreVerticalOutline'}
                  viewBox={'0 0 24 24 '}
                  width={'24px'}
                />
              </button>
            }
          >
            <Link className={s.learn} to={`/learn/${deckId}`}>
              <DropdownItem>
                <Icon height={'16px'} iconId={'playCircle'} viewBox={'0 0 16 16 '} width={'16px'} />
                Learn
              </DropdownItem>
            </Link>
            <DropdownItem>
              <Icon height={'16px'} iconId={'edit2'} viewBox={'0 0 16 16 '} width={'16px'} />
              Edit
            </DropdownItem>
            <DropdownItem onClick={onOpenDeleteDeckModalHandler}>
              <Icon height={'16px'} iconId={'trash'} viewBox={'0 0 16 16 '} width={'16px'} />
              Delete
            </DropdownItem>
          </DropDownMenu>
        )}
        <Modal
          contentText={'Do you really want to remove Deck? All cards will be deleted.'}
          headerTitle={'Delete Deck'}
          isOpen={isOpenDeleteDeck}
          labelFooterPrimaryButton={'Delete Card'}
          labelFooterSecondaryButton={'Cansel'}
          onClickPrimaryButton={onDeleteDeckHandler}
          setIsOpen={setIsOpenDeleteDeck}
          variant={VariantModalContent.text}
        />
      </div>
      {isOwner ? (
        <Button onClick={onOpenCreateCardHandler}>Add New Card</Button>
      ) : (
        <Link to={`/learn/${deckId}`}>
          <Button>Learn to Pack</Button>
        </Link>
      )}
    </div>
  )
}

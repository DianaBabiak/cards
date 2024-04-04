import { Button } from '@/components/ui/button'
import { DropDownMenu, DropdownItem } from '@/components/ui/dropDownMenu'
import { Icon } from '@/components/ui/icon'
import { Typography } from '@/components/ui/typography'

import s from '@/features/deck/deck.module.scss'

type NameDeckProps = {
  deckName?: string
  onOpenCreateCardHandler: () => void
}
export const NameDeck = ({ deckName, onOpenCreateCardHandler }: NameDeckProps) => {
  return (
    <div className={s.titleContainer}>
      <div className={s.containerDropDownMenu}>
        <Typography variant={'h1'}>{deckName}</Typography>
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
          <DropdownItem>
            <Icon height={'16px'} iconId={'playCircle'} viewBox={'0 0 16 16 '} width={'16px'} />
            Learn
          </DropdownItem>
          <DropdownItem>
            <Icon height={'16px'} iconId={'edit2'} viewBox={'0 0 16 16 '} width={'16px'} />
            Edit
          </DropdownItem>
          <DropdownItem>
            <Icon height={'16px'} iconId={'trash'} viewBox={'0 0 16 16 '} width={'16px'} />
            Delete
          </DropdownItem>
        </DropDownMenu>
      </div>
      <Button onClick={onOpenCreateCardHandler}>Add New Card</Button>
    </div>
  )
}

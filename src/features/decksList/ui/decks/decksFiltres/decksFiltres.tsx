import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { CustomSlider } from '@/components/ui/slider'
import { CustomTabs } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/textField'
import { useMeQuery } from '@/features/auth/api/auth-api'
import { ResponseGetMinMaxCards } from '@/features/decksList/api'

import s from '@/features/decksList/ui/decks/decks.module.scss'

type DecksFiltresProps = {
  maxCardsCount: number
  minCardsCount: number
  minMaxCards?: ResponseGetMinMaxCards
  onClearFilter: () => void
  onSetSearchNameHandler: (searchName: string) => void
  onSliderValueChange: (minMaxCards: [min: number, max: number]) => void
  onTabsValueChange: (authorId: string) => void
  tabsValue?: string
  valueName: string
}

export const DecksFilters = (props: DecksFiltresProps) => {
  const {
    maxCardsCount,
    minCardsCount,
    minMaxCards,
    onClearFilter,
    onSetSearchNameHandler,
    onSliderValueChange,
    onTabsValueChange,
    tabsValue,
    valueName,
  } = props

  const { data: meData } = useMeQuery()

  const [searchName, setSearchName] = useState(valueName)

  const timerId = useRef<null | number>(null)

  const onClearFilterHandler = () => {
    onClearFilter()
  }

  const onChangeTabsValueHandler = (tabsValue: string) => {
    onTabsValueChange(tabsValue)
  }

  const onSearchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (timerId.current !== null) {
      clearTimeout(timerId.current)
    }

    setSearchName(e.currentTarget.value)
    timerId.current = window.setTimeout(() => {
      onSetSearchNameHandler(e.target.value)
    }, 300)
  }

  useEffect(() => {
    return () => {
      if (timerId.current !== null) {
        clearTimeout(timerId.current)
      }
    }
  }, [])

  useEffect(() => {
    if (valueName !== searchName) {
      setSearchName(valueName)
    }
  }, [valueName])

  return (
    <div className={s.filterDecksWrapper}>
      <TextField
        className={s.searchDecks}
        inputType={'search'}
        onChange={onSearchNameHandler}
        placeholder={'Input search'}
        value={searchName}
      />
      <CustomTabs
        defaultValue={'all-cards'}
        onValueChange={onChangeTabsValueHandler}
        tabs={[
          {
            disabled: false,
            title: 'My Cards',
            value: meData?.id ?? 'myId',
          },
          { disabled: false, title: 'All Cards', value: '' },
        ]}
        tabsName={'Show decks cards'}
        value={tabsValue ?? ''}
      />
      <CustomSlider
        defaultValue={[minCardsCount, maxCardsCount]}
        max={minMaxCards?.max ?? 0}
        min={minMaxCards?.min ?? 0}
        onValueChange={onSliderValueChange}
        sliderName={'Number of cards'}
        value={[minCardsCount, maxCardsCount]}
      />
      <Button buttonImg={'trash'} isImg onClick={onClearFilterHandler} variant={'secondary'}>
        Clear Filter
      </Button>
    </div>
  )
}

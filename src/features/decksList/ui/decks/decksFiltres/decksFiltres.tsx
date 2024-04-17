import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/common/hooks/hooks'
import { Button } from '@/components/ui/button'
import { CustomSlider } from '@/components/ui/slider'
import { CustomTabs } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/textField'
import { useMeQuery } from '@/features/auth/api/auth-api'
import { isClearSelector } from '@/features/decksList/model/decksList/decksSelectors'
import { decksListActions } from '@/features/decksList/model/decksList/decksSlice'

import s from '@/features/decksList/ui/decks/decks.module.scss'

type DecksFiltresProps = {
  maxCardsCount: number
  minCardsCount: number
  onClearFilter: () => void
  onSetSearchNameHandler: (searchName: string) => void
  onSliderValueChange: (minMaxCards: [min: number, max: number]) => void
  onTabsValueChange: (authorId: string) => void
  valueName: string
}

export const DecksFilters = (props: DecksFiltresProps) => {
  const {
    maxCardsCount,
    minCardsCount,
    onClearFilter,
    onSetSearchNameHandler,
    onSliderValueChange,
    onTabsValueChange,
    valueName,
  } = props

  const isClear = useAppSelector(isClearSelector)
  const dispatch = useAppDispatch()

  const { data: meData } = useMeQuery()

  const [currentSliderValue, setCurrentSliderValue] = useState([minCardsCount, maxCardsCount])
  const [searchName, setSearchName] = useState(valueName)
  const [tabsValue, setTabsValue] = useState(() => {
    const savedValues = localStorage.getItem('tabsValue')

    return savedValues ? JSON.parse(savedValues) : 'all-cards'
  })

  const timerId = useRef<null | number>(null)

  const onClearFilterHandler = () => {
    setCurrentSliderValue([minCardsCount, maxCardsCount])
    setSearchName('')
    onClearFilter()
  }

  const onChangeTabsValueHandler = (tabsValue: string) => {
    localStorage.setItem('tabsValue', JSON.stringify(tabsValue))
    setTabsValue(tabsValue)
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
    if (isClear) {
      const timer = setTimeout(() => {
        dispatch(decksListActions.setClearFilters({ isClear: false }))
      }, 0)

      return () => clearTimeout(timer)
    }
  }, [isClear, dispatch])

  useEffect(() => {
    if (tabsValue === 'my-card' && meData) {
      onTabsValueChange(meData.id)
    } else if (tabsValue === 'all-cards') {
      onTabsValueChange('')
    }
  }, [meData, onTabsValueChange, tabsValue])

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
            value: 'my-card',
          },
          { disabled: false, title: 'All Cards', value: 'all-cards' },
        ]}
        tabsName={'Show decks cards'}
        value={tabsValue}
      />
      <CustomSlider
        defaultValue={[minCardsCount, maxCardsCount]}
        max={currentSliderValue[1]}
        min={currentSliderValue[0]}
        onValueChange={onSliderValueChange}
        sliderName={'Number of cards'}
        value={currentSliderValue}
      />
      <Button buttonImg={'trash'} isImg onClick={onClearFilterHandler} variant={'secondary'}>
        Clear Filter
      </Button>
    </div>
  )
}

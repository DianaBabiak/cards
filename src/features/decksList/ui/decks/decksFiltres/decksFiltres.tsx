import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { CustomSlider } from '@/components/ui/slider'
import { CustomTabs } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/textField'

import s from '@/features/decksList/ui/decks/decks.module.scss'

type DecksFiltresProps = {
  maxCardsCount: number
  minCardsCount: number
  onSetSearchNameHandler: (searchName: string) => void
  onSliderValueChange: (minMaxCards: [min: number, max: number]) => void
}

export const DecksFilters = (props: DecksFiltresProps) => {
  const { maxCardsCount, minCardsCount, onSetSearchNameHandler, onSliderValueChange } = props

  const [currentSliderValue, setCurrentSliderValue] = useState([minCardsCount, maxCardsCount])

  const timerId = useRef<null | number>(null)

  const onClearFilterHandler = () => {
    onSetSearchNameHandler('')
    setCurrentSliderValue([minCardsCount, maxCardsCount])
  }

  const onSearchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (timerId.current !== null) {
      clearTimeout(timerId.current)
    }

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

  return (
    <div className={s.filterDecksWrapper}>
      <TextField
        className={s.searchDecks}
        inputType={'search'}
        onChange={onSearchNameHandler}
        placeholder={'Input search'}
      />
      <CustomTabs
        defaultValue={'all-cards'}
        tabs={[
          {
            disabled: false,
            title: 'My Cards',
            value: 'my-card',
          },
          { disabled: false, title: 'All Cards', value: 'all-cards' },
        ]}
        tabsName={'Show decks cards'}
      />
      <CustomSlider
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

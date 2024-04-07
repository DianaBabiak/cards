import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '@/common/hooks/hooks'
import { Pagination } from '@/components/ui/pagination'
import { OrderBy, useGetDecksQuery, useGetMinMaxCardsQuery } from '@/features/decksList/api'
import { decksListActions } from '@/features/decksList/model/decksList/decksSlice'
import { DecksFilters } from '@/features/decksList/ui/decks/decksFiltres/decksFiltres'
import { DecksTable } from '@/features/decksList/ui/decks/decksTable/decksTable'

import s from './decks.module.scss'

import { DecksTitleAddDeck } from './decksTitle-addDeck/decksTitle-addDeck'

export const DecksList = () => {
  const dispatch = useAppDispatch()

  const [decksParams, setDecksParams] = useSearchParams()

  const {
    data: minMaxCards,
    isLoading: isMinMaxLoading,
    isSuccess: isMinMaxSuccess,
  } = useGetMinMaxCardsQuery()

  const {
    data,
    isLoading: isDataLoading,
    isSuccess: isDataSuccess,
  } = useGetDecksQuery({
    currentPage: Number(decksParams.get('page')) || 1,
    itemsPerPage: decksParams.get('items') || '10',
    maxCardsCount: Number(decksParams.get('maxCards')) || minMaxCards?.max,
    minCardsCount: Number(decksParams.get('minCards')) || minMaxCards?.min,
    name: decksParams.get('name') || '',
    orderBy: (decksParams.get('orderBy') as OrderBy) || null,
  })

  const updateSearchParams = (params: { [key: string]: string }) => {
    const newSearchParams = new URLSearchParams(decksParams)

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value)
      } else {
        newSearchParams.delete(key)
      }
    })

    if (!params.page) {
      newSearchParams.set('page', '1')
    }

    setDecksParams(newSearchParams)
  }

  const onChangePageHandler = (page: number) => {
    updateSearchParams({ page: page.toString() })
  }

  const onChangePerPageHandler = (pageItems: string) => {
    updateSearchParams({ items: pageItems })
  }

  const onChangeSortPerDate = (sortData: 'asc' | 'desc') => {
    debugger
    console.log(sortData)
    updateSearchParams({ orderBy: `updated-${sortData}` })
  }

  const onSliderValueChange = ([min, max]: [number, number]) => {
    updateSearchParams({ maxCards: max.toString(), minCards: min.toString() })
  }

  const onSearchNameHandler = (searchName: string) => {
    updateSearchParams({ name: searchName })
  }

  const onClearFiltersHandler = () => {
    updateSearchParams({
      items: '10',
      maxCards: minMaxCards?.max.toString() || '',
      minCards: minMaxCards?.min.toString() || '',
      name: '',
      orderBy: '',
      page: '1',
    })
    dispatch(decksListActions.setClearFilters({ isClear: true }))
  }

  const isSuccess =
    !!data && minMaxCards && minMaxCards.min !== undefined && minMaxCards.max !== undefined

  const isLoading = isDataLoading && isMinMaxLoading

  return isLoading ? (
    <div>Loading</div>
  ) : (
    isSuccess && (
      <div className={s.container}>
        <DecksTitleAddDeck />
        <DecksFilters
          maxCardsCount={minMaxCards?.max}
          minCardsCount={minMaxCards?.min}
          onClearFilter={onClearFiltersHandler}
          onSetSearchNameHandler={onSearchNameHandler}
          onSliderValueChange={onSliderValueChange}
          valueName={decksParams.get('name') || ''}
        />
        <DecksTable data={data} onChangeSortPerData={onChangeSortPerDate} />

        <Pagination
          count={data.pagination.totalPages}
          onChange={onChangePageHandler}
          onPerPageChange={onChangePerPageHandler}
          page={data.pagination.currentPage}
          perPage={data.pagination.itemsPerPage.toString()}
          perPageOptions={['20', '15', '10', '5']}
        />
      </div>
    )
  )
}

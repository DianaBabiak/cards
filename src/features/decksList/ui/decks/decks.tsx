import { useEffect, useState } from 'react'

import { Modal } from '@/components/ui/modal'
import { VariantModalContent } from '@/components/ui/modal/contentContainerModal/ContentContainerModal'
import { Pagination } from '@/components/ui/pagination'
import { CreationDeck } from '@/features/creationEntity/creationDeck'
import {
  OrderBy,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
} from '@/features/decksList/api'
import { DecksFilters } from '@/features/decksList/ui/decks/decksFiltres/decksFiltres'
import { DecksTable } from '@/features/decksList/ui/decks/decksTable/decksTable'

import s from './decks.module.scss'

import { DecksTitleAddDeck } from './decksTitle-addDeck/decksTitle-addDeck'

export const DecksList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState('10')
  const [orderBy, setOrderBy] = useState<OrderBy>(null)
  const [name, setName] = useState('')
  const [isOpenCreateDeck, setIsOpenCreateDeck] = useState(false)
  const [isOpenDeleteDeck, setIsOpenDeleteDeck] = useState(false)
  const [currentIdDeck, setCurrentIdDeck] = useState('')

  const { data: minMaxCards } = useGetMinMaxCardsQuery()

  const [maxCardsCount, setMaxCardsCount] = useState(minMaxCards?.max)
  const [minCardsCount, setMinCardsCount] = useState(minMaxCards?.min)

  const { data } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    maxCardsCount,
    minCardsCount,
    name,
    orderBy,
  })
  const [deleteDeck, {}] = useDeleteDeckMutation()
  const onChangePageHandler = (page: number) => {
    setCurrentPage(page)
  }

  const onChangePerPageHandler = (pageItems: string) => {
    setItemsPerPage(pageItems)
  }

  const onChangeSortPerData = (sortData: 'asc' | 'desc') => {
    setOrderBy(`created-${sortData}`)
  }

  const onSliderValueChange = (minMaxCards: [min: number, max: number]) => {
    setMaxCardsCount(minMaxCards[1])
    setMinCardsCount(minMaxCards[0])
  }

  const onSearchNameHandler = (searchName: string) => {
    setName(searchName)
  }

  const onOpenCreateCardHandler = () => {
    setIsOpenCreateDeck(true)
  }

  const onOpenDeleteDeckModalHandler = (idDeck: string) => {
    setIsOpenDeleteDeck(true)
    setCurrentIdDeck(idDeck)
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

  useEffect(() => {
    setMaxCardsCount(minMaxCards?.max)
    setMinCardsCount(minMaxCards?.min)
  }, [minMaxCards?.min, minMaxCards?.max])

  const isInitialized =
    !!data && minCardsCount !== undefined && maxCardsCount !== undefined && !!minMaxCards

  return (
    isInitialized && (
      <div className={s.container}>
        <DecksTitleAddDeck onOpenCreateCardHandler={onOpenCreateCardHandler} />
        <CreationDeck isOpen={isOpenCreateDeck} setIsOpen={setIsOpenCreateDeck} />
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
        <DecksFilters
          maxCardsCount={maxCardsCount}
          minCardsCount={minCardsCount}
          onSetSearchNameHandler={onSearchNameHandler}
          onSliderValueChange={onSliderValueChange}
        />
        <DecksTable
          data={data}
          onChangeSortPerData={onChangeSortPerData}
          onOpenDeleteDeckModalHandler={onOpenDeleteDeckModalHandler}
        />

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

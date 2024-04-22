import { useState } from 'react'

import { Modal } from '@/components/ui/modal'
import { VariantModalContent } from '@/components/ui/modal/contentContainerModal/ContentContainerModal'
import { Pagination } from '@/components/ui/pagination'
import { PreLoader } from '@/components/ui/preLoader'
import { CreationDeck } from '@/features/creationEditionEntity/create/creationDeck'
import {
  OrderBy,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
} from '@/features/decksList/api'
import { DecksFilters } from '@/features/decksList/ui/decks/decksFiltres/decksFiltres'
import { DecksTable } from '@/features/decksList/ui/decks/decksTable/decksTable'
import { useDescQueryParams } from '@/features/decksList/ui/decks/useDescQueryParams'

import s from './decks.module.scss'

import { DecksTitleAddDeck } from './decksTitle-addDeck/decksTitle-addDeck'

export const DecksList = () => {
  const [isOpenCreateDeck, setIsOpenCreateDeck] = useState(false)
  const [isOpenDeleteDeck, setIsOpenDeleteDeck] = useState(false)
  const [currentIdDeck, setCurrentIdDeck] = useState('')

  const { data: minMaxCards, isLoading: isMinMaxLoading } = useGetMinMaxCardsQuery()
  const {
    authorId,
    handleChangeAuthorId,
    handleChangeItemsPerPage,
    handleChangeName,
    handleChangeOrderBy,
    handleChangePage,
    handleChangeSliderValues,
    items,
    maxCards,
    minCards,
    name,
    onHandleClearFilters,
    orderBy,
    page,
  } = useDescQueryParams({
    minMaxCards,
  })

  const { data, isLoading: isDataLoading } = useGetDecksQuery({
    authorId,
    currentPage: page,
    itemsPerPage: items.toString(),
    maxCardsCount: maxCards,
    minCardsCount: minCards,
    name,
    orderBy: orderBy as OrderBy,
  })

  const [deleteDeck, {}] = useDeleteDeckMutation()

  const onClearFiltersHandler = () => {
    onHandleClearFilters()
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

  const isSuccess =
    !!data && minMaxCards && minMaxCards.min !== undefined && minMaxCards.max !== undefined

  const isLoading = isDataLoading && isMinMaxLoading

  return isLoading ? (
    <PreLoader />
  ) : (
    isSuccess && (
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
          maxCardsCount={maxCards ?? 0}
          minCardsCount={minCards ?? 0}
          minMaxCards={minMaxCards}
          onClearFilter={onClearFiltersHandler}
          onSetSearchNameHandler={handleChangeName}
          onSliderValueChange={handleChangeSliderValues}
          onTabsValueChange={handleChangeAuthorId}
          tabsValue={authorId}
          valueName={name}
        />
        <DecksTable
          data={data}
          onChangeSortPerData={handleChangeOrderBy}
          onOpenDeleteDeckModalHandler={onOpenDeleteDeckModalHandler}
          sortName={orderBy.split('-')[1] as 'asc' | 'desc'}
        />
        <Pagination
          count={data.pagination.totalPages}
          onChange={handleChangePage}
          onPerPageChange={handleChangeItemsPerPage}
          page={data.pagination.currentPage}
          perPage={data.pagination.itemsPerPage.toString()}
          perPageOptions={['20', '15', '10', '5']}
        />
      </div>
    )
  )
}

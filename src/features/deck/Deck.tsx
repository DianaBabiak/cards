import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Modal } from '@/components/ui/modal'
import { VariantModalContent } from '@/components/ui/modal/contentContainerModal/ContentContainerModal'
import { Pagination } from '@/components/ui/pagination'
import { TextField } from '@/components/ui/textField'
import { CreationCard } from '@/features/creationEntity/creationCard'
import { DeckTable } from '@/features/deck/deckTable/DeckTable'
import { EmptyDeck } from '@/features/deck/emptyDeck/EmptyDeck'
import { LinkBackHome } from '@/features/deck/linkBackHome/LinkBackHome'
import { NameDeck } from '@/features/deck/nameDeck/NameDeck'
import { useDeck } from '@/features/deck/useDeck'
import { useDeleteCardMutation, useGetCardsQuery, useGetDeckQuery } from '@/features/decksList/api'

import s from './deck.module.scss'

export const Deck = () => {
  const [isOpenCreateCard, setIsOpenCreateCard] = useState(false)
  const [isOpenDeleteCard, setIsOpenDeleteCard] = useState(false)
  const [currentIdCard, setCurrentIdCard] = useState('')
  const location = useLocation()
  const idDeck = location.pathname.split('/').pop()

  const { data: deckData, isLoading: isLoadingGetDeck } = useGetDeckQuery({
    id: idDeck as string,
  })

  const {
    answer,
    handleChangeItemsPerPage,
    handleChangePage,
    handleChangeQuestion,
    handleChangeSort,
    handleToPreviewPage,
    itemsPerPage,
    orderBy,
    page,
    question,
  } = useDeck()
  const onOpenCreateCardHandler = () => {
    setIsOpenCreateCard(true)
  }
  const { data, isLoading: isLoadingGetCards } = useGetCardsQuery({
    answer,
    currentPage: page,
    id: idDeck as string,
    itemsPerPage,
    orderBy,
    question,
  })
  const [deleteCard, {}] = useDeleteCardMutation()
  const onOpenDeleteCardModalHandler = (idCard: string) => {
    setIsOpenDeleteCard(true)
    setCurrentIdCard(idCard)
  }
  const onDeleteCardHandler = async () => {
    try {
      await deleteCard({
        id: currentIdCard,
      })
    } catch (err) {
      console.error('Ошибка при удалении карточки:', err)
    }
  }

  // const isOwner = deck?.userId === userData?.id
  if (isLoadingGetDeck || isLoadingGetCards) {
    return <div>LOADING....</div>
  }

  return (
    <div className={s.container}>
      <LinkBackHome />
      {data?.items.length === 0 ? (
        <EmptyDeck id={idDeck} />
      ) : (
        <>
          <CreationCard id={idDeck} isOpen={isOpenCreateCard} setIsOpen={setIsOpenCreateCard} />
          <Modal
            contentText={'Do you really want to remove Card?'}
            headerTitle={'Delete Card'}
            isOpen={isOpenDeleteCard}
            labelFooterPrimaryButton={'Delete Card'}
            labelFooterSecondaryButton={'Cansel'}
            onClickPrimaryButton={onDeleteCardHandler}
            setIsOpen={setIsOpenDeleteCard}
            variant={VariantModalContent.text}
          />
          <NameDeck deckName={deckData?.name} onOpenCreateCardHandler={onOpenCreateCardHandler} />
          <div className={s.wrapperContent}>
            {deckData?.cover && (
              <img alt={'mainCardImage'} className={s.mainImageCard} src={deckData.cover} />
            )}
            <TextField
              className={s.textField}
              inputType={'search'}
              onValueChange={handleChangeQuestion}
            />
            <DeckTable
              data={data}
              handleChangeSort={handleChangeSort}
              onOpenDeleteCardModalHandler={onOpenDeleteCardModalHandler}
            />
            <Pagination
              count={data?.pagination.totalPages || 1}
              onChange={handleChangePage}
              onPerPageChange={handleChangeItemsPerPage}
              page={data?.pagination.currentPage || 1}
              perPage={data?.pagination.itemsPerPage.toString() || '10'}
              perPageOptions={['20', '15', '10', '5']}
            />
          </div>
        </>
      )}
    </div>
  )
}

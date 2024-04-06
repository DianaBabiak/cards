import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { ResponseGetCards } from '@/features/cards/api'
import { Rating } from '@/features/cards/ui/rating/Rating'
import { UpdateCard } from '@/features/creationEditionEntity/update/udateCard/UpdateCard'

import s from '../cards.module.scss'

type DeckTableProps = {
  data?: ResponseGetCards
  handleChangeSort: (sortData: 'asc' | 'desc') => void
  isOwner: boolean
  onOpenDeleteCardModalHandler: (idCard: string) => void
}
export const DeckTable = ({
  data,
  handleChangeSort,
  isOwner,
  onOpenDeleteCardModalHandler,
}: DeckTableProps) => {
  const [isOpenUpdateCard, setIsOpenUpdateCard] = useState(false)
  const [currentIdCard, setCurrentIdCard] = useState('')
  const formatter1 = new Intl.DateTimeFormat('ru')

  const onOpenUpdateCardModalHandler = (idCard: string) => {
    setIsOpenUpdateCard(true)
    setCurrentIdCard(idCard)
  }

  return (
    <>
      <UpdateCard
        idCard={currentIdCard}
        isOpen={isOpenUpdateCard}
        setIsOpen={setIsOpenUpdateCard}
      />
      <Table className={s.tableDecks}>
        <TableHead>
          <TableRow className={s.deckTableRow}>
            <TableHeadCell className={s.cell}>
              <Typography variant={'subtitle2'}>Question</Typography>
            </TableHeadCell>
            <TableHeadCell className={s.cell}>
              <Typography variant={'subtitle2'}>Answer</Typography>
            </TableHeadCell>
            <TableHeadCell className={s.cell} isSortedColumn onChangeSort={handleChangeSort}>
              <Typography variant={'subtitle2'}>Last Updated</Typography>
            </TableHeadCell>
            <TableHeadCell className={s.cell}>
              <Typography variant={'subtitle2'}>Grade</Typography>
            </TableHeadCell>
            {isOwner && <TableHeadCell className={s.lastCell}></TableHeadCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.items.map(card => (
            <TableRow className={s.deckTableRow} key={card.id}>
              <TableBodyCell className={s.cell}>
                <div className={s.wrapperTableImg}>
                  <Typography variant={'body2'}>{card.question}</Typography>
                  {card.questionImg && (
                    <img alt={'questionCardImage'} className={s.imageCard} src={card.questionImg} />
                  )}
                </div>
              </TableBodyCell>
              <TableBodyCell className={s.cell}>
                <div className={s.wrapperTableImg}>
                  <Typography variant={'body2'}>{card.answer}</Typography>
                  {card.answerImg && (
                    <img alt={'answerCardImage'} className={s.imageCard} src={card.answerImg} />
                  )}
                </div>
              </TableBodyCell>
              <TableBodyCell className={s.cell}>
                <Typography variant={'body2'}>
                  {formatter1.format(new Date(card.updated))}
                </Typography>
              </TableBodyCell>
              <TableBodyCell className={s.cell}>
                <Rating rating={card.grade} />
              </TableBodyCell>
              {isOwner && (
                <TableBodyCell className={s.lastCell}>
                  <div className={s.deckButtonsWrapper}>
                    <Button
                      as={'a'}
                      buttonImg={'edit2'}
                      className={s.deckButton}
                      isImg
                      onClick={() => onOpenUpdateCardModalHandler(card.id)}
                    ></Button>
                    <Button
                      as={'a'}
                      buttonImg={'trash'}
                      className={s.deckButton}
                      isImg
                      onClick={() => onOpenDeleteCardModalHandler(card.id)}
                    />
                  </div>
                </TableBodyCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

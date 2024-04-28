import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Icon } from '@/components/ui/Icon'
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
import { useMeQuery } from '@/features/auth/api/auth-api'
import { UpdateDeck } from '@/features/creationEditionEntity/update/updateDeck/UpdateDeck'
import { ResponseGetDecks } from '@/features/decksList/api'

import s from '@/features/decksList/ui/decks/decks.module.scss'

type DecksTableProps = {
  data: ResponseGetDecks
  onChangeSortPerData: (sortData: 'asc' | 'desc') => void
  onOpenDeleteDeckModalHandler: (idDeck: string) => void
  sortName: 'asc' | 'desc'
}

export const DecksTable = (props: DecksTableProps) => {
  const [isOpenEditDeck, setIsOpenEditDeck] = useState(false)
  const [currentIdDeck, setCurrentIdDeck] = useState('')
  const { data, onChangeSortPerData, onOpenDeleteDeckModalHandler, sortName } = props

  const { data: meData } = useMeQuery()

  const formatter1 = new Intl.DateTimeFormat('ru')

  const onChangeSortPerDataHandler = (sortData: 'asc' | 'desc') => onChangeSortPerData(sortData)
  const onOpenEditModalHandler = (id: string) => {
    setIsOpenEditDeck(true)
    setCurrentIdDeck(id)
  }

  return (
    <>
      {isOpenEditDeck && (
        <UpdateDeck idDeck={currentIdDeck} isOpen={isOpenEditDeck} setIsOpen={setIsOpenEditDeck} />
      )}
      <Table className={s.tableDecks}>
        <TableHead>
          <TableRow>
            <TableHeadCell>
              <Typography variant={'subtitle2'}>Name</Typography>
            </TableHeadCell>
            <TableHeadCell>
              <Typography variant={'subtitle2'}>Cards</Typography>
            </TableHeadCell>
            <TableHeadCell
              isSortedColumn
              onChangeSort={onChangeSortPerDataHandler}
              sortName={sortName}
            >
              <Typography variant={'subtitle2'}>Last Updated</Typography>
            </TableHeadCell>
            <TableHeadCell>
              <Typography variant={'subtitle2'}>Created by</Typography>
            </TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items.map(deck => (
            <TableRow key={deck.id}>
              <TableBodyCell>
                <div className={s.deckTableNameCellWrapper}>
                  <Link className={s.link} to={`deck/${deck.id}`}>
                    {deck.name && (
                      <Typography className={s.deckTableNameSpan} variant={'body2'}>
                        {deck.name}
                      </Typography>
                    )}
                    {deck.cover && (
                      <img alt={'deck image'} className={s.deckTableNameImg} src={deck.cover} />
                    )}
                  </Link>
                </div>
              </TableBodyCell>
              <TableBodyCell>
                <Typography variant={'body2'}>{deck.cardsCount}</Typography>
              </TableBodyCell>
              <TableBodyCell>
                <Typography variant={'body2'}>
                  {formatter1.format(new Date(deck.updated))}
                </Typography>
              </TableBodyCell>
              <TableBodyCell>
                <Typography variant={'body2'}>{deck.author.name}</Typography>
              </TableBodyCell>
              <TableBodyCell className={s.deckButtonsCell}>
                <div className={s.deckButtonsWrapper}>
                  <Link className={s.deckButton} to={`/learn/${deck.id}`}>
                    <Icon iconId={'playCircle'} />
                  </Link>
                  <Button
                    as={'a'}
                    buttonImg={meData?.id === deck.author.id ? 'edit2' : 'edit3'}
                    className={s.deckButton}
                    isImg
                    onClick={() => onOpenEditModalHandler(deck.id)}
                    style={{ pointerEvents: meData?.id !== deck.author.id ? 'none' : 'auto' }}
                  ></Button>
                  <Button
                    as={'a'}
                    buttonImg={meData?.id === deck.author.id ? 'trash' : 'trash2'}
                    className={s.deckButton}
                    isImg
                    onClick={() => onOpenDeleteDeckModalHandler(deck.id)}
                    style={{ pointerEvents: meData?.id !== deck.author.id ? 'none' : 'auto' }}
                  ></Button>
                </div>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

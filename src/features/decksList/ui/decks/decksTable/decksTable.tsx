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
import { ResponseGetDecks } from '@/features/decksList/api'

import s from '@/features/decksList/ui/decks/decks.module.scss'

type DecksTableProps = {
  data: ResponseGetDecks
  onChangeSortPerData: (sortData: 'asc' | 'desc') => void
}

export const DecksTable = (props: DecksTableProps) => {
  const { data, onChangeSortPerData } = props

  const formatter1 = new Intl.DateTimeFormat('ru')

  const onChangeSortPerDataHandler = (sortData: 'asc' | 'desc') => onChangeSortPerData(sortData)

  return (
    <Table className={s.tableDecks}>
      <TableHead>
        <TableRow>
          <TableHeadCell>
            <Typography variant={'subtitle2'}>Name</Typography>
          </TableHeadCell>
          <TableHeadCell>
            <Typography variant={'subtitle2'}>Cards</Typography>
          </TableHeadCell>
          <TableHeadCell isSortedColumn onChangeSort={onChangeSortPerDataHandler}>
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
          <TableRow className={s.deckTableRow} key={deck.id}>
            <TableBodyCell>
              <Typography variant={'body2'}>{deck.name}</Typography>
            </TableBodyCell>
            <TableBodyCell>
              <Typography variant={'body2'}>{deck.cardsCount}</Typography>
            </TableBodyCell>
            <TableBodyCell>
              <Typography variant={'body2'}>{formatter1.format(new Date(deck.updated))}</Typography>
            </TableBodyCell>
            <TableBodyCell>
              <Typography variant={'body2'}>{deck.author.name}</Typography>
            </TableBodyCell>
            <TableBodyCell className={s.deckButtonsCell}>
              <div className={s.deckButtonsWrapper}>
                <Button as={'a'} buttonImg={'playCircle'} className={s.deckButton} isImg></Button>
                <Button as={'a'} buttonImg={'edit2'} className={s.deckButton} isImg></Button>
                <Button as={'a'} buttonImg={'trash'} className={s.deckButton} isImg></Button>
              </div>
            </TableBodyCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

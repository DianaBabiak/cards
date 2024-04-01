import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { DropDownMenu, DropdownItem } from '@/components/ui/dropDownMenu'
import { Icon } from '@/components/ui/icon'
import { Pagination } from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { OrderBy, useGetCardsQuery } from '@/features/decksList/api'

import s from './deck.module.scss'

export const Deck = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [orderBy, setOrderBy] = useState<OrderBy>(null)
  const [answer, setAnswer] = useState('')
  const [question, setQuestion] = useState('')

  const location = useLocation()
  const idDeck = location.pathname.split('/').pop()
  const { data, isLoading } = useGetCardsQuery({
    answer,
    currentPage,
    id: idDeck,
    itemsPerPage,
    orderBy,
    question,
  })
  const formatter1 = new Intl.DateTimeFormat('ru')

  return (
    <div className={s.container}>
      {isLoading ? (
        <div>LOADING....</div>
      ) : (
        <>
          <Link className={s.link} to={'/'}>
            <Icon height={'16'} iconId={'backArrow'} viewBox={'0 0 16 16'} width={'16'}></Icon>
            <Typography variant={'body2'}>Back to Decks List</Typography>
          </Link>
          <div className={s.titleContainer}>
            <div className={s.containerDropDownMenu}>
              <Typography variant={'h1'}>Name Deck</Typography>
              <DropDownMenu
                trigger={
                  <button className={s.buttonDropDownMenu}>
                    <Icon
                      height={'24px'}
                      iconId={'moreVerticalOutline'}
                      viewBox={'0 0 24 24 '}
                      width={'24px'}
                    />
                  </button>
                }
              >
                <DropdownItem>
                  <Icon
                    height={'16px'}
                    iconId={'playCircle'}
                    viewBox={'0 0 16 16 '}
                    width={'16px'}
                  />
                  Learn
                </DropdownItem>
                <DropdownItem>
                  <Icon height={'16px'} iconId={'edit2'} viewBox={'0 0 16 16 '} width={'16px'} />
                  Edit
                </DropdownItem>
                <DropdownItem>
                  <Icon height={'16px'} iconId={'trash'} viewBox={'0 0 16 16 '} width={'16px'} />
                  Delete
                </DropdownItem>
              </DropDownMenu>
            </div>
            <Button>Add New Card</Button>
          </div>
          {data?.items.length === 0 ? (
            <div className={s.wrapperEmptyContent}>
              <Typography colorTheme={'dark'}>
                This pack is empty. Click add new card to fill this pack
              </Typography>
              <Button>Add New Card</Button>
            </div>
          ) : (
            <div className={s.wrapperContent}>
              {
                <img
                  alt={'mainCardImage'}
                  className={s.mainImageCard}
                  src={
                    'https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg?size=338&ext=jpg&ga=GA1.1.1908636980.1711929600&semt=ais'
                  }
                />
              }
              <TextField className={s.textField} inputType={'search'} />
              <Table className={s.tableDecks}>
                <TableHead>
                  <TableRow className={s.deckTableRow}>
                    <TableHeadCell className={s.cell}>
                      <Typography variant={'subtitle2'}>Question</Typography>
                    </TableHeadCell>
                    <TableHeadCell className={s.cell}>
                      <Typography variant={'subtitle2'}>Answer</Typography>
                    </TableHeadCell>
                    <TableHeadCell className={s.cell} isSortedColumn>
                      <Typography variant={'subtitle2'}>Last Updated</Typography>
                    </TableHeadCell>
                    <TableHeadCell className={s.cell}>
                      <Typography variant={'subtitle2'}>Grade</Typography>
                    </TableHeadCell>
                    <TableHeadCell className={s.lastCell}></TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.items.map(card => (
                    <TableRow className={s.deckTableRow} key={card.id}>
                      <TableBodyCell className={s.cell}>
                        <Typography variant={'body2'}>
                          {card.question}
                          {card.questionImg && (
                            <img
                              alt={'questionCardImage'}
                              className={s.imageCard}
                              src={card.questionImg}
                            />
                          )}
                        </Typography>
                      </TableBodyCell>
                      <TableBodyCell className={s.cell}>
                        <Typography variant={'body2'}>
                          {card.answer}
                          {card.answerImg && (
                            <img
                              alt={'answerCardImage'}
                              className={s.imageCard}
                              src={card.answerImg}
                            />
                          )}
                        </Typography>
                      </TableBodyCell>
                      <TableBodyCell className={s.cell}>
                        <Typography variant={'body2'}>
                          {formatter1.format(new Date(card.updated))}
                        </Typography>
                      </TableBodyCell>
                      <TableBodyCell className={s.cell}>
                        <Typography variant={'body2'}>
                          <div className={s.gradesContainer}>
                            <Icon height={'16px'} iconId={'emptyStar'} width={'16px'}></Icon>
                            <Icon height={'16px'} iconId={'emptyStar'} width={'16px'}></Icon>
                            <Icon height={'16px'} iconId={'emptyStar'} width={'16px'}></Icon>
                            <Icon height={'16px'} iconId={'emptyStar'} width={'16px'}></Icon>
                            <Icon height={'16px'} iconId={'emptyStar'} width={'16px'}></Icon>
                          </div>
                        </Typography>
                      </TableBodyCell>
                      <TableBodyCell className={s.lastCell}>
                        <div className={s.deckButtonsWrapper}>
                          <Button
                            as={'a'}
                            buttonImg={'edit2'}
                            className={s.deckButton}
                            isImg
                          ></Button>
                          <Button
                            as={'a'}
                            buttonImg={'trash'}
                            className={s.deckButton}
                            isImg
                          ></Button>
                        </div>
                      </TableBodyCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                count={data?.pagination.totalPages || 1}
                onChange={() => {}}
                onPerPageChange={() => {}}
                page={data?.pagination.currentPage || 1}
                perPage={data?.pagination.itemsPerPage.toString() || '10'}
                perPageOptions={['20', '15', '10', '5']}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

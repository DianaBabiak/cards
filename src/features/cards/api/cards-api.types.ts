import { DecksPagination } from '@/features/decksList/api'

export type ResponseGetCard = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

export type GetRandomCard = {
  idDeck: string
  previousCardId?: string
}

export type SaveGradeCard = {
  cardId: string
  grade: 0 | 1 | 2 | 3 | 4 | 5
  idDeck: string
}

export type ResponseGetCards = {
  items: ResponseGetCard[]
  pagination: DecksPagination
}

export type GetCardsArgs = {
  answer?: string
  currentPage?: number
  id: string
  itemsPerPage?: number
  orderBy?: string
  question?: string
}

export type CreateCardArgs = {
  answer: string
  answerImg?: string
  answerVideo?: string
  id?: string
  question: string
  questionImg?: string
  questionVideo?: string
}

export type ResponseGetDecks = {
  items: DecksItems[]
  pagination: DecksPagination
}
export type DecksItemsAuthor = {
  id: string
  name: string
}
export type DecksItems = {
  author: DecksItemsAuthor
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}
export type DecksPagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type GetDecksArgs = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: string
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: OrderBy
}

export type CreateDeckArgs = {
  cover?: string
  isPrivate?: boolean
  name: string
}

export type DeleteDeckArgs = {
  id: string
}

export type DeleteDeckResponse = Omit<DecksItems, 'author'>

export type UpdateDeckArgs = Partial<CreateDeckArgs> & DeleteDeckArgs

export type OrderBy =
  | 'author.name-asc'
  | 'author.name-desc'
  | 'cardsCount-asc'
  | 'cardsCount-desc'
  | 'created-asc'
  | 'created-desc'
  | 'name-asc'
  | 'name-desc'
  | 'updated-asc'
  | 'updated-desc'
  | null

export type ResponseGetMinMaxCards = {
  max: number
  min: number
}

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
  orderBy?: OrderBy
  question?: string
}

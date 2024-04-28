import {
  CreateCardArgs,
  GetCardsArgs,
  GetRandomCard,
  ResponseGetCard,
  ResponseGetCards,
  SaveGradeCard,
} from '@/features/cards/api/cards-api.types'
import { DeckArgs, DeleteDeckResponse } from '@/features/decksList/api'
import { baseApi } from '@/services/base-api'

function buildCardFormData(body: Omit<CreateCardArgs, 'id'>) {
  const formData = new FormData()

  if (body.questionVideo) {
    formData.append('questionVideo', body.questionVideo)
  }
  if (body.answerVideo) {
    formData.append('answerVideo', body.answerVideo)
  }
  if (body.questionImg) {
    formData.append('questionImg', body.questionImg)
  }
  if (body.answerImg) {
    formData.append('answerImg', body.answerImg)
  }
  formData.append('answer', body.answer)
  formData.append('question', body.question)

  return formData
}

export const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<ResponseGetCard, CreateCardArgs>({
        invalidatesTags: ['Cards', 'Decks'],
        query: ({ id, ...args }) => ({
          body: buildCardFormData(args),
          formData: buildCardFormData(args),
          method: 'POST',
          url: `v1/decks/${id}/cards`,
        }),
      }),
      deleteCard: builder.mutation<DeleteDeckResponse, DeckArgs>({
        invalidatesTags: ['Cards'],
        query: args => ({
          method: 'DELETE',
          url: `/v1/cards/${args.id}`,
        }),
      }),
      getCardById: builder.query<ResponseGetCard, DeckArgs>({
        providesTags: ['Cards'],
        query: ({ id }) => `/v1/cards/${id}`,
      }),
      getCards: builder.query<ResponseGetCards, GetCardsArgs>({
        providesTags: ['Cards'],
        query: ({ id, ...params }) => ({
          params: params ?? undefined,
          url: `/v1/decks/${id}/cards`,
        }),
      }),
      getRandomCard: builder.query<ResponseGetCard, GetRandomCard>({
        providesTags: ['Cards', 'Decks'],
        query: ({ idDeck }) => `/v1/decks/${idDeck}/learn`,
      }),
      saveGradeCard: builder.mutation<ResponseGetCard, SaveGradeCard>({
        invalidatesTags: ['Cards', 'Decks'],
        query: ({ idDeck, ...args }) => ({
          body: args,
          method: 'POST',
          url: `/v1/decks/${idDeck}/learn`,
        }),
      }),
      updateCard: builder.mutation<ResponseGetCard, CreateCardArgs>({
        invalidatesTags: ['Cards', 'Decks'],
        query: ({ id, ...args }) => ({
          body: buildCardFormData(args),
          formData: buildCardFormData(args),
          method: 'PATCH',
          url: `v1/cards/${id}`,
        }),
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardByIdQuery,
  useGetCardsQuery,
  useGetRandomCardQuery,
  useSaveGradeCardMutation,
  useUpdateCardMutation,
} = cardsApi

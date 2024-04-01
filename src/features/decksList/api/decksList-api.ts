import { baseApi } from '@/services/base-api'

import {
  CreateDeckArgs,
  DecksItems,
  DeleteDeckArgs,
  DeleteDeckResponse,
  GetCardsArgs,
  GetDecksArgs,
  GetRandomCard,
  ResponseGetCard,
  ResponseGetCards,
  ResponseGetDecks,
  ResponseGetMinMaxCards,
  SaveGradeCard,
  UpdateDeckArgs,
} from './decksList-api.types'

export const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<DecksItems, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/decks',
        }),
      }),
      deleteDeck: builder.mutation<DeleteDeckResponse, DeleteDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          method: 'DELETE',
          url: `/v1/decks/${args.id}`,
        }),
      }),
      getCards: builder.query<ResponseGetCards, GetCardsArgs>({
        providesTags: ['Decks'],
        query: ({ id, ...params }) => ({
          params: params ?? undefined,
          url: `/v1/decks/${id}/cards`,
        }),
      }),
      getDecks: builder.query<ResponseGetDecks, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: params => ({
          params: params ?? undefined,
          url: `/v2/decks`,
        }),
      }),
      getMinMaxCards: builder.query<ResponseGetMinMaxCards, void>({
        providesTags: ['Decks'],
        query: () => '/v2/decks/min-max-cards',
      }),
      getRandomCard: builder.query<ResponseGetCard, GetRandomCard>({
        providesTags: ['Decks'],
        query: ({ idDeck }) => `/v1/decks/${idDeck}/learn`,
      }),
      saveGradeCard: builder.mutation<ResponseGetCard, SaveGradeCard>({
        invalidatesTags: ['Decks'],
        query: ({ idDeck, ...args }) => ({
          body: args,
          method: 'POST',
          url: `/v1/decks/${idDeck}/learn`,
        }),
      }),
      updateDeck: builder.mutation<DecksItems, UpdateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: ({ id, ...args }) => ({
          body: args,
          method: 'PATCH',
          url: `/v1/decks/${id}`,
        }),
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetCardsQuery,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useGetRandomCardQuery,
  useSaveGradeCardMutation,
  useUpdateDeckMutation,
} = decksApi

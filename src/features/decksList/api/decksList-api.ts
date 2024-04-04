import { baseApi } from '@/services/base-api'

import {
  CreateCardArgs,
  CreateDeckArgs,
  DeckArgs,
  DecksItem,
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
      createCard: builder.mutation<ResponseGetCard, CreateCardArgs>({
        invalidatesTags: ['Cards'],
        query: ({ id, ...args }) => ({
          body: args,
          method: 'POST',
          url: `/v1/decks/${id}/cards`,
        }),
      }),
      createDeck: builder.mutation<DecksItem, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/decks',
        }),
      }),
      deleteCard: builder.mutation<DeleteDeckResponse, DeckArgs>({
        invalidatesTags: ['Cards'],
        query: args => ({
          method: 'DELETE',
          url: `/v1/decks/${args.id}`,
        }),
      }),
      deleteDeck: builder.mutation<void, DeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          method: 'DELETE',
          url: `/v1/cards/${args.id}`,
        }),
      }),
      getCards: builder.query<ResponseGetCards, GetCardsArgs>({
        providesTags: ['Cards'],
        query: ({ id, ...params }) => ({
          params: params ?? undefined,
          url: `/v1/decks/${id}/cards`,
        }),
      }),
      getDeck: builder.query<DecksItem, DeckArgs>({
        providesTags: ['Decks'],
        query: ({ id }) => ({
          url: `/v1/decks/${id}`,
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
      updateDeck: builder.mutation<DecksItem, UpdateDeckArgs>({
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
  useCreateCardMutation,
  useCreateDeckMutation,
  useDeleteCardMutation,
  useDeleteDeckMutation,
  useGetCardsQuery,
  useGetDeckQuery,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useGetRandomCardQuery,
  useSaveGradeCardMutation,
  useUpdateDeckMutation,
} = decksApi

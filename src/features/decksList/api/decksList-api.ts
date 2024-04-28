import { baseApi } from '@/services/base-api'

import {
  CreateDeckArgs,
  DeckArgs,
  DecksItem,
  DeleteDeckResponse,
  GetDecksArgs,
  ResponseGetDecks,
  ResponseGetMinMaxCards,
  UpdateDeckArgs,
} from './decksList-api.types'

function buildDeckFormData(body: Partial<CreateDeckArgs>) {
  const formData = new FormData()

  if (body.cover) {
    formData.append('cover', body.cover)
  }
  if (body.isPrivate) {
    formData.append('isPrivate', `${body.isPrivate}`)
  }
  if (body.name) {
    formData.append('name', body.name)
  }

  return formData
}

export const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<DecksItem, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: buildDeckFormData(args),
          formData: buildDeckFormData(args),
          method: 'POST',
          url: '/v1/decks',
        }),
      }),
      deleteDeck: builder.mutation<DeleteDeckResponse, DeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          method: 'DELETE',
          url: `/v1/decks/${args.id}`,
        }),
      }),
      getDeck: builder.query<DecksItem, DeckArgs>({
        providesTags: ['Decks'],
        query: ({ id }) => ({
          url: `/v1/decks/${id}`,
        }),
      }),
      getDeckById: builder.query<DecksItem, DeckArgs>({
        providesTags: ['Decks'],
        query: ({ id }) => `/v1/decks/${id}`,
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
      updateDeck: builder.mutation<DecksItem, UpdateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: ({ id, ...args }) => ({
          body: buildDeckFormData(args),
          formData: buildDeckFormData(args),
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
  useGetDeckByIdQuery,
  useGetDeckQuery,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useUpdateDeckMutation,
} = decksApi

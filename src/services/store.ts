import { decksListReducer } from '@/features/decksList/model/decksList/decksSlice'
import { baseApi } from '@/services/base-api'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  reducer: { [baseApi.reducerPath]: baseApi.reducer, decksList: decksListReducer },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

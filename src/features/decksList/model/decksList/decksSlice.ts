import { createSlice } from '@reduxjs/toolkit'

export type DecksListState = ReturnType<typeof slice.getInitialState>

//REDUCER
const slice = createSlice({
  initialState: {
    isClearFilters: false,
  },
  name: 'decksList',
  reducers: {},
})

export const decksListReducer = slice.reducer
export const decksListActions = slice.actions

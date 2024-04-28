import { PayloadAction, createSlice } from '@reduxjs/toolkit'

//TYPES
export type AppInitialState = ReturnType<typeof slice.getInitialState>

//REDUCER
const slice = createSlice({
  initialState: {
    error: null as null | string,
  },
  name: 'app',
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions

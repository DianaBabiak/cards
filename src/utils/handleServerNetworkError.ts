import { appActions } from '@/app/appSlice'
import { AppDispatch } from '@/services/store'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

export const handleServerNetworkError = (dispatch: AppDispatch, error: unknown) => {
  let errorMessage = 'Some error occurred!'

  if (isFetchBaseQueryError(error)) {
    if (error.status === 0) {
      errorMessage = 'Offline'
    } else if (error.status) {
      if (typeof error.data === 'object' && error.data && 'message' in error.data) {
        errorMessage = (error.data as any).message || errorMessage
      } else if (typeof error === 'object' && error && 'error' in error) {
        errorMessage = (error as any).error || errorMessage
      }
    }
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
  }
  dispatch(appActions.setAppError({ error: errorMessage }))
}

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return (error as FetchBaseQueryError).status !== undefined
}

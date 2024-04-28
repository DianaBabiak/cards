import * as React from 'react'

import { appActions } from '@/app/appSlice'
import { useAppDispatch, useAppSelector } from '@/common/hooks/hooks'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

export default function CustomizedSnackbars() {
  const error = useAppSelector(state => state.app.error)
  const dispatch = useAppDispatch()

  const handleClose = (event?: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(appActions.setAppError({ error: null }))
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        autoHideDuration={3000}
        onClose={handleClose}
        open={!!error}
      >
        <Alert onClose={handleClose} severity={'error'} sx={{ width: '100%' }} variant={'filled'}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}

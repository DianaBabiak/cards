import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export const PreLoader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '50px 0' }}>
      <CircularProgress size={100} sx={{ color: 'var(--color-accent-900)' }} />
    </Box>
  )
}

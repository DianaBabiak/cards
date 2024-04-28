import CustomizedSnackbars from '@/components/ui/errorSnackbar/errorSnackbar'
import { Router } from '@/router'

export function App() {
  return (
    <>
      <CustomizedSnackbars />
      <Router />
    </>
  )
}

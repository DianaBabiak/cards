import { Outlet } from 'react-router-dom'

import { Header } from '@/features/header'

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

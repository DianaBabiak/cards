import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { LoginForm } from '@/components/auth/login/loginForm'
import { DecksList } from '@/features/decksList/ui/decks'
import { LearnDeck } from '@/features/learnDeck'

const publicRoutes: RouteObject[] = [
  {
    element: <LoginForm />,
    path: '/login',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksList />,
    path: '/',
  },
  {
    element: <LearnDeck />,
    path: '/learn/:deckId',
  },
]

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}

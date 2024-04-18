import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { ForgotPasswordForm } from '@/components/auth/forgorPassword/forgotPassword-form'
import { CreateLoginForm } from '@/components/auth/login/createLoginForm'
import { LoginForm } from '@/components/auth/login/loginForm'
import { useMeQuery } from '@/features/auth/api/auth-api'
import { Cards } from '@/features/cards/ui/Cards'
import { DecksList } from '@/features/decksList/ui/decks'
import { LearnDeck } from '@/features/learnDeck'

const publicRoutes: RouteObject[] = [
  {
    element: <LoginForm />,
    path: '/login',
  },
  {
    element: <CreateLoginForm />,
    path: '/login/registration',
  },
  {
    element: <ForgotPasswordForm />,
    path: '/login/forgot-password',
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
  {
    element: <Cards />,
    path: '/deck/:deckId',
  },
]

function PrivateRoutes() {
  const { isError, isLoading } = useMeQuery()
  const isAuthenticated = !isError && !isLoading

  if (isLoading) {
    return <div>Loading</div>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

function PublicRoutes() {
  const { isSuccess } = useMeQuery()

  return isSuccess ? <Navigate to={'/'} /> : <Outlet />
}

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  {
    children: publicRoutes,
    element: <PublicRoutes />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

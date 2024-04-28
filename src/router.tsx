import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { EditableForm } from '@/components/auth/editable-form'
import { BackToEmail } from '@/components/auth/forgorPassword/backToEmail'
import { CreateNewPasswordForm } from '@/components/auth/forgorPassword/createNewPassword-form'
import { ForgotPasswordForm } from '@/components/auth/forgorPassword/forgotPassword-form'
import { CreateLoginForm } from '@/components/auth/login/createLoginForm'
import { LoginForm } from '@/components/auth/login/loginForm'
import { PreLoader } from '@/components/ui/preLoader'
import { useMeQuery } from '@/features/auth/api/auth-api'
import { Cards } from '@/features/cards/ui/Cards'
import { DecksList } from '@/features/decksList/ui/decks'
import { LearnDeck } from '@/features/learnDeck'
import { Layout } from '@/layout/Layout'
import { Error404 } from '@/pages/error404'

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
  {
    element: <BackToEmail />,
    path: '/login/back-to-email',
  },
  {
    element: <CreateNewPasswordForm />,
    path: '/login/recover-password/:token',
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
  {
    element: <EditableForm />,
    path: '/profile',
  },
]

function PrivateRoutes() {
  const { isError, isLoading } = useMeQuery(undefined, {
    refetchOnMountOrArgChange: 1, // in seconds
  })
  const isAuthenticated = !isError && !isLoading

  if (isLoading) {
    return <PreLoader />
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

function PublicRoutes() {
  const { isSuccess } = useMeQuery()

  return isSuccess ? <Navigate to={'/'} /> : <Outlet />
}

export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      {
        children: publicRoutes,
        element: <PublicRoutes />,
      },
    ],
    element: <Layout />,
    path: '/',
  },
  {
    element: <Error404 />,
    path: '*',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

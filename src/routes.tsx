import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import Users from '@/pages/Users'
import UserEdit from '@/pages/UserEdit'
import SignIn from '@/pages/signin'
import HomePage from '@/pages/home'
import { isAuthenticated } from '@/lib/utils'

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" replace />
}

const AuthenticatedRoute = () => {
  return isAuthenticated() ? <Navigate to="/" replace /> : <Outlet />
}

const Logout = () => {
  Cookies.remove('authToken')
  Cookies.remove('type')
  Cookies.remove('id')
  return <Navigate to="/signin" replace />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    element: <AuthenticatedRoute />,
    children: [
      {
        path: '/signin',
        element: <SignIn />,
      },
    ],
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/users/:userId',
        element: <UserEdit />,
      },
    ],
  },
])

export default router

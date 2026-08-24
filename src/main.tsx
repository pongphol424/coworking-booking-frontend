import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import { Login } from './pages/Login/Login.tsx'
import { loginAction } from './pages/Login/Login.action.ts'
import { Register } from './pages/Register/Register.tsx'
import { createAccountAction } from './pages/Register/Register.action.ts'
import { UserProfile } from './pages/UserProfile/UserProfile.tsx'
import { RootErrorBoundary } from './RootErrorBoundary.tsx'
import { CreateRoomType, createRoomtypeAction } from './pages/admin/CreateRoomType.tsx'
import 'normalize.css'
import { updateAccountAction } from './pages/UserProfile/UserProfile.action.ts'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        ErrorBoundary: RootErrorBoundary,
        children: [
            { index: true, element: <Home /> },
            { path: "/login", element: <Login />, action: loginAction },
            { path: "/register", element: <Register />, action: createAccountAction },
            { path: "/profile", element: <UserProfile />, action: updateAccountAction },
            { path: "/admin/createRoomType", element: <CreateRoomType />, action: createRoomtypeAction }
        ]
    }
])



createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)

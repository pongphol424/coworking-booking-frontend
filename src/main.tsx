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
import { CreateRoomType } from './pages/admin/RoomType/CreateRoomType.tsx'
import 'normalize.css'
import { updateAccountAction } from './pages/UserProfile/UserProfile.action.ts'
import { homeLoader } from './pages/Home.loader.ts'
import { RoomTypeManagement } from './pages/admin/RoomType/RoomTypeManagement.tsx'
import { roomTypeSearchHandle } from './components/SearchFilterBar/RoomType/RoomTypeSearchForm.handleSubmit.ts'
import { userProfileLoader } from './pages/UserProfile/UserProfile.loader.ts'
import { createRoomtypeAction } from './pages/admin/RoomType/CreateRoomType.action.ts'





const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        ErrorBoundary: RootErrorBoundary,
        children: [
            { index: true, element: <Home />, loader: homeLoader },
            { path: "/login", element: <Login />, action: loginAction },
            { path: "/register", element: <Register />, action: createAccountAction },
            { path: "/profile", element: <UserProfile />, loader: userProfileLoader, action: updateAccountAction },
            { path: "/admin/room-types/new", element: <CreateRoomType />, action: createRoomtypeAction },
            { path: "/admin/room-types", element: <RoomTypeManagement/>, loader: roomTypeSearchHandle},
        ]
    }
])



createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)

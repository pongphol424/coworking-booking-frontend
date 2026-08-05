import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import { Login, loginAction } from './pages/Login.tsx'
import { createAccountAction, Register } from './pages/Register.tsx'
import { updateAccountAction, UserProfile } from './pages/UserProfile.tsx'
import { RootErrorBoundary } from './RootErrorBoundary.tsx'
import { BackOffice } from './pages/BackOffice.tsx'
import { CreateRoomType, createRoomtypeAction } from './pages/CreateRoomType.tsx'

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        ErrorBoundary:RootErrorBoundary,
        children:[
            {index:true, element:<Home/>},
            {path:"/login",element:<Login/>,action:loginAction},
            {path:"/register",element:<Register/>,action:createAccountAction},
            {path:"/profile",element:<UserProfile/>,action:updateAccountAction},
            {path:"/admin/backOffice",element:<BackOffice/>},
            {path:"/admin/createRoomType",element:<CreateRoomType/>,action:createRoomtypeAction}
        ]
    }
])



createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <RouterProvider router={router}/>
    </StrictMode>,
)

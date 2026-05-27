import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import { Login, loginAction } from './pages/Login.tsx'
import { createAccountAction, Register } from './pages/Register.tsx'
import { UserProfile } from './pages/UserProfile.tsx'
import { RootErrorBoundary } from './service/RootErrorBoundary.tsx'

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        ErrorBoundary:RootErrorBoundary,
        children:[
            {index:true, element:<Home/>},
            {path:"/login",element:<Login/>,action:loginAction},
            {path:"/register",element:<Register/>,action:createAccountAction},
            {path:"/profile",element:<UserProfile/>}
        ]
    }
])



createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <RouterProvider router={router}/>
    </StrictMode>,
)

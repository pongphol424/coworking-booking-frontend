import { Outlet } from 'react-router-dom'
import './App.css'
import { Navbar } from './Components/Navbar'
import { AuthProvider } from './context/auth.context'

function App() {

  return (
    <>
      <AuthProvider>
        <Navbar/>
        <Outlet/>
      </AuthProvider>
    </>
  )
}

export default App

import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { AuthProvider } from './context/auth.context'

function App() {

  return (
    <>
      <AuthProvider>
        <Navbar/>
        <main className='page-content'>
          <Outlet/>
        </main>
      </AuthProvider>
    </>
  )
}

export default App

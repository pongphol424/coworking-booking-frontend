import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { AuthProvider } from './context/auth.context'
import ScrollToTop from './components/ScrollToTop'

function App() {

  return (
    <>
      <AuthProvider>
        <ScrollToTop/>
        <Navbar/>
        <main className='page-content'>
          <Outlet/>
        </main>
      </AuthProvider>
    </>
  )
}

export default App

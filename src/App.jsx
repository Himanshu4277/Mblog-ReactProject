import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import authServices from "./Appwrite/Auth.js"
import { login, logout } from "./features/authSlice.js"
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authServices.getUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => { setloading(false) })
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-white text-gray-800'>
      <Header />
      <main className=" ">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App

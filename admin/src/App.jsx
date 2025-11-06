import React, { useState,useEffect } from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './Pages/Add'
import Order from './Pages/Order'
import List from './Pages/List'
import Login from './Components/Login'
import {ToastContainer} from 'react-toastify'
export const backendurl=import.meta.env.VITE_BACKEND_URL
const App = () => {
  const [token, settoken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
  useEffect(()=>{
      localStorage.setItem('token',token);
    },[token]);
  return (
    <div className='bg-white min-h-screen'>
      <ToastContainer />
      {token === '' ? <Login settoken={settoken}/>
        : <>
          <Navbar settoken={settoken}/>
          <hr className='border-gray-200' />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-2xl'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Order token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }


    </div>
  )
}

export default App

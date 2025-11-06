import React from 'react'
import {assets} from '../assests/assets'
const Navbar = ({settoken}) => {
  return (
    <div className='flex justify-between items-center py-2 px-[4%]'>
      <img className='w-[10%]' src={assets.logo} alt="logo" />
      <button onClick={()=>settoken('')}className='border rounded-full bg-gray-600 text-white px-5 py-2 sm:px-7 py-2'>Logout</button>
    </div>
  )
}

export default Navbar

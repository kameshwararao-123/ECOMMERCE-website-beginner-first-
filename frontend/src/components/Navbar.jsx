import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
const Navbar = () => {
  const [visible,setvisible]=useState(false);
  const {setshowsearch,getcartcount,token,settoken,navigate,setcartitems}=useContext(ShopContext);
  const logout=()=>{
    navigate('/login');
    localStorage.removeItem('token');
    settoken('');
    setcartitems({});
  }
  return (
    <div className="flex justify-between items-center py-5  font-medium">
        <Link to={'/'}><img src={assets.logo} className="w-36" alt="Logo" /></Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
      <NavLink to="/" className="no-underline hover:text-gray-500">HOME<hr className=' border-none h-[2px] w-2/4 ml-[25%] bg-gray-700 hidden'/></NavLink>
      <NavLink to="/collection" className="no-underline hover:text-gray-500">COLLECTION<hr className=' border-none h-[2px] h-[1.5px] w-2/4 ml-[25%] bg-gray-700 hidden'/></NavLink>
      <NavLink to="/about" className="no-underline hover:text-gray-500">ABOUT<hr className=' border-none h-[2px] w-2/4 ml-[25%] bg-gray-700 hidden'/></NavLink>
      <NavLink to="/contact" className="no-underline hover:text-gray-500">CONTACT<hr className=' border-none h-[2px] w-2/4 ml-[25%] bg-gray-700 hidden'/></NavLink>
      </ul>
      <div className='flex gap-6 items-center'>
        <img onClick={()=>setshowsearch(true)}src={assets.search_icon} className='w-5 cursor-pointer'alt="" />
        <div className='group relative'>
          <img onClick={()=>token ? null :navigate('/login')} className=' w-5 cursor-pointer'src={assets.profile_icon}alt="" />
          {
            token&&
            <div className='group-hover:block right-0 pt-4 absolute hidden dropdown-menu'>
            <div className='flex flex-col gap-2 bg-slate-100 text-gray-400 py-2 px-5 rounde w-36'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
          }
        </div>
        <div>
            <Link to="/cart" className='relative'>
              <img src={assets.cart_icon} className='w-5 cursor-pointer' alt="" />
              <p className='absolute bottom-[-5px] right-[-5px] rounded-full bg-black w-4 h-4 top-2 text-center text-white text-[10px]'>{getcartcount()}</p>
            </Link>
          </div>
          <img onClick={()=>setvisible(true)} src={assets.menu_icon} className='cursor-pointer sm:hidden w-5  relative' alt=''/>
      </div>
      {/* for Mobile Menu */}
      <div className={`absolute top-0 right-0 bottom-0 bg-white overflow-hidden transition-all duration-300 ${visible? 'w-full':'w-0'}`}>
          <div className='text-[2rem] flex flex-col py-5 text-gray-700 '>
              <div className='flex gap-4 text-[2rem] gap-2 items-center ml-5 cursor-pointer'>
                <img src={assets.dropdown_icon} className='pt-2 rotate-180' alt=''/>
                <p onClick={()=>setvisible(false)}>Back</p>
              </div>
              <NavLink onClick={()=>{setvisible(false)}} className='border py-2 pl-5' to={'/'}>HOME</NavLink>
              <NavLink onClick={()=>{setvisible(false)}} className='border py-2 pl-5' to={'/collection'}>COLLECTION</NavLink>
              <NavLink onClick={()=>{setvisible(false)}} className='border py-2 pl-5' to={"/about"}>ABOUT</NavLink>
              <NavLink onClick={()=>{setvisible(false)}} className='border py-2 pl-5' to={"/contact"}>CONTACT</NavLink>
          </div>
      </div>
    </div> 
    
  ) 
}

export default Navbar;

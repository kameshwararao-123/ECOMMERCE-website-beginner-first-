import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const SearchBar = () => {
    const {search,setsearch,showsearch,setshowsearch}=useContext(ShopContext);
    const location=useLocation();
    const[visible,setvisible]=useState(false);
    useEffect(()=>{
        if(location.pathname.includes('collection')){
            setvisible(true)
        }
        else{
            setvisible(false);
        }
        
    },[location])
  return showsearch&&visible?(
        <div className="border-t border-b bg-gray-50 text-center">
        <div className="inline-flex justify-center items-center border-gray-400 px-5 py-2 mx-5 my-3 border rounded-full w-3/4 sm:w-1/2">
            <input 
            type="search" 
            placeholder="Search"
            value={search}
            onChange={(e) => setsearch(e.target.value)} 
            className="flex-1 outline-none bg-inherit text-sm"
            />
            <img src={assets.search_icon} alt="search" className="w-4"/>
        </div>

        <img 
            src={assets.cross_icon} 
            alt="close" 
            className="inline w-3 cursor-pointer" 
            onClick={() => setshowsearch(false)} 
        />
    </div>

  ):null
}

export default SearchBar

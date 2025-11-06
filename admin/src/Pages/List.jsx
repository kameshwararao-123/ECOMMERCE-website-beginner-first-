import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendurl } from '../App';
import { toast } from 'react-toastify';
const List = ({token}) => {
  const[list,setlist]=useState([]);
  const fetchproducts=async()=>{
    try {
      const response=await axios.get(`${backendurl}/api/product/listproducts`);
      if(response.data.success){
        setlist(response.data.products);
        
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    
  }
  const removeproduct=async(id)=>{
    try{
      const response=await axios.post(`${backendurl}/api/product/remove`,{id},{headers:{Authorization:`Bearer ${token}`}});
      
      if(response.data.success){
        toast.success(response.data.message);
        fetchproducts();
      }
      else{
        toast.error(response.data.message);
      }
    }
    catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }
  const currency='₹';
  useEffect(()=>{
    fetchproducts();
  },[]);
  
  return (
    <div>
      <p className='mb-2 text-base text-gray-600'>All Products List</p>
      <div className='flex flex-col gap-2 text-sm text-gray-600'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-100 px-3 py-1 border items-center text-sm border-gray-200 text-gray-600'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {/* list of products */}
        {
          list.map((item,index)=>(
            <div className=' border border-gray-200 grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center py-1 px-2' key={index}>
              <img  className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p className='text-right md:text-center cursor-pointer text-lg' onClick={()=>{removeproduct(item._id)}}>X</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default List

import React, { useEffect, useState } from 'react'
import Title from '../components/Title';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
const Orders = () => {
  const {currency,token,backendurl}=useContext(ShopContext);
  const[ordersdata,setordersdata]=useState([]);
  const getuserorders=async()=>{
    try {
      if(!token){
        return null;
      }
      const response=await axios.post(`${backendurl}/api/order/userorders`,{},{headers:{Authorization:`Bearer ${token}`}});
      
      if(response.data.success){
        let allorders=[];
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status;
            item['paymentMethod']=order.paymentMethod;
            item['payment']=order.payment;
            item['date']=order.date;
            allorders.push(item);
          })
        })
        console.log(allorders);
        
        setordersdata(allorders.reverse());
        
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    getuserorders();
  },[token])
  return (
    <div className='border-t pt-16 border-gray-200'>
      <div className='text-2xl'>
        <Title text1={"MY"} text2={"ORDERS"}/>
      </div>
      <div>
        {
          ordersdata.map((it,index)=>{
              return(
                <div  key={index} className='border-t border-b border-gray-300 text-gray-700 flex flex-col md:flex-row md:justify-between md:items-center gap-6'>
                    <div className='flex gap-2 text-sm items-start p-2'>
                      <img className='w-16 sm:w-20'src={it.image[0]} alt="" />
                      <div className='flex flex-col ml-3 text-sm'>
                          <p className='text-base font-medium'>{it.name}</p>
                          <div className='flex items-center gap-4 mt-1'>
                            <p className='text-lg'>{currency}{it.price}</p>
                            <p>Quantity: {it.quantity}</p>
                            <p>Size: {it.size}</p>
                          </div>
                          <p className='mt-1'>Date:<span className='text-gray-400'>{new Date(it.date).toDateString()}</span></p>
                          <p className='mt-1'>PaymentMethod:<span className='text-gray-400'>{it.paymentMethod}</span></p>
                      </div>
                    </div>
                    <div className='md:w-1/2 flex justify-between'>
                      <div className='flex items-center gap-2'>
                          <p className='min-w-2 h-2 rounded-full bg-green-400'></p>
                          <p>{it.status}</p>
                      </div>
                        <button className=' mr-2 text-sm border border-gray-200 buttonx-2 py-1 text-gray-400'>Track your order</button>
                      
                    </div>
                </div>
              )
          })
        }
      </div>
    </div>
  )
}

export default Orders

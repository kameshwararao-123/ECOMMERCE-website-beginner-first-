import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const Verify = () => {
    const{navigate,token,setcartitems,backendurl}=useContext(ShopContext);
    const[searchparams,setsearchparams]=useSearchParams();
    const success=searchparams.get('success');
    const orderId=searchparams.get('orderId');                  
    const verifypayment=async()=>{
        try {
            if(!token){
              return null;
            }
            const response=await axios.post(`${backendurl}/api/order/verifystripe`,{success,orderId},{headers:{Authorization:`Bearer ${token}`}});
            console.log(response); 
            
            if(response.data.success){
                setcartitems({});
                navigate('/orders');
            }else{
                navigate('/cart');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    
    useEffect(()=>{
      verifypayment();
    },[token])
  return (
    <div>
      
    </div>
  )
}

export default Verify

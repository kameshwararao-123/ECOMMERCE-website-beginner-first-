import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios'
import { toast } from 'react-toastify';
const Login = () => {
  const[state,setstate]=useState('Login');
  const[name,setname]=useState('');
  const[password,setpassword]=useState('');
  const[email,setemail]=useState('');
  const {token,settoken,navigate,backendurl}=useContext(ShopContext);
  const submithandler=async(e)=>{
    e.preventDefault();
    try {
      if(state==='Sign up'){
        const response=await axios.post(`${backendurl}/api/user/register`,{name,password,email});
        if(response.data.success){
          settoken(response.data.token);
          localStorage.setItem('token',response.data.token)
        }
        else{
          toast.error(response.data.message);
        }
        console.log(response);
        
      }
      else{
        const response=await axios.post(`${backendurl}/api/user/login`,{email,password});
        if(response.data.success){
          settoken(response.data.token);
          localStorage.setItem('token',response.data.token)
        }
        else{
          toast.error(response.data.message);
        }
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={submithandler}className='w-[90%] sm:max-w-96 flex flex-col items-center gap-4 mt-15 m-auto text-gray-800'>
        <div className='inline-flex items-center gap-2 mt-10 mb-4'>
          <p className='text-4xl prata-regular'>{state}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
        </div>
        {state==='Login'?'': <input onChange={(e)=>setname(e.target.value)} type="name" placeholder='Name' className='border border-gray-400 px-4 py-2 w-full' required />}
        <input onChange={(e)=>setemail(e.target.value)} type="eamil" placeholder='Email' className='border border-gray-400 px-3 py-2 w-full' required />
        <input onChange={(e)=>setpassword(e.target.value)}type="password" placeholder='Password' className='border border-gray-400 px-3 py-2 w-full' required />
        <div className='flex w-full justify-between text-sm mt-[-10px]'>
          <p>Forgot your password?</p>
          {
            state==='Login'
            ?<p onClick={()=>setstate('Sign up')} className='cursor-pointer'>Create an account</p>
            :<p onClick={()=>setstate('Login')} className='cursor-pointer'>Login Here</p>
          }
        </div>
        <button className='px-8 py-2 mt-4 items-center bg-black text-white'>{state==='Login'?'Sign In':'Sign Up'}</button>
    </form>
  )
}

export default Login

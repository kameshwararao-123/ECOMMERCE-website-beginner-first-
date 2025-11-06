import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendurl } from '../App';
import { toast } from 'react-toastify';
const Login = ({settoken}) => {
    const[email,setemail]=useState('');
    const[password,setpassword]=useState('');
    const subminhandler=async(e)=>{
        try {
            e.preventDefault();
            const response=await axios.post(`${backendurl}/api/user/admin`,{email,password});
            if(response.data.success){
              settoken(response.data.token);
            }
            else{
              toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
  return (
    <div className='min-h-screen flex justify-center items-center w-full'>
      <div className='bg-white shodow-md rounded-lg px-8 py-4 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        
            <form onSubmit={subminhandler}>
                <div className='mb-3 min-w-80'>
                    <p className='text-sm text-gray-800'>Email Address</p>
                    <input onChange={(e)=>setemail(e.target.value)} value={email} className='border rounded-md w-full bg-white  border-gray-200 px-6 py-2' type="email" name='email' placeholder='Enter eamil' />
                </div>
                <div className='mb-3 min-w-80'>
                    <p className='text-sm text-gray-800'>Password</p>
                    <input onChange={(e)=>setpassword(e.target.value)} value={password} className='border rounded-md w-full bg-white  border-gray-200 px-6 py-2' type="password" name='password' placeholder='Enter password' />
                </div>
                <button className='border border-gray-200 px-6 py-2 w-full bg-black text-white mt-4 rounded' type='submit'>Login</button>
            </form>
        
      </div>
    </div>
  )
}

export default Login

import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      <div>
        <img src={assets.logo} alt='' className='w-32 mb-5'/>
        <p className='w-full  md:w-2/3 text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem odio atque sapiente porro laborum voluptas, quisquam ex rem veniam dolor vero at beatae quod nihil consequatur sunt, et earum! Consectetur.
        </p>
      </div>
      <div>
        <p className='font-medium text-xl mb-5'>COMPANY</p>
        <ul className='text-gray-600 flex flex-col gap-1'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
        </ul>
      </div>
      <div>
        <p className='font-medium text-xl mb-5'>GET IN TOUCH</p>
        <ul className='text-gray-600 flex flex-col gap-1'>
            <li>+1-000-000-000</li>
            <li>rajudev@gamil.com</li>
            <li>instagram</li>
        </ul>
      </div>
        </div>
        <div>
        <hr className='text-gray-200'/>
        <p className='py-5 text-center text-sm'>Copyright 2024@ greatstack.dev - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer

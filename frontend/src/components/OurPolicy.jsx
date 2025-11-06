import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around items-center gap-2 py-20 sm:gap-12 text-xs sm:text-sm md:text-base text-center text-gray-700 '>
      <div>
            <img src={assets.exchange_icon} alt='' className='w-12 mb-5 m-auto'/>
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>We offer hassel free exchange policy</p>
      </div>
      <div>
            <img src={assets.quality_icon} alt='' className='w-12 mb-5 m-auto'/>
            <p className='font-semibold'>7 Days Return Policy</p>   
            <p className='text-gray-400'>We provide 7 days free return policy</p>
      </div>
      <div>
            <img src={assets.support_img} alt='' className='w-12 mb-5 m-auto'/>
            <p className='font-semibold'>Best Customer Support</p>
            <p className='text-gray-400'>We provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy

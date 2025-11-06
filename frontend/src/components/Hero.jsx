import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      <div className=' flex w-full sm:w-1/2 items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
                <div className='flex gap-2 items-center '>
                <p className='w-8 bg-black h-0.5 m-3'></p>
                <p className='font-medium text-sm'>OUR BESTSELLERS</p>
            </div>
            <h1 className='prata-regular text-3xl lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
            <div className='flex items-center font-semibold'>
                <p className='font-medium text-sm'>SHOP NOW</p>
                <p className='w-8 bg-black h-0.5 m-3'></p>
            </div>
        </div>
      </div>
          <img  className='w-full sm:w-1/2' src={assets.hero_img} alt=''/>
    </div>
  )
}

export default Hero

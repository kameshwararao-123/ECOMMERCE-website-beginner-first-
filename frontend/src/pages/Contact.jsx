import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
const Contact = () => {
  return (
    <div className='mt-2'>
      <hr className='border-gray-200'/>
      <div className='text-center text-2xl mt-10 font-medium'>
        <Title text1={"CONTACT"} text2={"US"}/>
      </div>
      <div className='flex flex-col md:flex-row gap-15 mt-6 pl-15 mb-30 justify-center'>
          <img className='sm:w-[500px] w-full'src={assets.contact_img} alt="" />
          <div className='mt-20 flex flex-col gap-6 justify-center'>
              <p className='text-gray-600 font-semibold text-xl'>Our Store</p>
              <p className='text-gray-500'>54709 Willms Station<br/>Suite 350, Washington, USA</p>
              <p className='text-gray-500'>Tel: (415) 555-0132<br/>Email: admin@forever.com</p>
              <p className='text-gray-600 font-semibold text-xl'>Careers at Forever</p>
              <p className='text-gray-600'>Learn more about our teams and job openings.</p>
              <button className='px-6 py-3 border w-1/2 hover:cursor-pointer hover:bg-black hover:text-white'>Explore Jobs</button>
          </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact

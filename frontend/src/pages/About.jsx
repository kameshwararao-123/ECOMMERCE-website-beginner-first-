import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className='mt-2'>
      <hr className='border-gray-200'/>
      <div className='text-center text-2xl mt-10 font-medium'>
        <Title text1={"ABOUT"} text2={"US"}/>
      </div>
      <div className='flex flex-col md:flex-row gap-15'>
        <img  className='w-full sm:max-w-[450px] mt-10'src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 mt-[-8px] text-gray-600 md:w-2/4'>
            <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
            <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
            <b>Our Mission</b>
            <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>
      <div className='mt-15 text-2xl font-medium'>
          <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>
      <div className='mt-4 mb-20 flex'>
          <div className=' flex flex-col gap-5 border border-gray-200 px-10 md:px-20 py-8 sm:py-18'>
              <b>Quality Assurance:</b>
              <p className='text-sm text-gray-500'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className=' flex flex-col gap-5 border border-gray-200 px-10 md:px-20 py-8 sm:py-18'>
              <b>Convenience:</b>
              <p className='text-sm text-gray-500'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className=' flex flex-col gap-5 border border-gray-200 px-10 md:px-20 py-8 sm:py-18'>
              <b>Exceptional Customer Service:</b>
              <p className='text-sm text-gray-500'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
      </div>
      <div className='mt-14 text-center'>
          <NewsletterBox/>
      </div>
    </div>
  )
}

export default About;

import React from 'react'

const NewsletterBox = () => {
    const onsubmithandler=(event)=>{
        event.preventDefault();
    }
  return (
    <div className='text-center'>
      <p className='font-medium text-2xl text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      <form onSubmit={onsubmithandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input type='eamil' placeholder='Enter Your Email' className='w-full sm:flex outline-none' required/>
        <button type='submit' className='text-white  bg-black text-sm px-10 py-3'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox

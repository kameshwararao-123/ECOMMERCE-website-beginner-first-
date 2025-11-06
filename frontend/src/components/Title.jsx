import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center'>
      <p className='text-gray-500'>{text1}<span className='text-gray-700 font-medium ml-2'>{text2}</span></p>
      <p className='w-10 h-[1px] bg-gray-800 sm:w-12 sm:h-[2px]'></p>
    </div>
  )
}

export default Title

import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
    const {currency,delivery_fee,gettotalamount,navigate}=useContext(ShopContext);
  return (
    <div className='w-full'>
        <div className='flex flex-col gap-2 '>
        <div className='font-medium text-2xl mb-4'>
            <Title text1={'CART'} text2={'TOTALS'}/>
        </div>
        <div className='flex justify-between '>
            <p className='text-sm text-gray-600'>Subtotal</p>
            <p>{currency}{gettotalamount()}.00</p>
        </div>
        <hr/>
        <div className='flex justify-between '>
            <p className='text-sm text-gray-600'>Shipping Fee</p>
            <p>{currency}{delivery_fee}.00</p>
        </div>
        <hr />
        <div className='flex justify-between text-sm font-bold'>
            <p>Total</p>
            <p>{currency}{gettotalamount()===0?0:gettotalamount()+delivery_fee}.00</p>
        </div>

       </div>
    </div>
  )
}

export default CartTotal

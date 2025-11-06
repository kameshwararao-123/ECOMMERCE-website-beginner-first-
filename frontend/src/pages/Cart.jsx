import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

function Cart() {
  const { products, cartitems, currency, updatequantity, gettotalamount, navigate } = useContext(ShopContext);
  const [cartdata, setcartdata] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      let tempdata = [];
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) {
            tempdata.push({
              _id: items,  
              size: item,
              quantity: cartitems[items][item]
            })
          }
        }
      }
      setcartdata(tempdata);
    }
  }, [cartitems, products]);
  return (
    <div>
      <hr className='border-gray-200' />
      <div className='mt-15 text-xl sm:text-2xl md:text-3xl ml-2 font-medium'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <hr className='border-gray-200 mt-10' />
      <div>
        {
          cartdata.map((it, index) => {
            const thing = products.find((sm) => sm._id === it._id);

            return <div key={index} className='py-3 border-gray-200 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] items-center sm:grid-cols-[4fr_2fr_1fr]'>
              <div className='flex items-start gap-6'>
                <img src={thing.image[0]} alt="" className='w-16 sm:w-20' />
                <div className='felx felx-col gap-3'>
                  <p className='font-semibold text-sm'>{thing.name}</p>
                  <div className='flex gap-4 mt-2 items-center'>
                    <p className='font-medium'>{currency}{thing.price}</p>
                    <button className='border bg-gray-200 py-1 px-2'>{it.size}</button>
                  </div>
                </div>
              </div>
              <input onChange={(e) => e.target.val === '' || e.target.value === '0' ? null : updatequantity(it._id, it.size, Number(e.target.value))} type='number' min={1} value={it.quantity} className='border max-w-10 sm:max-w-20 pl-2 text-center' />
              <img onClick={() => updatequantity(it._id, it.size, 0)} className='w-5 text-center cursor-pointer' src={assets.bin_icon} alt="" />
            </div>
          })
        }
      </div>
      <div className='ml-[70%] mt-20'>
        <CartTotal />
        <div className='text-end w-full mt-2'>
          <button onClick={() => navigate('/place-order')} className='ml-5 sm:30  text-sm border font-medium bg-black text-white px-4 py-2 mt-2 ml-[30%]'>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Cart

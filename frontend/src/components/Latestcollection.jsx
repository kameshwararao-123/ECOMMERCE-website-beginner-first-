import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
const Latestcollection = () => {
    const {products}=useContext(ShopContext);
    const {currency}=useContext(ShopContext);
    const [latestproducts,setlatestproducts]=useState([]);
    useEffect(()=>{
       setlatestproducts(products.slice(2,12));
    },[products])
  return (
    <div className= 'my-10'>
      <div className='py-8 text-center text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'}/> 
        <p className='w-3/4 m-auto text-sm text-gray-600 pt-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
      </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5 text-gray-600 text-sm'>
          {latestproducts.map((item,index) => (
          <ProductItem
            key={index}   // use unique key instead of index
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default Latestcollection

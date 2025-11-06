import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const BestSellers = () => {
    const {products}=useContext(ShopContext);
    const [bestproducts,setbestproducts]=useState([]); 
    useEffect(()=>{
        const best=products.filter((item)=>(item.bestseller));
        setbestproducts(best.slice(0,5));
    },[products])
    
  return (
    <div className='my-10'>
      <div className='py-8 text-center text-3xl'>
            <Title text1={"BEST"} text2={"SELLERS"}/>
            <p className='text-sm'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 gap-y-5'>
        {
            bestproducts.map((item,index)=>{
                return (
                <ProductItem 
                    key={index} 
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                />
                )
            })
        }
      </div>
    </div>
  )
}

export default BestSellers

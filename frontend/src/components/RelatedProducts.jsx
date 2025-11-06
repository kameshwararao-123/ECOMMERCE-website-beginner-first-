import React, { useContext, useEffect,useState} from 'react'
import Title from './Title'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem'
import Product from '../pages/Product';
const RelatedProducts = ({Category,subCategory}) => {
    const {products}=useContext(ShopContext);
    const [relatedproducts,setrelatedproducts]=useState([]);
    useEffect(()=>{
        if(products.length>0){
            let copyproducts=products.slice();
            copyproducts=copyproducts.filter((item)=>item.Category===Category);
            copyproducts=copyproducts.filter((item)=>item.subCategory===subCategory);
            setrelatedproducts(copyproducts.slice(0,5));
        }  
    },[products]);
  return (
    <div className='mt-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1='RELATED' text2='PRODUCTS'/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-4'>
        {
            relatedproducts.map((item,index)=>{
                return(
                    <div key={index}>
                        <ProductItem
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                        />
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default RelatedProducts

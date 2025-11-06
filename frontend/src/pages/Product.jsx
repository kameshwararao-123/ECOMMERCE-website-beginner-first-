import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
const Product = () => {
  const {productId}=useParams();
  const {products,addtocart}=useContext(ShopContext);
  const [productdata,setproductdata]=useState(false);
  const [Image,setImage]=useState('');
  const {currency}=useContext(ShopContext);
  const[size,setsize]=useState('');
  const fetchproduct=async ()=>{
    const pro=products.find(item=>item._id===productId);
    if (!pro) return;
    setImage(pro.image[0]);
    setproductdata(pro);
    
  }
  useEffect(()=>{
    if (products.length > 0) {
      fetchproduct();
    }
  },[productId]);
  if (!productdata) {
  return <div>Loading...</div>;
  }
  return productdata?(
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* ------------------------product data ---------------*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* ---------------------product images --------------*/}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
              <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productdata.image.map((item, index) => (
                  <img
                    src={item}
                    key={index}
                    className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                    alt=""
                    onClick={() => setImage(item)}  // ✅ allow selecting image
                  />
                ))
              }
            </div>
            <div className='flex-1'>
                <img src={Image} alt="" className='w-full'/>
            </div>
        </div>
        {/* --------------------product data --------------*/}
        <div className='flex-1'>
            <h1 className='font-medium mt-2 text-2xl'>{productdata.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                <p className='pl-auto'>(122)</p>
            </div>
            <p className='mt-5 font-bold text-3xl items-center'>{currency}{productdata.price}</p>
            <p className='text-gray-500 mt-5 md:w-4/5 text-sm'>{productdata.description}</p>
            <div className='flex flex-col gap-4 m8-5'>
              <p className='text-base'>Select Size</p>
              <div className='flex gap-2'>
                {
                  productdata.sizes.map((item,index)=>(
                        <button onClick={()=>setsize(item)} className={`border border-gray-200 px-4 py-2 bg-gray-100 ${item=== size?'border-orange-500':''}`} key={index}>{item}</button>
                  ))
                }
              </div>
            </div>
             <button onClick={()=>addtocart(productdata._id,size)} className='bg-black text-white py-3 px-8 text-sm  active:bg-gray-800 mt-5'>
              ADD TO CART
              </button>
              <hr className='border-gray-200 mt-8 sm:w-4/5'/> 
              <div className='flex flex-col gap-2 text-sm mt-4 text-gray-500'>
                <p>100% Original product.</p>
                <p>Cash on delivery is available on this product.</p>
                <p>Easy return and exchange policy within 7 days.</p>
              </div>
        </div>
      </div>
      {/* ----------description&review section------- */}
      <div className='mt-20'>
          <div className='flex '>
              <b className='border border-gray-200 py-3 px-6 text-sm'>Description</b>
              <p className='border border-gray-200 py-3 px-6 text-sm'>Reviews(122)</p>
          </div>
          <div className='flex flex-col gap-4 text-gray-500 text-sm border px-6 py-4 border-gray-200'>
            <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
            <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
          </div>
      </div>
      {/* ------------for related products-------------- */}
      <RelatedProducts Category={productdata.Category} subCategory={productdata.subCategory}/>
    </div>
  ):<div className='opacity-0'></div>
}

export default Product

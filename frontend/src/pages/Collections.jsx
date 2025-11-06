import React ,{useState,useEffect}from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
const Collections = () => {
  const {products}=useContext(ShopContext);
  const [showfilter,setshowfilter]=useState(false);
  const [filteredproducts,setfilteredproducts]=useState([]);
  const [category,setcategory]=useState([]);
  const [subcategory,setsubcategory]=useState([]);
  const{search,showsearch}=useContext(ShopContext);
  const toggelcategory=(e)=>{
      if(category.includes(e.target.value)){
        setcategory(prev=>prev.filter(item=>item!==e.target.value));
      }
      else{
        setcategory(prev=>[...prev,e.target.value]);
      }
  }
  const toggelsubcategory=(e)=>{
      if(subcategory.includes(e.target.value)){
        setsubcategory(prev=>prev.filter(item=>item!==e.target.value));
      }
      else{
        setsubcategory(prev=>[...prev,e.target.value]);
      }
  }
  const appyfilter=()=>{
    let productscopy=products.slice();
    if(search&&showsearch){
      productscopy=products.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(category.length>0){
      productscopy=productscopy.filter(item=>category.includes(item.category));
    }
    if(subcategory.length>0){
      productscopy=productscopy.filter(item=>subcategory.includes(item.subCategory));
    }
    setfilteredproducts(productscopy);
  }
  const sorttypeproducts=(order)=>{
    let sortproducts=filteredproducts.slice();
    if(order=="Low-High"){
      sortproducts=sortproducts.sort((a,b)=>a.price-b.price);
    }
    if(order=="High-Low"){
      sortproducts=sortproducts.sort((a,b)=>b.price-a.price);
    }
    setfilteredproducts(sortproducts);
  }
 useEffect(()=>{
      appyfilter(); 
  },[category,subcategory,search,showsearch,products])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* for filter */}
      <div className='min-w-60'>
        <p onClick={()=>{setshowfilter(!showfilter)}} className=' flex text-xl items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showfilter?'rotate-90':''}`} alt="" />
        </p>
        {/* category */}
      <div className= {`border border-gray-300 pl-5 py-3 mt-5 ${showfilter?'':'hidden'} sm:block `}>
        <p className='text-sm font-medium text-center text-black w-10'>CATEGORIES</p>
        <div className='flex flex-col gap-2 font-light mt-2'>
          <div className='flex gap-1 text-sm text-gray-700'>
            <input type="checkbox" className='w-3' value={'Men'} onChange={toggelcategory}/>
            <p>Men</p>
          </div>
          <div className='flex gap-1 text-sm text-gray-600'>
            <input type="checkbox" className='w-3' value={'Women'} onChange={toggelcategory}/>
            <p>Women</p>
          </div>
          <div className='flex gap-1 text-sm text-gray-600'>
            <input type="checkbox" className='w-3' value={'Kids'} onChange={toggelcategory}/>
            <p>Kids</p>
          </div>
        </div>
      </div>
      <div className= {`border border-gray-300 pl-5 py-3 mt-5 ${showfilter?'':'hidden'} sm:block `}>
        <p className='text-sm font-medium text-center text-black w-10'>TYPE</p>
        <div className='flex flex-col gap-2 font-light mt-2'>
          <div className='flex gap-1 text-sm text-gray-700'>
            <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggelsubcategory}/>
            <p>Topwear</p>
          </div>
          <div className='flex gap-1 text-sm text-gray-600'>
            <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggelsubcategory}/>
            <p>Bottomwear</p>
          </div>
          <div className='flex gap-1 text-sm text-gray-600'>
            <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggelsubcategory}/>
            <p>Winterwear</p>
          </div>
        </div>
      </div>
      </div>
      {/* RIGHT CONTENT */}
      <div className='flex-1'>
        <div className='flex justify-between items-center text-base mb-4 sm:text-2xl'>
          <Title text1="ALL" text2="COLLECTIONS" className/>
          <select onChange={(e)=>sorttypeproducts(e.target.value)}className='border-2 border-black text-sm px-2 py-1 rounded'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="Low-High">Sort by: Low → High</option>
            <option value="High-Low">Sort by: High → Low</option>
          </select>
        </div>
        {/* map collections */}
        <div className='grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-6 gap-4'>
            {
              filteredproducts.map((item,index)=>{
                 return <div key={index}>
                  <ProductItem
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  />
                  </div>
              })
            }
        </div>
      </div>
    </div>
  )
}

export default Collections

import React from 'react'
import { assets } from '../assests/assets'
import { useState } from 'react'
import axios from 'axios'
import { backendurl } from '../App'
import { toast } from 'react-toastify'
const Add = ({token}) => {
  const [image1, setimage1] = useState(false)
  const [image2, setimage2] = useState(false)
  const [image3, setimage3] = useState(false)
  const [image4, setimage4] = useState(false)
  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [category, setcategory] = useState("Men");
  const [subCategory, setsubCategory] = useState("Topwear");
  const [price, setprice] = useState('');
  const [sizes, setsizes] = useState([]);
  const [bestseller, setbestseller] = useState(false);
  const onsubmithandler=async(e)=>{
    e.preventDefault();
    try {
      const formdata=new FormData();
      formdata.append('name',name);
      formdata.append('description',description);
      formdata.append('category',category);
      formdata.append('subCategory',subCategory);
      formdata.append('price',price);
      formdata.append('sizes',JSON.stringify(sizes));
      formdata.append('bestseller',bestseller);

      image1 && formdata.append('image1',image1);
      image2 && formdata.append('image2',image2);
      image3 && formdata.append('image3',image3);
      image4 && formdata.append('image4',image4);
      const response=await axios.post(`${backendurl}/api/product/add`,formdata,{headers: { Authorization: `Bearer ${token}` }
});   
      if(response.data.success){
        toast.success(response.data.message);
        setname('');
        setdescription('');
        setimage1(false);
        setimage2(false);
        setimage3(false);
        setimage4(false);
        setprice('');
      }
      else{
        toast.error(response.data.message);
      }
    } 
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  return (
    <form onSubmit={onsubmithandler} className='text-base text-gray-600 flex flex-col gap-4 w-full' >

      <div>
        <p className='text-base text-gray-600'>Upload Image</p>
        <div className='flex items-center justify-start gap-4'>
          <label htmlFor='image1'>
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setimage1(e.target.files[0])} type="file" id="image1" className='hidden' />
          </label>
          <label htmlFor='image2'>
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setimage2(e.target.files[0])} type="file" id="image2" className='hidden' />
          </label>
          <label htmlFor='image3'>
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setimage3(e.target.files[0])} type="file" id="image3" className='hidden' />
          </label>
          <label htmlFor='image4'>
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setimage4(e.target.files[0])} type="file" id="image4" className='hidden' />
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setname(e.target.value)} type="text" value={name} placeholder='Type here' className='w-full py-1 px-4 max-w-[500px] rounded' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setdescription(e.target.value)} type="text" value={description} placeholder='Write content here' className='w-full py-2 px-4 max-w-[500px] rounded' required />
      </div>
      <div className=' flex flex-col w-full sm:flex-row gap-6 items-center'>
        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={(e) => setcategory(e.target.value)} className='w-full max-w-[150px] rounded py-1 px-3 ' required>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Sub category</p>
          <select onChange={(e) => setsubCategory(e.target.value)} className='w-full max-w-[150px] rounded py-1 px-3 ' required>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product price</p>
          <input onChange={(e) => setprice(e.target.value)} type="number" value={price} placeholder='Enter price' className='w-full max-w-[150px] rounded py-1 px-3 ' required />
        </div>
      </div>
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex items-center gap-3 align-center'>
          <div onClick={()=>setsizes(prev=>prev.includes('S')?prev.filter(size=>'S'!==size):[...prev,'S'])}>
            <p className={`${sizes.includes('S')? 'bg-pink-100':'bg-slate-200'} px-3 py-1 text-center cursor-pointer`}>S</p>
          </div>
          <div onClick={()=>setsizes(prev=>prev.includes('M')?prev.filter(size=>'M'!==size):[...prev,'M'])}>
            <p className={`${sizes.includes('M')? 'bg-pink-100':'bg-slate-200'} px-3 py-1 text-center cursor-pointer`}>M</p>
          </div> 
          <div onClick={()=>setsizes(prev=>prev.includes('L')?prev.filter(size=>'L'!==size):[...prev,'L'])}>
            <p className={`${sizes.includes('L')? 'bg-pink-100':'bg-slate-200'} px-3 py-1 text-center cursor-pointer`}>L</p>
          </div>
          <div onClick={()=>setsizes(prev=>prev.includes('XL')?prev.filter(size=>'XL'!==size):[...prev,'XL'])}>
            <p className={`${sizes.includes('XL')? 'bg-pink-100':'bg-slate-200'} px-3 py-1 text-center cursor-pointer`}>XL</p>
          </div>
          <div onClick={()=>setsizes(prev=>prev.includes('XXL')?prev.filter(size=>'XXL'!==size):[...prev,'XXL'])}>
            <p className={`${sizes.includes('XXL')? 'bg-pink-100':'bg-slate-200'} px-3 py-1 text-center cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
        <input onChange={()=>setbestseller(prev=>!prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label htmlFor="bestseller" className='cursor pointer'> Add to bestseller</label>
      </div>
      <button type="submit" className='text-center text-white mt-4 border px-4 py-3 bg-black w-full max-w-30'>ADD</button>
    </form>
  )
}

export default Add

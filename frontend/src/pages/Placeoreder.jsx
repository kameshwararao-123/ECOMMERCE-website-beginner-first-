import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const Placeoreder = () => {
  const [method, setmethod] = useState('cod');
  const { navigate, backendurl, token, cartitems, setcartitems, gettotalamount, delivery_fee, products } = useContext(ShopContext);
  const [formdata, setformdata] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setformdata(data => ({ ...data, [name]: value }));
  }
  const initpay=(order)=>{
    const options={
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount * 100,
      currency:"INR",
      name:"order payment",
      description:"order payment",
      order_id:order.id,
      receipt: order.receipt,
      handler:async(response_razor)=>{
        console.log(response_razor);
        console.log('Razorpay key:', import.meta.env.VITE_RAZORPAY_KEY_ID);

        try {
          const {data}=await axios.post(`${backendurl}/api/order/verifyrazorpay`,response_razor,{headers:{Authorization:`Bearer ${token}`}});
          
          if(data.success){
            console.log('Navigating to /orders');
            setcartitems({});
            navigate('/orders');
            
          }
          else{
            navigate('/cart');
            toast.error(data.message);
          }
          
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
        
      }
    }
    const rzp=new window.Razorpay(options);
    rzp.open();
  }
  const onsubmithandler = async(e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) {
            const iteminfo = structuredClone(products.find((it) => it._id === items));
            if (iteminfo) {
              iteminfo.size = item;
              iteminfo.quantity = cartitems[items][item];
              orderItems.push(iteminfo);
            }
          }
        }
      }
      let orderdata = {
        address: formdata,
        items: orderItems,
        amount: gettotalamount() + delivery_fee
      }
      switch (method) {
        case 'cod':
          const response = await axios.post(`${backendurl}/api/order/cod`,orderdata, { headers: { Authorization: `Bearer ${token}` } });
          if(response.data.success){
            setcartitems({});
            navigate('/orders');
          }
          else{
            toast.error(response.data.message);
          }
          break;
        case 'stripe':
          const responseStripe=await axios.post(`${backendurl}/api/order/stripe`,orderdata,{headers:{Authorization:`Bearer ${token}`}});
          if(responseStripe.data.success){
            const {session_url}=responseStripe.data;
            window.location.replace(session_url);
          }
          else{
            toast.error(responseStripe.data.message);
          }

          break;
        case 'razorpay':
          
          const responseRazor=await axios.post(`${backendurl}/api/order/razorpay`,orderdata,{headers:{Authorization:`Bearer ${token}`}});   
          if(responseRazor.data.success){
            initpay(responseRazor.data.order);
            toast.success('order placed successfully, redirecting to payment gateway');
            navigate('/orders');
            setcartitems({});
          }
          else{
            toast.error(responseRazor.data.message);
          }
          break;
        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  return (
    <form onSubmit={onsubmithandler}>
      <hr className='border-gray-200 mt-2' />
      <div className='sm:text-2xl font-medium mt-15'>
        <Title text1={'DELIVERY'} text2={"INFORMATION"} />
      </div>
      <div className='mt-5 flex gap-4'>
        <div className='felx-col gap-4'>
          <div className='flex flex gap-3 '>
            <input required onChange={handlechange} value={formdata.firstname} type="text" placeholder='First name' name='firstname' className='border rounded border-gray-200 px-4 py-1' />
            <input required onChange={handlechange} value={formdata.lastname} type="text" placeholder='Last name' name='lastname' className='border rounded border-gray-200 px-4 py-1' />
          </div>
          <input required onChange={handlechange} value={formdata.email} type="email" name='email' placeholder='Email address' className='border rounded border-gray-200 px-4 py-1 w-full mt-4' />
          <input required onChange={handlechange} value={formdata.street} type="text" name='street' placeholder='Street' className='border rounded border-gray-200 px-4 py-1 w-full mt-4' />
          <div className='flex flex gap-3 mt-4'>
            <input required onChange={handlechange} value={formdata.city} type="text" placeholder='City' name='city' className='border rounded border-gray-200 px-4 py-1' />
            <input required onChange={handlechange} value={formdata.state} type="text" placeholder='State' name='state' className='border rounded border-gray-200 px-4 py-1' />
          </div>
          <div className='flex flex gap-3 mt-4'>
            <input required onChange={handlechange} value={formdata.zipcode} type="number" placeholder='zipcode' name='zipcode' className='border rounded border-gray-200 px-4 py-1' />
            <input required onChange={handlechange} value={formdata.country} type="text" placeholder='Country' name='country' className='border rounded border-gray-200 px-4 py-1' />
          </div>
          <input required onChange={handlechange} value={formdata.phone} type="number" name='phone' placeholder='Phone' className='border rounded border-gray-200 px-4 py-1 w-full mt-4' />
        </div>
        <div className='flex-col w-full ml-15'>
          <div className='mt-2'>
            <CartTotal />
          </div>
          <div className='font-medium text-xl mt-8'>
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>
          <div className='lg:flex-row gap-3 flex flex-col mt-4 w-full'>
            <div onClick={() => setmethod('stripe')} className='flex items-center border border-gray-200 px-3 p-2 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setmethod('razorpay')} className='flex items-center border border-gray-200 px-3 p-2 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setmethod('cod')} className='flex items-center border gap-2 wrap border-gray-200 px-3 p-2 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-sm h-5 font-medium text-gray-500'>CASH ON DELIVERY</p>
            </div>

          </div>
          <div className='ml-[30%] mt-8 text-end mr-2'>
            <button type='submit' className='border bg-black text-white cursor-pointer px-6 py-2'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Placeoreder

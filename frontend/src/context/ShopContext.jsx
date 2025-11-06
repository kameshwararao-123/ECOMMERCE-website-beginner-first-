import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { createContext } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export const ShopContext = createContext();
const ShopContextProvider = ({ children }) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [products, setproducts] = useState([]);
  const [search, setsearch] = useState('');
  const [showsearch, setshowsearch] = useState(false);
  const [cartitems, setcartitems] = useState({});
  const [token, settoken] = useState('');
  const navigate = useNavigate();

  const addtocart = async (itemId, size) => {
    let cartdata = structuredClone(cartitems);
    if (!size) {
      toast.error('Select Product Size');
      return;
    }
    if (cartdata[itemId]) {
      if (cartdata[itemId][size]) {
        cartdata[itemId][size] += 1;
      }
      else {
        cartdata[itemId][size] = 1;
      }
    }
    else {
      cartdata[itemId] = {};
      cartdata[itemId][size] = 1;
    }
    setcartitems(cartdata);
    if (token) {
      try {
        await axios.post(`${backendurl}/api/cart/add`, { itemId, size }, { headers: { Authorization: `Bearer ${token}` } });

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }
  const getproducts = async () => {
    try {
      const response = await axios.get(`${backendurl}/api/product/listproducts`);
      if (response.data.success) {
        setproducts(response.data.products);
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  useEffect(() => {
    getproducts()
  }, []);
  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      settoken(localStorage.getItem('token'));
      getusercart(localStorage.getItem('token'));
    }
  }, [])
  const getcartcount = () => {
    let totalcount = 0;
    for (const items in cartitems) {
      for (const item in cartitems[items]) {
        try {
          if (cartitems[items][item] > 0) {
            totalcount += cartitems[items][item];
          }
        } catch (error) {

        }
      }
    }
    return totalcount;
  }
  const gettotalamount = () => {
    let totalamount = 0;
    for (const items in cartitems) {
      const iteminfo = products.find((it) => it._id === items);
      for (const item in cartitems[items]) {
        try {
          if (cartitems[items][item] > 0) {
            totalamount += cartitems[items][item] * iteminfo.price;
          }
        } catch (error) {

        }
      }
    }
    return totalamount;
  }
  const getusercart = async (token) => {
    try {
      const response = await axios.post(`${backendurl}/api/cart/get`, {}, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) {
        setcartitems(response.data.cartdata);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const updatequantity = async (itemId, size, quantity) => {
    let cartdata = structuredClone(cartitems);
    cartdata[itemId][size] = quantity;
    setcartitems(cartdata);
    if (token) {
      try {
        await axios.post(
          `${backendurl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }
  const val = {
    currency,
    delivery_fee,
    products,
    search, setsearch, showsearch, setshowsearch,
    addtocart, cartitems,setcartitems,getcartcount, updatequantity, gettotalamount, navigate, backendurl,
    token, settoken
  };
  return (
    <div>
      <ShopContext.Provider value={val}>
        {children}
      </ShopContext.Provider>
    </div>
  )
}

export default ShopContextProvider

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';
import Razorpay from 'razorpay';
import dotenv from "dotenv";
import e from "express";
dotenv.config();

//global variables...
const currency = 'inr';
const deliverycharge = 10;
//GATEWAY INTIALIZATION
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayinstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
//placing order using cod
const placeOrderCod = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderdata = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "cod",
      payment: false,
      date: new Date()
    }
    const neworder = new orderModel(orderdata);
    await neworder.save();
    await orderModel.findByIdAndUpdate(userId, { cartdata: {} });
    res.json({ success: true, message: "order placed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
//verify stripe
const verifyStripe = async (req, res) => {
  const { orderId, userId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartdata: {} });
      res.json({ success: true, })
    }
    else {
      await orderModel.findByIdAndUpdate(orderId);
      res.json({ success: false, })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
//verify razorpay payment
const verifyRazorpay=async(req,res)=>{
  try {
    const{userId,razorpay_order_id}=req.body;
    const orderinfo=await razorpayinstance.orders.fetch(razorpay_order_id);
    if(orderinfo.status==="paid"){
      await orderModel.findByIdAndUpdate(orderinfo.receipt,{payment:true});
      await userModel.findByIdAndUpdate(userId,{cartdata:{}});
      res.json({success:true, message:"payment verified successfully"});
    }
    else{
      res.json({success:false, message:"payment not verified"});
    }
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


//placeorder using razorpay
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    // Use frontend URL from env


    const orderdata = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: new Date(),
    };

    const neworder = new orderModel(orderdata);
    await neworder.save();

    const options={
      amount:amount*100,
      currency:currency.toUpperCase(),
      receipt:neworder._id.toString(),
    }
    await razorpayinstance.orders.create(options,(error,order)=>{
      if(error){
        console.log(error);
        return res.json({success:false,message:"something went wrong"});
      }
      res.json({success:true,order});
    })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//placeorder using stripe
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    // Use frontend URL from env


    const orderdata = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: new Date(),
    };

    const neworder = new orderModel(orderdata);
    await neworder.save();

    // Convert cart items to Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100, // in paise/cents
      },
      quantity: item.quantity,
    }));

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: currency,
        product_data: { name: "Delivery Charges" },
        unit_amount: deliverycharge * 100,
      },
      quantity: 1,
    });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${neworder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${neworder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//all orders data for admin panel
const allorders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}
//get order by id for user
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
//update order status by admin
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "status updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}

export { verifyRazorpay,verifyStripe, placeOrderCod, placeOrderRazorpay, placeOrderStripe, allorders, userOrders, updateOrderStatus };
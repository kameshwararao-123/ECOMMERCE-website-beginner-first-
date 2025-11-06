import express from 'express';
import {verifyStripe,placeOrderCod,placeOrderRazorpay,placeOrderStripe,allorders,userOrders,updateOrderStatus} from '../controllers/orderController.js';
import adminauth from '../middleware/adminAuth.js';
import authuser from '../middleware/auth.js';
const orderrouter = express.Router();

//admin features
orderrouter.post('/list',adminauth,allorders);
orderrouter.post('/status',adminauth,updateOrderStatus);


///payment methods
orderrouter.post('/cod',authuser,placeOrderCod);
orderrouter.post('/razorpay',authuser,placeOrderRazorpay);
orderrouter.post('/stripe',authuser,placeOrderStripe);
//veruify stripe payment
orderrouter.post('/verifystripe',authuser,verifyStripe);
orderrouter.post('/verifyrazorpay',authuser,verifyStripe);
//user featuresc 
orderrouter.post('/userorders',authuser,userOrders);

export default orderrouter;
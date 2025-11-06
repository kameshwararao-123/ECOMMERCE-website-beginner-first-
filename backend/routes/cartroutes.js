import express from 'express'
import { addtocart,updatercart,getcartdata } from '../controllers/cartController.js'
import authuser from '../middleware/auth.js';
const cartrouter=express.Router()

cartrouter.post('/add',authuser,addtocart);
cartrouter.post('/update',authuser,updatercart);
cartrouter.post('/get',authuser,getcartdata);

export default cartrouter;
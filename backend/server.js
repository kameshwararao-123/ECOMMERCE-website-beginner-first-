import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose';
import connectcloudinary from './config/cloudinary.js';
import userroutes from './routes/userroutes.js'
import productRouter from './routes/productroutes.js';
import cartrouter from './routes/cartroutes.js';
import orderrouter from './routes/orderroutes.js';
//app config
const app=express();
const port=process.env.PORT || 4000
//mongodb connection.....
mongoose.connect(`${process.env.MONGO_URL}/e-commers`)
.then(()=>console.log("db connected"))
.catch(err => console.error("❌ Connection error:", err))
connectcloudinary()
//middlewares
app.use(express.json())
app.use(cors())
//end point
app.use('/api/user',userroutes)
app.use('/api/product',productRouter)
app.use('/api/cart',cartrouter)
app.use('/api/order',orderrouter)
app.get('/',(req,res)=>{
    res.send("its working...")
})

//server 
app.listen(port,()=>console.log('server started successfully with :'+port)
)
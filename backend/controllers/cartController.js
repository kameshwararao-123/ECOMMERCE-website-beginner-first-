import userModel from "../models/userModel.js";

//add products to user cart
const addtocart=async(req,res)=>{
    try {
        const {userId,itemId,size}=req.body;
        const userdata=await userModel.findById(userId);
        let cartdata = userdata.cartdata || {};
        if(cartdata[itemId]){
            if(cartdata[itemId][size]){
                cartdata[itemId][size]+=1
            }
            else{
                cartdata[itemId][size]=1;
            }
        }
        else{
            cartdata[itemId]={};
            cartdata[itemId][size]=1;
        }
        await userModel.findByIdAndUpdate(userId,{cartdata});
        res.json({success:true,message:'added to cart'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}


//updater cart
const updatercart=async(req,res)=>{
    try {
        const {userId,itemId,size,quantity}=req.body;
        const userdata=await userModel.findById(userId);
        if (!userdata) return res.json({ success: false, message: "User not found" });
        // console.log(userdata.cartdata);
        
        let cartdata=userdata.cartdata||{};
        cartdata[itemId][size]=quantity;
        // console.log("after update",cartdata);
        
        await userModel.findByIdAndUpdate(userId,{cartdata});
        res.json({success:true,message:'added to cart'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

//get user cart
const getcartdata=async(req,res)=>{
    try {
        const{userId}=req.body;
        const userdata=await userModel.findById(userId);
        let cartdata=userdata.cartdata;
        res.json({success:true,cartdata:cartdata||{}});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}
export {addtocart,updatercart,getcartdata}
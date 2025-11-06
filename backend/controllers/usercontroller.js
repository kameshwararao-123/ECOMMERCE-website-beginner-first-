import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const createToken=(id)=>{
    return jwt.sign({id},process.env.SECRET_KEY);
}
const registerUser = async (req, res) => {
    try {
        const {name,email,password}=req.body;
        const existuser=await userModel.findOne({email});
        if(existuser){
            return res.json({success:false, message:"already user exist with eamil"});
        }
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"enter a valid eamil"});
        }
        if(password.length<8){
            return res.json({success:false, message:"enter strong password"});
        }
        const hashpass=await bcrypt.hash(password,10);

        const newuser=new userModel({
            name,email,password:hashpass
        })
        const user=await newuser.save();
        const token=createToken(user._id);
        return res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
};

const loginUser = async (req, res) => {
    try {
        const{email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user does not exist"});
        }
        const ismatch=await bcrypt.compare(password,user.password);
        if(ismatch){
            const token=createToken(user._id);
            res.json({success:true,token});
        }
        else{
            res.json({success:false,message:"invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
};

const adminUser = async (req, res) => {
    try {
        const {email,password}=req.body;
        if((email===process.env.ADMIN_EMAIL) && (password===process.env.ADMIN_PASSWORD)){
            const token=jwt.sign({email},process.env.SECRET_KEY);
            res.json({success:true,token});
        }
        else{
            res.json({success:false,message:"Invalid credentials"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
};

export { loginUser, registerUser, adminUser };

import jwt from 'jsonwebtoken';

const adminAuth=(req,res,next)=>{
    try {
        const authHeader = req.headers['authorization'];   // "Bearer <token>"
        const token = authHeader && authHeader.split(' ')[1];

        if(!token){
            return res.json({success:false,message:"unauthorized access"});
        }
        const verifyuser=jwt.verify(token,process.env.SECRET_KEY);
        if(verifyuser.email!==process.env.ADMIN_EMAIL){
            return res.json({success:false,message:"unauthorized access"});
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}
export default adminAuth;
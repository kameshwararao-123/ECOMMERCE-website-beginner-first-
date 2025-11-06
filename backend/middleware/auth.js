import jwt from 'jsonwebtoken'


const authuser=async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.json({ success: false, message: "No token, authorization denied" });
    }
    const token=authHeader.split(" ")[1];
    if(!token){
        return res.json({success:false,message:"Not authorized login again"});
    }
    try {
        const token_decode=jwt.verify(token,process.env.SECRET_KEY);
        req.body.userId=token_decode.id;
        next()
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
export default authuser;
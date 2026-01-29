import jwt from 'jsonwebtoken';
const userAuth = async (req, res, next) => {
  const {token} = req.headers; // extract token from the request headers 
  if(!token){
    return res.json({success:false,message:"Not authorized login again"})
  }
  // jwt_secret is use for in .env file will take the value and inject it 
  try{
       const tokenDecode = jwt.verify(token,process.env.JWT_SECRET) // will verify 
       if(tokenDecode.id){   // can view the data 
        req.body.userId = tokenDecode.id  // verify karne ke baad token decode hogaya
        // userId mai verify token save kardo 
       }else{
        return res.json({success:false,message:"Not authorized login again"})
       }
       next() // next() is used in middleware to pass control to the next middleware or route handler in the request–response cycle.
  }catch(error){
     res.json({success:false,message:error.message}) 
  }
};
export default userAuth;

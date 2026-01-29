import dotenv from "dotenv";
dotenv.config(); 
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4001
console.log("Mongo URI:", process.env.MongoDb_URI);
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
                      
      "https://image-text-1-1ck8.onrender.com" // deployed frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);
await connectDB(); // doubt why await 

app.use('/api/user',userRouter);
app.use('/api/image',imageRouter);

app.get('/',(req,res)=>res.send("API working fine"));

app.listen(PORT,()=>console.log('server running on port ' + PORT));
console.log("Razorpay Key:", process.env.RAZORPAY_KEY_ID , process.env.RAZORPAY_KEY_SECRET);

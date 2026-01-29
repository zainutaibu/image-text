import mongoose from "mongoose";

const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log("Database Connected : Imagify")
    }) // will display the msg 
    await mongoose.connect(`${process.env.MongoDb_URI}/IMAGIFY`)
}

export default connectDB;
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true, 
        unique:true
    },
    password : {type:String,
        required:true
    },
    creditBalance : {
        type : Number,
        default:5
    }
})
// if it is new user the create the model name user 
// and if its exits then donot create it again and again 
const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;
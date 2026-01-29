import mongoose from "mongoose";

const transactionSchema =new mongoose.Schema({
     userId : {
        type: String,
        required : true
     },
     plan : {
        type: String,
        required : true
     },
     amount : {
        type: Number,
        required : true
     },
    credits : {
        type: Number,
        required : true
     },
    payment : {
        type: Boolean,
        default : false
     },
     date : {
        type:Number
     }
})

// first will seach for the model and then if not found will create the model 
const transactionModel = mongoose.model.transaction || mongoose.model("Transaction",transactionSchema)

export default transactionModel
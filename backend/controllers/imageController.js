import userModel from "../models/userModel.js"
import FormData from "form-data"// ye ek class hai jo multipart/form-data body banane ke liye use hoti hai.
//Hum ise use kar rahe hain ClipDrop API ko form format me data bhejne ke liye (like a web form).
import axios from "axios"


export const generateImage = async(req,res) =>{
    try {
        const {userId,prompt} = req.body
        const user = await userModel.findById(userId)
        if(!user || !prompt){
            return res.json({success : false,message:"Missing details"})
        }
        if(user.creditBalance === 0){
            return res.json({success : false , message :"No credit Balance", creditBalance : user.creditBalance})
        }
        const formData = new FormData() // it is using for senting the prompt to the clipDrop API into form format 
        formData.append('prompt',prompt)
        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
             headers: {
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType:'arraybuffer'  // img will come in binary form not in text 
        })
        const base64Image = Buffer.from(data,"binary").toString('base64') // will convert the img into base64 string format (readable )
        const resultImage = `data:image/png;base64,${base64Image}` // img url 

        await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance - 1})
        res.json({success:true , message : "Image Generated", creditBalance:user.creditBalance-1 , resultImage})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    const salt = await bcrypt.genSalt(10);  // genSalt(10) adds randomness (salt) for extra security.
    const hashedPassword = await bcrypt.hash(password, salt);  // hash(password, salt) creates a secure hashed version of the password.
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    // sign is use for creating jwt 
    //  process.env.JWT_SECRET process.env.JWT_SECRET app ka private secret hai jo JWT tokens ko sign aur verify karne ke liye use hota hai — isse token ki authenticity aur integrity ensure hoti hai.”
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);  // generating this so that after registation the user can redierct to the page // avoid login again 
    res.json({
      success: true,
      token,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// send the remaining credits to the login user  
const userCredits = async (req, res) => {
  try {
    const { userId } = req.body; // frontend sends the Id when asking for credit  
    const user = await userModel.findById(userId);
    res.json({
      success: true,
      credits: user.creditBalance, // create the new field credits and the value will be coming from user DB 
      user: { name: user.name },  
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// 🔹 Razorpay setup
// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });
// console.log("Razorpay keys:", process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);

// 🔹 Payment controller
const paymentRazorpay = async (req, res) => {
    const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
    });
   //console.log("Razorpay keys:", process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);
  try {
    const { userId, planId } = req.body;
    if (!userId || !planId) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) return res.json({ success: false, message: "User not found" });

    let plan, credits, amount;
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advance";
        credits = 500;
        amount = 50;
        break;
      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;
      default:
        return res.json({ success: false, message: "Invalid plan" });
    }
    const newTransaction = await transactionModel.create({
      userId,
      plan,
      amount,
      credits,
      date: Date.now(),
    });

    const options = {
      amount: amount * 100, // razorpay works in paise not rupess = 100 paise / 1 rupees, 10rupees/1000paise  
      currency: process.env.CURRENCY || "INR",
      receipt: newTransaction._id.toString(),
    };
// by calling razorpay api will actually create an order  
// razorpay par new order create karega 
// frontend use for openning the razorpay checkout 
    const order = await razorpayInstance.orders.create(options); 
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//verifyRazorpay function checks if the Razorpay payment was successful, and if yes, it updates the user’s credit balance and marks the transaction as paid.
const verifyRazorpay = async(req,res) =>{
  const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
    try {

        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if(orderInfo.status === "paid"){
            const transactionData = await transactionModel.findById(orderInfo.receipt)

            
      // Agar ye transaction pehle hi paid hai to dobara credit na add karein
            if(transactionData.payment){
                return res.json({success : false,message : "Payment failed"})
            }

            const userData = await userModel.findById(transactionData.userId)

            const creditBalance = userData.creditBalance + transactionData.credits

            await userModel.findByIdAndUpdate(userData._id, {creditBalance})

            await transactionModel.findByIdAndUpdate(transactionData._id, {payment : true})

              res.json({ success: true, message: "Credits Added" });
        }else {
            res.json({ success: false, message: "Payment failed" });
        }
        
    } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    }
}

export { registerUser, loginUser, userCredits, paymentRazorpay , verifyRazorpay};

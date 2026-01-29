import React, { useContext, useEffect, useState } from 'react'
import { assets} from '../assets/assets'
import { AppContext } from '../Context/AppContext';
import { motion } from 'motion/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const {setShowLogin,setToken,backendUrl,setUser} = useContext(AppContext);
    const [state,setState] = useState('Login');
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (e) => {
    e.preventDefault(); 
    try {
        if (state === "Login") {
            // extracting the data part from the from the backend in the url all the things will be printed  
            const {data}  = await axios.post(backendUrl + '/api/user/login', { email, password });
            // we can destructure it and then we can print it inside console 
            //console.log(data)
           if (data.success) {
                setToken(data.token); 
                setUser(data.user); // userController from the backend 
                localStorage.setItem('token', data.token);
                setShowLogin(false);
                // console.log("Login successful!");
                // console.log("Token:", data.token);
                // console.log("User data:", data.user);
            } else {
                toast.error(data.message);
            }
        } else {
            const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });

            if (data.success) {
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('token', data.token);
                setShowLogin(false);

                // console.log("✅ Registration successful!");
                // console.log("Token:", data.token);
                // console.log("User data:", data.user);
            } else {
                toast.error(data.message);
            }
        }
    } catch (error) {
        console.error(" Login/Register error:", error);
        toast.error(error.message);
    }
};
    useEffect(()=>{
        // lock scrolling
        document.body.style.overflow = 'hidden'; // when clicking on login only te login popup should come and will disable the scroll bar 
       // clean up function to remove the disableness 
       // unlock scrolling 
        return () => {
            document.body.style.overflow = 'unset';
        }
    },[])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
     <motion.form 
     initial={{opacity:0.2,y:50}}
    transition={{duration:0.3}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}} className='relative bg-white p-10 rounded-xl text-slate-500' onSubmit={onSubmitHandler}>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        {/* // registration  */}
        {/* <p>Welcome back! Please sign in to continue</p> */}
        {state !== 'Login' 
        && 
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
            <img src={assets.email_icon} alt=''/>
            <input type='text' placeholder='full name' className='outline-non text-sm'
            onChange={e => setName(e.target.value)} value={name}
            required/> 
        </div>}

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.email_icon} alt=''/>
            <input type='email' placeholder='Email' className='outline-non text-sm' 
            onChange={e => setEmail(e.target.value)} value={email}
            required/> 
        </div>

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.lock_icon} alt=''/>
            <input type='password' placeholder='Password' className='outline-non text-sm' 
            onChange={e => setPassword(e.target.value)} value={password}
            required/> 
        </div>

        <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password ?</p>

        <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state === 'Login' ? "Login" : "Create an Account"}</button>
        
        {state === "Login" ? <p className='mt-3 text-center'>Don't have an account? 
            <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign Up')}>Sign up</span></p>
           :
        <p className='mt-5 text-center'>Already have an account? 
            <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Login')}>Login</span></p>    
        }
      <img src={assets.cross_icon} onClick={()=>setShowLogin(false)} alt='' className='absolute top-5 right-5 cursor-pointer'/>
     </motion.form>
    </div>
  )
}

export default Login

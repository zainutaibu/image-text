import React, { useContext } from 'react';
import {assets} from '../assets/assets'; // compo se nikalkar assest mai jaraha h aur assets mai saari images store h  
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const Navbar = () => {

  const {user,setShowLogin,logout,credit}= useContext(AppContext);

   // null empty means user is logout and true means user is login 
    const navigate = useNavigate(); // we use this to navigate from one compo to another without using the link tag programmatically
   // link using the event 
    return (
    <div className='flex items-center justify-between py-4'>
{/* // link is use for navigation withour page reload  */}
     <Link to="/">
     <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40'/>
    </Link>
    <div>
        {/* if the user is login then first div will work otherwise second div will work  */}
        
        {
        user? 
        (
        <div className='flex items-center gap-2 sm:gap-3'>

            <button className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full
            hover:scale-105 transition-all duration-700' onClick={()=>navigate('/buy')}>

                <img src={assets.credit_star} alt="" className='w-5'/>

                <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits left : {credit}</p>
            </button>

            <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>
            <div className='relative group'>
                <img src={assets.profile_icon} className='w-10 drop-shadow-2xl' alt='img'/>
                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                  <ul className='list-none m-0 p-2 bg--white rounded-md border text-sm'>
                    <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                  </ul>
                </div>
            </div>
        </div> 
        )
        :  
        (
        <div className='flex items-center gap-2 sm:gap-5'>
            <p className='cursor-pointer' onClick={()=>navigate('/buy')}>Pricing</p>
            <button className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full' onClick={()=>setShowLogin(true)}>Login</button>
        </div>
        )
        }
    </div>
    </div>
  )
}

export default Navbar

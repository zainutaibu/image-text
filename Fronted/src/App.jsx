import React, { useContext } from 'react'
import Home from './Pages/Home';
import Result from './Pages/Result';
import BuyCredit from './Pages/BuyCredit';
import { Routes , Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Components/Login';
import { AppContext } from './Context/AppContext';
  import { ToastContainer} from 'react-toastify';

const App = () => {
  const {showLogin} = useContext(AppContext);
  return (

    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen
    bg-gradient-to-b from-teal-50 to-orange-50'>     {/* gradient color top-to-bottom upar se niche white and orange  */}

{/* Routes is a container for route
route will take path and element 
path mai / dalke default mai dalte h 
element mai component ka naam aayega 
if component and path both will match then it will render on that page  */}
      <ToastContainer position='bottom-right'/>
      <Navbar/> {  /*the navbar will be on the all the pages*/}
      {showLogin && <Login/>}
      <Routes> 
      <Route path='/' element={<Home/>}/>
      <Route path='/result' element={<Result/>}/>
      <Route path='/buy' element={<BuyCredit/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App

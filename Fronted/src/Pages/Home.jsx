import React from 'react'
import Header from '../Components/Header'
import Steps from '../Components/Steps'
import Description from '../Components/Description'
import Testimonials from '../Components/Testimonials'
import GenerateButton from '../Components/GenerateButton'

const Home = () => {
  return (
    <div>
     <Header/>
     <Steps/>
     <Description/>
     <Testimonials/>
     <GenerateButton/>
    </div>
  )
}

export default Home

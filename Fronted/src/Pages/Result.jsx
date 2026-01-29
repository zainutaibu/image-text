import React, { use, useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';

const Result = () => {
  const [image,setImage] = useState(assets.sample_img_1);
  const [isImageLoaded ,setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input,setInput] = useState('');

  const {generateImage} = useContext(AppContext)

  const onSubmitHandler = async (e) =>{
    e.preventDefault()
    setLoading(true)
    if(input){
      const image = await generateImage(input)
      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }

  const handleDownload = () => {
  try {
    // Convert base64 string to byte characters
    const base64Data = image.split(",")[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });

    // Create a temporary download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "generated_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (err) {
    console.error("Download failed:", err);
  }
};
  return (
    <motion.form
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}} onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'>
    <div>
     <div className='relative'>
      <img src={image} alt='' className='max-w-sm rounded '/>
     <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`}></span>
     </div>

     <p className={!loading ? "hidden" : ""}>Loading........</p>
    </div>
 {/* isImageLoaded === false */}
 {!isImageLoaded && 
    <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
      <input type='text' value={input} 
      onChange={(e)=> setInput(e.target.value)}  placeholder='Describe what you wnat to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color'/>
      <button type='submit'
      className='bg-zinc-900 px-10 sm:px-16 py-4 rounded-full'>Generate</button>
    </div>
}

{/* isImageLoaded === true */}
{isImageLoaded && 
    <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
      <p className='bg-transparent border border-ainc-900 text-black px-8 py-3 rounded-full cursor-pointer' 
      onClick={() => setIsImageLoaded(false)}>Generate Another</p>
      <p
  className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
  onClick={handleDownload}
>
  Download
</p>


    </div>
}
    </motion.form>
  )
}

export default Result

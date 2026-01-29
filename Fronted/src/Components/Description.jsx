import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="px-5 sm:px-8 md:px-10 lg:px-20"
    >
      {/* Heading */}
      <div className="text-center mb-10 md:mb-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
          Create AI Images
        </h1>
        <p className="text-base sm:text-lg text-gray-700">
          Turn your imagination into visuals
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
        {/* Image */}
        <img
          src={assets.sample_img_1}
          alt="sample"
          className="w-full max-w-[300px] sm:max-w-[400px] md:w-80 xl:w-96 rounded-lg object-cover"
        />

        {/* Text */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium max-w-lg mb-4">
            Introducing the AI-Powered Text to Image Generator
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-3 leading-relaxed">
            Easily bring your ideas to life with our free AI image generator.
            Whether you need stunning visuals or unique imagery, our tool
            transforms your text into eye-catching images with just a few
            clicks. Imagine it, describe it and watch it come to life instantly.
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            Easily bring your ideas to life with our free AI image generator.
            Whether you need stunning visuals or unique imagery, our tool
            transforms your text into eye-catching images with just a few
            clicks. Imagine it, describe it and watch it come to life instantly.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default Description

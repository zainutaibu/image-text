import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'motion/react'

const Testimonials = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center my-20 py-12 px-4"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2 text-center">
        Customer testimonials
      </h1>
      <p className="text-gray-500 mb-12 text-center">What Our Users Are Saying</p>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/20 p-8 md:p-10 rounded-lg shadow-md cursor-pointer hover:scale-[1.02] transition-all"
          >
            <div className="flex flex-col items-center">
              <img
                src={testimonial.image}
                alt=""
                className="rounded-full w-14"
              />
              <h2 className="text-xl font-semibold mt-3">{testimonial.name}</h2>
              <p className="text-gray-500 mb-4">{testimonial.role}</p>

              <div className="flex mb-4">
                {Array(testimonial.stars)
                  .fill()
                  .map((item, index) => (
                    <img key={index} src={assets.rating_star} alt="" className="w-5" />
                  ))}
              </div>

              <p className="text-center text-sm text-gray-600">
                {testimonial.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonials

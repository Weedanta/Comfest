"use client";
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Testimonial } from '../../types/home.types'

interface TestimonialsSectionProps {
  data: Testimonial[];
  loading?: boolean;
  error?: string | null;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ data, loading, error }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  } as const

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  } as const

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span 
        key={i} 
        className={`text-2xl ${i < rating ? 'text-secondary-700' : 'text-neutral-300'}`}
      >
        ⭐
      </span>
    ));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="mycontainer">
          <div className="text-center mb-16">
            <div className="h-12 bg-white/20 rounded w-96 mx-auto mb-4 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="mycontainer text-center">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-white">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-700 text-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
      
      <div className="mycontainer relative">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="text-secondary-300">Customers Say</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Real stories from real people who transformed their eating habits with SEA Catering
          </p>
        </motion.div>

        {/* Desktop: Grid Layout */}
        <motion.div 
          className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {data.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* Stars */}
              <div className="flex justify-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Message */}
              <p className="text-white/90 text-center mb-6 leading-relaxed italic">
                "{testimonial.message}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold">
                  {getInitials(testimonial.customerName)}
                </div>
                <div className="text-center">
                  <div className="font-semibold text-white">
                    {testimonial.customerName}
                  </div>
                  {testimonial.profession && (
                    <div className="text-sm text-white/70">
                      {testimonial.profession}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: Carousel Layout */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-sm mx-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stars */}
              <div className="flex justify-center mb-4">
                {renderStars(data[currentIndex]?.rating || 0)}
              </div>

              {/* Message */}
              <p className="text-white/90 text-center mb-6 leading-relaxed italic">
                "{data[currentIndex]?.message}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold">
                  {getInitials(data[currentIndex]?.customerName || '')}
                </div>
                <div className="text-center">
                  <div className="font-semibold text-white">
                    {data[currentIndex]?.customerName}
                  </div>
                  {data[currentIndex]?.profession && (
                    <div className="text-sm text-white/70">
                      {data[currentIndex]?.profession}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <motion.button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ←
            </motion.button>
            <motion.button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              →
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {data.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-xl text-white/90 mb-6">
            Ready to join our satisfied customers?
          </p>
          <motion.button 
            className="bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold hover:bg-neutral-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
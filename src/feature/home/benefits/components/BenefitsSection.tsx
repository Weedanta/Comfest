"use client";
import React from 'react'
import { motion } from 'framer-motion'
import { HomeBenefit } from '../../types/home.types'

interface BenefitsSectionProps {
  data: HomeBenefit[];
  loading?: boolean;
  error?: string | null;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ data, loading, error }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2
      }
    }
  } as const

  const itemVariants = {
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

  if (loading) {
    return (
      <section className="py-20 bg-neutral-100">
        <div className="mycontainer">
          <div className="text-center mb-16">
            <div className="h-12 bg-neutral-300 rounded w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-neutral-300 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="w-24 h-24 bg-neutral-300 rounded-full mx-auto mb-6 animate-pulse"></div>
                <div className="h-6 bg-neutral-300 rounded w-48 mx-auto mb-4 animate-pulse"></div>
                <div className="h-16 bg-neutral-300 rounded w-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-neutral-100">
        <div className="mycontainer text-center">
          <div className="bg-danger-100 border border-danger-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-danger-700">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-neutral-100">
      <div className="mycontainer">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Why Choose <span className="text-secondary-700">SEA Catering</span>?
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Discover what makes us the preferred choice for healthy meal delivery across Indonesia
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {data.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              className="text-center group"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Icon */}
              <motion.div 
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-4xl">{benefit.icon}</span>
              </motion.div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-secondary-700 transition-colors">
                {benefit.title}
              </h3>
              
              <p className="text-neutral-600 leading-relaxed max-w-sm mx-auto">
                {benefit.description}
              </p>

              {/* Decorative Line */}
              <motion.div 
                className="w-16 h-1 bg-secondary-700 rounded-full mx-auto mt-6"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-lg">
            <h3 className="text-3xl font-bold text-neutral-900 mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-xl text-neutral-600 mb-6">
              Join thousands of satisfied customers who have transformed their eating habits with SEA Catering
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-secondary-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-secondary-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
              </motion.button>
              <motion.button 
                className="border-2 border-secondary-700 text-secondary-700 px-8 py-4 rounded-xl font-semibold hover:bg-secondary-700 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BenefitsSection
"use client";
import React from 'react'
import { Button } from '@/shared/components/ui/Button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HomeHero } from '../../types/home.types'

interface HeroSectionProps {
  data: HomeHero;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  } as const

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  } as const

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  } as const

  const statsVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 1.2,
        ease: "easeOut"
      }
    }
  } as const

  const StatItem = ({ value, label, delay }: { value: number; label: string; delay: number }) => (
    <motion.div 
      className="text-center min-w-0 flex-1"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-secondary-700 mb-1"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay }}
      >
        {value}+
      </motion.div>
      <div className="text-xs sm:text-sm text-neutral-400 leading-tight px-1">
        {label}
      </div>
    </motion.div>
  );

  return (
    <motion.section 
      className='flex flex-col justify-center items-center lg:items-start text-white w-full lg:w-1/2 px-4 sm:px-6 lg:px-0'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-4 sm:space-y-4 w-full max-w-lg lg:max-w-none text-center lg:text-left font-sans">
        {/* Main Heading */}
        <motion.h1 
          className='text-4xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight '
          variants={itemVariants}
        >
          <span className="text-white block">Healthy Meals,</span>
          <motion.span 
            className="text-secondary-700 block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Anytime,
          </motion.span>
          <span className="text-white block">Anywhere</span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          className='text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300 leading-relaxed max-w-md lg:max-w-lg mx-auto lg:mx-0'
          variants={itemVariants}
        >
          {data.subtitle}
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 w-full max-w-md lg:max-w-none mx-auto lg:mx-0">
          <motion.div variants={buttonVariants} whileHover="hover" className="w-full sm:w-auto flex-1 sm:flex-none">
            <Link href={data.primaryCTA.href} className="w-full block">
              <Button 
                variant="primary" 
                className="w-full sm:w-48 md:w-56 h-12 sm:h-14 text-base sm:text-lg md:text-xl font-semibold"
              >
                {data.primaryCTA.text}
              </Button>
            </Link>
          </motion.div>
          <motion.div variants={buttonVariants} whileHover="hover" className="w-full sm:w-auto flex-1 sm:flex-none">
            <Link href={data.secondaryCTA.href} className="w-full block">
              <Button 
                variant="secondary" 
                className="w-full sm:w-48 md:w-56 h-12 sm:h-14 text-base sm:text-lg md:text-xl font-semibold"
              >
                {data.secondaryCTA.text}
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Key Stats */}
        <motion.div 
          className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 pt-4 sm:pt-6 justify-center lg:justify-start max-w-sm lg:max-w-none mx-auto lg:mx-0"
          variants={statsVariants}
        >
          <StatItem 
            value={data.stats.citiesCovered} 
            label="Cities Covered" 
            delay={1.5} 
          />
          <StatItem 
            value={data.stats.happyCustomers} 
            label="Happy Customers" 
            delay={1.7} 
          />
          <StatItem 
            value={data.stats.yearsExperience} 
            label="Years Experience" 
            delay={1.9} 
          />
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HeroSection
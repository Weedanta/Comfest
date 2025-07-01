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
      className="text-center"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="text-2xl font-bold text-secondary-700"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay }}
      >
        {value}+
      </motion.div>
      <div className="text-sm text-neutral-400">{label}</div>
    </motion.div>
  );

  return (
    <motion.section 
      className='flex flex-col justify-center items-start font-sans text-white w-full md:w-1/2'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-6">
        {/* Main Heading */}
        <motion.h1 
          className='text-4xl md:text-6xl font-bold leading-tight'
          variants={itemVariants}
        >
          <span className="text-white">Healthy Meals,</span>
          <br />
          <motion.span 
            className="text-secondary-700"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Anytime,
          </motion.span>
          <br />
          <span className="text-white">Anywhere</span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          className='text-lg md:text-xl text-neutral-300 max-w-lg leading-relaxed'
          variants={itemVariants}
        >
          {data.subtitle}
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-4 pt-4">
          <motion.div variants={buttonVariants} whileHover="hover">
            <Link href={data.primaryCTA.href}>
              <Button variant="primary" size="normal">
                {data.primaryCTA.text}
              </Button>
            </Link>
          </motion.div>
          <motion.div variants={buttonVariants} whileHover="hover">
            <Link href={data.secondaryCTA.href}>
              <Button variant="secondary" size="normal">
                {data.secondaryCTA.text}
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Key Stats */}
        <motion.div 
          className="flex gap-8 pt-6"
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
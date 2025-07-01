"use client";
import React from "react";
import HeroSection from "../components/HeroSection";
import Image from "next/image";
import { motion } from "framer-motion";
import { HomeHero } from "../../types/home.types";
import HeroImage from "@/assets/img/home/hero-picture.png";

interface HeroContainerProps {
  data: HomeHero;
}

const HeroContainer: React.FC<HeroContainerProps> = ({ data }) => {
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut",
      },
    },
  } as const;

  const floatingElementVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 1.2,
        ease: "easeOut",
      },
    },
  } as const;

  return (
    <main className=" w-full bg-neutral-800">
    <section className="min-h-screen w-full flex flex-col mycontainer lg:flex-row justify-between items-center   py-20 lg:py-0 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary-700/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Hero Content */}
      <HeroSection data={data} />

      {/* Hero Image */}
      <motion.div
        className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center lg:justify-end relative"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={HeroImage}
              alt="SEA Catering - Healthy Meals"
              className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto lg:mx-0 relative z-10"
              width={500}
              height={400}
              priority
            />
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="absolute -top-4 -left-4 w-20 h-20 bg-secondary-700 rounded-full opacity-20 z-20"
            variants={floatingElementVariants}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary-500 rounded-full opacity-30 z-20"
            variants={floatingElementVariants}
            animate={{
              y: [0, 10, 0],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute top-1/2 -right-8 w-12 h-12 bg-tertiary-600 rounded-full opacity-25 z-20"
            variants={floatingElementVariants}
            animate={{
              x: [0, 5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-700/20 to-primary-500/20 rounded-2xl blur-xl -z-10"></div>
        </div>
      </motion.div>
    </section>
    </main>
  );
};

export default HeroContainer;

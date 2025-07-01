"use client";
import React from "react";
import HeroContainer from "../hero/container/HeroContainer";
import MealPlansSection from "../meal-plans/components/MealPlansSection";
import BenefitsSection from "../benefits/components/BenefitsSection";
import TestimonialsSection from "../testimonials/components/TestimonialSection";
import { useHomeData } from "../hooks/useHomeData";
import { motion } from "framer-motion";

const LoadingScreen = () => (
  <div className="min-h-screen bg-neutral-800 flex items-center justify-center">
    <motion.div 
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-16 h-16 border-4 border-secondary-700 border-t-transparent rounded-full mx-auto mb-4"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <h2 className="text-2xl font-bold text-white mb-2">
        <span className="text-secondary-700">SEA</span> Catering
      </h2>
      <p className="text-neutral-300">Loading your healthy meal experience...</p>
    </motion.div>
  </div>
);

const ErrorScreen = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="min-h-screen bg-neutral-800 flex items-center justify-center">
    <motion.div 
      className="text-center max-w-md mx-auto p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-16 h-16 bg-danger-500 rounded-full mx-auto mb-6 flex items-center justify-center">
        <span className="text-white text-2xl">⚠️</span>
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">
        Oops! Something went wrong
      </h2>
      <p className="text-neutral-300 mb-6">{error}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button
          onClick={onRetry}
          className="bg-secondary-700 text-white px-6 py-3 rounded-lg hover:bg-secondary-800 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
        <motion.button
          onClick={() => window.location.href = '/'}
          className="border border-secondary-700 text-secondary-700 px-6 py-3 rounded-lg hover:bg-secondary-700 hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go Home
        </motion.button>
      </div>
    </motion.div>
  </div>
);

const HomePageContainer = () => {
  const { data, loading, error, refetch } = useHomeData();

  // Show loading screen while fetching data
  if (loading) {
    return <LoadingScreen />;
  }

  // Show error screen if critical error and no fallback data
  if (error && !data) {
    return <ErrorScreen error={error} onRetry={refetch} />;
  }

  // Show content with data (either real or fallback)
  if (!data) {
    return <ErrorScreen error="No data available" onRetry={refetch} />;
  }

  return (
    <motion.main 
      className="min-h-screen scroll-smooth"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Error Banner - Show if there was an error but we have fallback data */}
      {error && (
        <motion.div 
          className="bg-danger-500 text-white text-center py-2 px-4 text-sm"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span>Some content may not be up to date. </span>
          <button 
            onClick={refetch}
            className="underline hover:no-underline ml-1"
          >
            Refresh page
          </button>
        </motion.div>
      )}

      {/* Hero Section */}
      <HeroContainer data={data.hero} />
      
      {/* Meal Plans Section */}
      <MealPlansSection 
        data={data.mealPlans} 
        loading={false}
        error={null}
      />
      
      {/* Benefits Section */}
      <BenefitsSection 
        data={data.benefits}
        loading={false}
        error={null}
      />
      
      {/* Testimonials Section */}
      <TestimonialsSection 
        data={data.testimonials}
        loading={false}
        error={null}
      />

      {/* Final CTA Section */}
      <motion.section 
        className="py-20 bg-neutral-800 text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mycontainer text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to Start Your <span className="text-secondary-700">Healthy Journey</span>?
          </motion.h2>
          <motion.p 
            className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join thousands of satisfied customers across Indonesia who have transformed 
            their eating habits with SEA Catering. Start your subscription today!
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button 
              className="bg-secondary-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-secondary-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/subscription'}
            >
              Start Subscription
            </motion.button>
            <motion.button 
              className="border-2 border-secondary-700 text-secondary-700 px-8 py-4 rounded-xl font-semibold hover:bg-secondary-700 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/menu'}
            >
              Explore Menu
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </motion.main>
  );
};

export default HomePageContainer;
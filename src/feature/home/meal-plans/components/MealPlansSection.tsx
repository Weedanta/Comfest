"use client";
import React from "react";
import { Button } from "@/shared/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { MealPlan } from "../../types/home.types";

interface MealPlansSectionProps {
  data: MealPlan[];
  loading?: boolean;
  error?: string | null;
}

const MealPlansSection: React.FC<MealPlansSectionProps> = ({
  data,
  loading,
  error,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  } as const;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPlanColorScheme = (category: string) => {
    switch (category) {
      case "diet":
        return {
          gradient: "from-primary-500 to-primary-700",
          bgColor: "bg-primary-100",
          textColor: "text-primary-700",
          badgeColor: "bg-primary-500",
        };
      case "protein":
        return {
          gradient: "from-secondary-500 to-secondary-700",
          bgColor: "bg-secondary-100",
          textColor: "text-secondary-700",
          badgeColor: "bg-secondary-500",
        };
      case "royal":
        return {
          gradient: "from-tertiary-600 to-tertiary-700",
          bgColor: "bg-tertiary-100",
          textColor: "text-tertiary-700",
          badgeColor: "bg-tertiary-600",
        };
      default:
        return {
          gradient: "from-neutral-500 to-neutral-700",
          bgColor: "bg-neutral-100",
          textColor: "text-neutral-700",
          badgeColor: "bg-neutral-500",
        };
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="mycontainer">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Our <span className="text-secondary-700">Meal Plans</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-neutral-200 rounded-2xl h-96 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="mycontainer text-center">
          <div className="bg-danger-100 border border-danger-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-danger-700 mb-4">{error}</p>
            <Button
              variant="primary"
              size="small"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
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
            Our <span className="text-secondary-700">Meal Plans</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Choose the perfect meal plan that fits your lifestyle and health
            goals
          </p>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {data.map((plan) => {
            const colors = getPlanColorScheme(plan.category);

            return (
              <motion.div
                key={plan.id}
                className="bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 relative group"
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className={`${colors.badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                    >
                      Popular
                    </span>
                  </div>
                )}

                {/* Card Header */}
                <div
                  className={`bg-gradient-to-r ${colors.gradient} p-6 text-white relative overflow-hidden`}
                >
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold">
                      {formatPrice(plan.price)}
                      <span className="text-lg font-normal opacity-90">
                        /meal
                      </span>
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div
                          className={`w-5 h-5 ${colors.bgColor} ${colors.textColor} rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold`}
                        >
                          ✓
                        </div>
                        <span className="text-neutral-700 text-sm">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <Link href={`/subscription?plan=${plan.id}`}>
                    <Button
                      variant="secondary"
                      size="normal"
                      className="w-full group-hover:scale-105 transition-transform"
                      style={{
                        borderColor: colors.textColor,
                        color: colors.textColor,
                        backgroundColor: "transparent",
                        border: "2px solid",
                      }}
                    >
                      Choose {plan.name}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-8 flex w-full justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/menu">
            <Button variant="tertiary" size="large">
              View All Plans
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MealPlansSection;

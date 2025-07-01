"use client";
import { useState, useEffect } from 'react';
import { HomeData, ApiResponse, MealPlan, Testimonial, HomeBenefit, HomeHero } from '../types/home.types';

export const useHomeData = () => {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Mock API calls - replace with actual API endpoints
        const [heroResponse, plansResponse, benefitsResponse, testimonialsResponse] = await Promise.allSettled([
          fetchHeroData(),
          fetchMealPlans(),
          fetchBenefits(),
          fetchTestimonials()
        ]);

        const hero = heroResponse.status === 'fulfilled' ? heroResponse.value : getDefaultHero();
        const mealPlans = plansResponse.status === 'fulfilled' ? plansResponse.value : getDefaultPlans();
        const benefits = benefitsResponse.status === 'fulfilled' ? benefitsResponse.value : getDefaultBenefits();
        const testimonials = testimonialsResponse.status === 'fulfilled' ? testimonialsResponse.value : getDefaultTestimonials();

        setData({
          hero,
          mealPlans,
          benefits,
          testimonials
        });
      } catch (err) {
        console.error('Error fetching home data:', err);
        setError('Failed to load page data. Please refresh the page.');
        // Set default data as fallback
        setData({
          hero: getDefaultHero(),
          mealPlans: getDefaultPlans(),
          benefits: getDefaultBenefits(),
          testimonials: getDefaultTestimonials()
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return { data, loading, error, refetch: () => window.location.reload() };
};

// Mock API functions - replace with actual API calls
const fetchHeroData = async (): Promise<HomeHero> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    title: "Healthy Meals, Anytime, Anywhere",
    subtitle: "Experience premium customizable healthy meal plans delivered fresh across Indonesia. Start your journey to better health today.",
    primaryCTA: {
      text: "Start Subscription",
      href: "/subscription"
    },
    secondaryCTA: {
      text: "View Menu",
      href: "/menu"
    },
    stats: {
      citiesCovered: 50,
      happyCustomers: 1000,
      yearsExperience: 5
    }
  };
};

const fetchMealPlans = async (): Promise<MealPlan[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return [
    {
      id: "1",
      name: "Diet Plan",
      price: 30000,
      description: "Perfect for weight management and healthy living with balanced nutrition",
      features: [
        "Balanced nutrition",
        "Low-calorie meals", 
        "Fresh vegetables",
        "Portion control"
      ],
      category: 'diet'
    },
    {
      id: "2", 
      name: "Protein Plan",
      price: 40000,
      description: "High-protein meals for active lifestyle and muscle building support",
      features: [
        "High protein content",
        "Muscle building support",
        "Quality lean meats", 
        "Post-workout nutrition"
      ],
      category: 'protein',
      isPopular: true
    },
    {
      id: "3",
      name: "Royal Plan", 
      price: 60000,
      description: "Premium gourmet experience with finest ingredients and chef-prepared meals",
      features: [
        "Premium ingredients",
        "Gourmet preparation",
        "Chef-curated menus",
        "Luxury presentation"
      ],
      category: 'royal'
    }
  ];
};

const fetchBenefits = async (): Promise<HomeBenefit[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return [
    {
      id: "1",
      title: "Fresh & Local Ingredients",
      description: "We source only the freshest ingredients from trusted local farmers and suppliers across Indonesia",
      icon: "🥬"
    },
    {
      id: "2", 
      title: "Nutritionist Approved",
      description: "Every meal is carefully designed and approved by certified nutritionists for optimal health benefits",
      icon: "👩‍⚕️"
    },
    {
      id: "3",
      title: "Flexible Delivery",
      description: "Choose your delivery schedule that fits your lifestyle with easy pause and modification options",
      icon: "🚚"
    }
  ];
};

const fetchTestimonials = async (): Promise<Testimonial[]> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return [
    {
      id: "1",
      customerName: "Sarah Wijaya",
      rating: 5,
      message: "SEA Catering telah mengubah cara saya makan sehat. Makanannya lezat dan bergizi, dan pengirimannya selalu tepat waktu!",
      profession: "Marketing Manager",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      customerName: "Budi Santoso", 
      rating: 5,
      message: "Protein Plan sangat membantu program fitness saya. Makanannya enak dan porsinya pas untuk kebutuhan protein harian.",
      profession: "Fitness Trainer",
      createdAt: "2024-01-20"
    },
    {
      id: "3",
      customerName: "Maya Chen",
      rating: 4,
      message: "Royal Plan benar-benar premium! Presentasinya cantik dan rasanya seperti restoran high-end. Sangat recommended!",
      profession: "Food Blogger", 
      createdAt: "2024-01-25"
    }
  ];
};

// Default/fallback data
const getDefaultHero = (): HomeHero => ({
  title: "Healthy Meals, Anytime, Anywhere",
  subtitle: "Experience premium healthy meal delivery across Indonesia",
  primaryCTA: { text: "Start Subscription", href: "/subscription" },
  secondaryCTA: { text: "View Menu", href: "/menu" },
  stats: { citiesCovered: 50, happyCustomers: 1000, yearsExperience: 5 }
});

const getDefaultPlans = (): MealPlan[] => [
  { id: "1", name: "Diet Plan", price: 30000, description: "Healthy weight management", features: ["Balanced nutrition"], category: 'diet' }
];

const getDefaultBenefits = (): HomeBenefit[] => [
  { id: "1", title: "Fresh Ingredients", description: "Quality sourced locally", icon: "🥬" }
];

const getDefaultTestimonials = (): Testimonial[] => [
  { id: "1", customerName: "Happy Customer", rating: 5, message: "Great service!", createdAt: "2024-01-01" }
];
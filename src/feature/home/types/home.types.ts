export interface MealPlan {
  primaryColor: any;
  color: any;
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  image?: string;
  isPopular?: boolean;
  category: 'diet' | 'protein' | 'royal';
}

export interface Testimonial {
  id: string;
  customerName: string;
  rating: number;
  message: string;
  profession?: string;
  avatar?: string;
  createdAt: string;
}

export interface HomeStats {
  citiesCovered: number;
  happyCustomers: number;
  yearsExperience: number;
}

export interface HomeHero {
  title: string;
  subtitle: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  stats: HomeStats;
}

export interface HomeBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface HomeData {
  hero: HomeHero;
  mealPlans: MealPlan[];
  benefits: HomeBenefit[];
  testimonials: Testimonial[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message?: string;
  error?: string;
}
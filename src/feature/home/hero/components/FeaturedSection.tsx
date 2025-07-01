import React from 'react'

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "Meal Customization",
      description: "Personalize your meals based on dietary preferences, allergies, and health goals. Choose from Diet, Protein, or Royal plans.",
      icon: "🍽️",
      color: "bg-primary-100 text-primary-700"
    },
    {
      id: 2,
      title: "Nationwide Delivery",
      description: "We deliver fresh, healthy meals to major cities across Indonesia with our reliable logistics network.",
      icon: "🚚",
      color: "bg-secondary-100 text-secondary-700"
    },
    {
      id: 3,
      title: "Nutritional Information",
      description: "Detailed nutritional breakdown for every meal, helping you track calories, macros, and achieve your health targets.",
      icon: "📊",
      color: "bg-tertiary-100 text-tertiary-700"
    },
    {
      id: 4,
      title: "Fresh Ingredients",
      description: "We source only the freshest, highest-quality ingredients from trusted local suppliers and farms.",
      icon: "🥬",
      color: "bg-success-200 text-success-700"
    },
    {
      id: 5,
      title: "Flexible Scheduling",
      description: "Choose your delivery days and meal times that fit your lifestyle. Pause or modify anytime.",
      icon: "📅",
      color: "bg-primary-100 text-primary-700"
    },
    {
      id: 6,
      title: "24/7 Support",
      description: "Our dedicated customer support team is available around the clock to assist with your needs.",
      icon: "💬",
      color: "bg-secondary-100 text-secondary-700"
    }
  ]

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="mycontainer">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Our <span className="text-secondary-700">Key Features</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Discover what makes SEA Catering the preferred choice for healthy meal delivery across Indonesia
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white border border-neutral-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Element */}
              <div className="mt-6 pt-4 border-t border-neutral-100">
                <div className="w-12 h-1 bg-secondary-700 rounded-full group-hover:w-full transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-700 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Your Healthy Journey?
            </h3>
            <p className="text-xl mb-6 text-white/90">
              Join thousands of satisfied customers across Indonesia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold hover:bg-neutral-100 transition-colors">
                View Menu Plans
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-700 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
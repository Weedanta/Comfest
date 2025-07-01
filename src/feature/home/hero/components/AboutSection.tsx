import React from 'react'

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-neutral-100">
      <div className="mycontainer">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Welcome to <span className="text-secondary-700">SEA Catering</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            SEA Catering is Indonesia's premier customizable healthy meal service, 
            delivering fresh, nutritious meals to cities across the archipelago. 
            What started as a small business has grown into a nationwide sensation, 
            helping thousands of Indonesians maintain a healthy lifestyle with convenience and taste.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-neutral-900 mb-4">
              Our Story
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Born from a passion for healthy living and the need for convenient, 
              nutritious meals in today's busy world, SEA Catering has revolutionized 
              how Indonesians approach daily nutrition.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              We believe that eating healthy shouldn't be complicated or time-consuming. 
              That's why we've created a service that brings restaurant-quality, 
              nutritionally balanced meals directly to your doorstep.
            </p>

            {/* Mission Points */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-secondary-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-neutral-700">
                  <strong>Fresh & Local:</strong> We source ingredients from local farmers and suppliers
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-secondary-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-neutral-700">
                  <strong>Nutritionist Approved:</strong> All meals are designed by certified nutritionists
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-secondary-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-neutral-700">
                  <strong>Sustainable:</strong> Eco-friendly packaging and responsible sourcing
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
              Why Choose SEA Catering?
            </h3>
            
            <div className="space-y-6">
              <div className="text-center p-4 bg-secondary-100 rounded-xl">
                <div className="text-3xl font-bold text-secondary-700 mb-2">100%</div>
                <div className="text-neutral-700">Fresh Ingredients</div>
              </div>
              
              <div className="text-center p-4 bg-primary-100 rounded-xl">
                <div className="text-3xl font-bold text-primary-700 mb-2">50+</div>
                <div className="text-neutral-700">Cities Served</div>
              </div>
              
              <div className="text-center p-4 bg-tertiary-100 rounded-xl">
                <div className="text-3xl font-bold text-tertiary-700 mb-2">24h</div>
                <div className="text-neutral-700">Delivery Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
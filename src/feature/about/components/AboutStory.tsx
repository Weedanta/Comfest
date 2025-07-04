import React from 'react';
import ic_check from '@/assets/img/about/check-circle.svg'
import Image from 'next/image';

const AboutStory = () => {
  return (
    <section className="py-16 bg-neutral-100 md:h-[80vh]">
      <div className="mycontainer flex h-full items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
              Our Story
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed mb-6">
              What started as a small business has quickly become a nationwide sensation. SEA Catering began with a simple mission: to make healthy eating accessible and convenient for everyone across Indonesia.
            </p>
            <p className="text-neutral-600 text-lg leading-relaxed mb-6">
              We've seen rapid growth since we began offering customizable healthy meal plans with delivery all across Indonesia. Our viral success comes from our commitment to quality, nutrition, and customer satisfaction.
            </p>
            <p className="text-neutral-600 text-lg leading-relaxed">
              Today, we're working hard to meet the rising demand while maintaining the quality and personal touch that made us who we are.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-neutral-800 mb-4">Why Choose SEA Catering?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Image alt='' src={ic_check} className='mr-3' width={24} height={24} draggable='false'/>
                <span className="text-neutral-600">Customizable healthy meal plans tailored to your needs</span>
              </li>
              <li className="flex items-start">
                <Image alt='' src={ic_check} className='mr-3' width={24} height={24} draggable='false'/>
                <span className="text-neutral-600">Nationwide delivery to major cities across Indonesia</span>
              </li>
              <li className="flex items-start">
               <Image alt='' src={ic_check} className='mr-3' width={24} height={24} draggable='false'/>
                <span className="text-neutral-600">Detailed nutritional information for every meal</span>
              </li>
              <li className="flex items-start">
               <Image alt='' src={ic_check} className='mr-3' width={24} height={24} draggable='false'/>
                <span className="text-neutral-600">Fresh, high-quality ingredients sourced locally</span>
              </li>
              <li className="flex items-start">
               <Image alt='' src={ic_check} className='mr-3' width={24} height={24} draggable='false'/>
                <span className="text-neutral-600">Flexible subscription plans that fit your lifestyle</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
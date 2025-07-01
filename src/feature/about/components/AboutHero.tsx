import React from 'react';

const AboutHero = () => {
  return (
    <section className="bg-gradient-to-br from-neutral-800 to-neutral-900 text-white pt-16 h-[60vh]">
      <div className="mycontainer flex justify-center items-center h-full">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-secondary-700">SEA Catering</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 mb-8">
            Healthy Meals, Anytime, Anywhere
          </p>
          <p className="text-lg text-neutral-400 leading-relaxed">
            Transforming how Indonesia experiences healthy eating through customizable meal plans delivered nationwide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
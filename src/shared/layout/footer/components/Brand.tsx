import React from "react";
import { contactInfo } from "../data/footerData";

const Brand: React.FC = () => {
  return (
    <div className="lg:col-span-1">
      <h2 className="text-2xl font-bold mb-4">
        <span className="text-secondary-700">SEA </span>
        <span className="text-white">Catering</span>
      </h2>
      
      <p className="text-neutral-300 mb-6">
        Healthy Meals, Anytime, Anywhere. Experience the best catering
        service with premium quality food delivered fresh to your table.
      </p>
      
      <div className="space-y-2 text-neutral-300">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-secondary-700" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">Manager: <span className="font-semibold text-white">{contactInfo.manager}</span></span>
        </div>
        
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-secondary-700" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span className="text-sm">{contactInfo.phone}</span>
        </div>
        
        {contactInfo.email && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-secondary-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="text-sm">{contactInfo.email}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brand;
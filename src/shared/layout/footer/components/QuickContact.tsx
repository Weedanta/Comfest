import React from "react";
import Image from "next/image";
import { contactInfo } from "../data/footerData";

const QuickContact: React.FC = () => {
  const handlePhoneClick = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = contactInfo.phone.startsWith('08') 
      ? '62' + contactInfo.phone.substring(1) 
      : contactInfo.phone;
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 text-white">Quick Contact</h3>
      <div className="space-y-3">
        <button
          onClick={handlePhoneClick}
          className="flex items-center gap-3 text-neutral-300 hover:text-secondary-700 transition-colors duration-200 text-sm w-full text-left group"
        >
          <div className="w-5 h-5 relative">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <span className="group-hover:underline">Call Manager {contactInfo.manager}</span>
        </button>
        
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center gap-3 text-neutral-300 hover:text-secondary-700 transition-colors duration-200 text-sm w-full text-left group"
        >
          <div className="w-5 h-5 relative">
            <Image
              src="/assets/img/socialmedia/phone.png"
              alt="WhatsApp"
              fill
              className="object-contain filter brightness-75 group-hover:brightness-100 transition-all duration-200"
              sizes="20px"
            />
          </div>
          <span className="group-hover:underline">WhatsApp {contactInfo.manager}</span>
        </button>
      </div>
    </div>
  );
};

export default QuickContact;
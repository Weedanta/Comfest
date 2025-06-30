import React from "react";
import Image from "next/image";
import { contactInfo,  } from "../data/footerData";
import ic_user from "@/assets/img/socialmedia/ic_user.svg"
import ic_mail from "@/assets/img/socialmedia/ic_mail.svg"
import ic_phone from "@/assets/img/socialmedia/phone.svg"

const Brand: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        <span className="text-secondary-700">SEA </span>
        <span className="text-white">Catering</span>
      </h2>
      
      <p className="text-neutral-300 mb-6">
        Healthy Meals, Anytime, Anywhere. Experience the best catering
        service with premium quality food delivered fresh to your table.
      </p>
      
      {/* Contact Info */}
      <div className="space-y-2 text-neutral-300 mb-6">
        <div className="flex items-center gap-2">
          <Image src={ic_user} alt="Manager" width={20} height={20}/>
          <span className="text-sm">Manager: <span className="font-semibold text-white">{contactInfo.manager}</span></span>
        </div>
        
        <div className="flex items-center gap-2">
          <Image src={ic_phone} alt="Manager" width={20} height={20}/>
          <span className="text-sm">{contactInfo.phone}</span>
        </div>
        
        {contactInfo.email && (
          <div className="flex items-center gap-2">
            <Image src={ic_mail} alt="Manager" width={20} height={20}/>
            <span className="text-sm">{contactInfo.email}</span>
          </div>
        )}
      </div>

     
    </div>
  );
};

export default Brand;
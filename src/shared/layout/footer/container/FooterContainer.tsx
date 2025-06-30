import React from "react";
import Brand from "../components/Brand";
import FooterSection from "../components/FooterSection";
import QuickContact from "../components/QuickContact";
import SocialLinks from "../components/SocialLink";
import Copyright from "../components/Copyright";
import { footerSections } from "../data/footerData";

const FooterContainer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="mycontainer">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <Brand />
          
          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <FooterSection key={index} section={section} />
          ))}
          
          {/* Quick Contact Section */}
          <QuickContact />
        </div>

        {/* Social Links for Brand Section */}
        <div className="lg:hidden mt-6">
          <SocialLinks />
        </div>
        
        <div className="hidden lg:block lg:absolute lg:bottom-6 lg:left-8">
          <SocialLinks />
        </div>

        {/* Copyright */}
        <Copyright />
      </div>
    </footer>
  );
};

export default FooterContainer;
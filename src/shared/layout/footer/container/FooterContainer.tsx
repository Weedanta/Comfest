import React from "react";
import Brand from "../components/Brand";
import FooterSection from "../components/FooterSection";
import Copyright from "../components/Copyright";
import { footerSections } from "../data/footerData";

const FooterContainer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="mycontainer">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Brand Section - Takes more space */}
          <div className="lg:col-span-1">
            <Brand />
          </div>

          {/* Links Sections */}
          <div className="flex flex-col md:flex-row md:justify-around gap-8">
            {footerSections.map((section, index) => (
              <FooterSection key={index} section={section} />
            ))}
          </div>
        </div>

        {/* Copyright */}
        <Copyright />
      </div>
    </footer>
  );
};

export default FooterContainer;

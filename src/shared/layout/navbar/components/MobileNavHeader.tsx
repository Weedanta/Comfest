"use client";
import React from "react";
import Hamburger from "hamburger-react";
import Logo from "./Logo";

interface MobileNavHeaderProps {
  isVisible: boolean;
  isOpen: boolean;
  toggleMobileMenu: () => void;
}

const MobileNavHeader: React.FC<MobileNavHeaderProps> = ({
  isVisible,
  isOpen,
  toggleMobileMenu,
}) => {
  return (
    <nav
      className={`w-screen px-10 sm:px-14 md:px-16 bg-neutral-800 flex z-100 py-4 fixed justify-between items-center lg:hidden transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Logo />
      
      <div className={`${isOpen ? "bg-transparent" : "bg-neutral-700"} rounded-lg`}>
        <Hamburger
          size={25}
          color="white"
          toggled={isOpen}
          toggle={toggleMobileMenu}
        />
      </div>
    </nav>
  );
};

export default MobileNavHeader;
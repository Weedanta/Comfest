"use client";
import React from "react";
import DesktopNav from "../components/DesktopNav";
import MobileNavHeader from "../components/MobileNavHeader";
import MobileNav from "../components/MobileNav";
import { useNavbar } from "../hooks/useNavbar";
import { navItems } from "../data/navItem";

const NavbarContainer: React.FC = () => {
  const { isVisible, isOpen, closeMobileMenu, toggleMobileMenu } = useNavbar();

  return (
    <>
      <DesktopNav items={navItems} isVisible={isVisible} />
      <MobileNavHeader
        isVisible={isVisible}
        isOpen={isOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      {isOpen && <MobileNav items={navItems} closeMobileMenu={closeMobileMenu} />}
    </>
  );
};

export default NavbarContainer;
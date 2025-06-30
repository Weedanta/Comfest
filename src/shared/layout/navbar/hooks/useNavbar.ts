"use client";
import { useState } from "react";
import useScrollNavbar from "@/shared/hooks/useScrollBar";

export const useNavbar = () => {
  const { isVisible } = useScrollNavbar(100, 700);
  const [isOpen, setIsOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return {
    isVisible,
    isOpen,
    closeMobileMenu,
    toggleMobileMenu,
  };
};

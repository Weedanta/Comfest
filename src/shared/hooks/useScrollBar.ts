"use client";
import { useState, useEffect } from "react";

interface UseScrollNavbarReturn {
  isVisible: boolean;
  scrollY: number;
  scrollDirection: "up" | "down" | null;
}

const useScrollNavbar = (
  showThreshold = 100,
  hideThreshold = 300
): UseScrollNavbarReturn => {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scroll position
      setScrollY(currentScrollY);
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }
      
      // Determine navbar visibility
      if (currentScrollY <= showThreshold) {
        // Always show navbar at the top
        setIsVisible(true);
      } else if (currentScrollY > hideThreshold && scrollDirection === "down") {
        // Hide navbar when scrolling down past threshold
        setIsVisible(false);
      } else if (scrollDirection === "up") {
        // Show navbar when scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Throttle the scroll event for better performance
    let timeoutId: NodeJS.Timeout;
    const throttledHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [lastScrollY, scrollDirection, showThreshold, hideThreshold]);

  return {
    isVisible,
    scrollY,
    scrollDirection,
  };
};

export default useScrollNavbar;
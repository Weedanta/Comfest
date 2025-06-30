import React, { FC } from "react";
import Link from "next/link";
import { NavItem as NavItemType } from "../types/navbar.types";

interface NavItemProps {
  item: NavItemType;
  onClick?: () => void;
  className?: string;
}

const NavItem: FC<NavItemProps> = ({ item, onClick, className = "" }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (onClick) {
      onClick();
    }

    const isHomePage =
      window.location.pathname === "/" || window.location.pathname === "/home";

    if (isHomePage) {
      const target = document.querySelector(item.href);
      if (target) {
        const navbarHeight = 100;
        const targetPosition = (target as HTMLElement).offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    } else {
      window.location.href = `/home${item.href}`;
    }
  };

  return (
    <Link
      className={`text-white text-xl font-bold hover:text-neutral-300 transition-colors ${className}`}
      href={item.href}
      onClick={handleClick}
    >
      {item.title}
    </Link>
  );
};

export default NavItem;
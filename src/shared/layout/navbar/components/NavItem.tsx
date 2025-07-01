import React, { FC } from "react";
import Link from "next/link";
import { NavItem as NavItemType } from "../types/navbar.types";

interface NavItemProps {
  item: NavItemType;
  onClick?: () => void;
  className?: string;
}

const NavItem: FC<NavItemProps> = ({ item, onClick, className = "" }) => {
  return (
    <Link
      className={`text-white text-xl font-bold hover:text-neutral-300 transition-colors ${className}`}
      href={item.href}
      onClick={onClick} // Hapus semua logic scroll behavior dan preventDefault
    >
      {item.title}
    </Link>
  );
};

export default NavItem;
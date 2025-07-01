"use client";
import React from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { Button } from "@/shared/components/ui/Button";
import ProfileDropdown from "@/shared/components/ProfileDropdown";
import Link from "next/link";
import NavItem from "./NavItem";
import { NavItem as NavItemType } from "../types/navbar.types";

interface MobileNavProps {
  items: NavItemType[];
  closeMobileMenu: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ items, closeMobileMenu }) => {
  const { isAuthenticated, user, logout, IsAdmin } = useAuth() ?? {};

  return (
    <div className="h-screen w-screen inset-0 fixed bg-neutral-800 top-0 left-0 z-50 flex flex-col items-center pt-24">
      <ul className="flex flex-col items-center gap-6 mb-8">
        {items.map((item) => (
          <li key={item.id} className="text-white text-lg relative group">
            <NavItem item={item} onClick={closeMobileMenu} />
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-secondary-700 transition-all group-hover:w-full"></span>
          </li>
        ))}
      </ul>
      
      <div className="flex flex-col gap-4">
        {isAuthenticated ? (
          <ProfileDropdown
            user={user}
            logout={logout}
            isAdmin={IsAdmin ?? false}
          />
        ) : (
          <Link href="/login">
            <Button variant="primary" size="small" className="h-12 font-sans font-semibold">
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
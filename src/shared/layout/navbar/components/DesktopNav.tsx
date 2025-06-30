"use client";
import React from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { Button } from "@/shared/components/ui/Button";
import ProfileDropdown from "@/shared/components/ProfileDropdown";
import Link from "next/link";
import Logo from "./Logo";
import NavItem from "./NavItem";
import { NavItem as NavItemType } from "../types/navbar.types";

interface DesktopNavProps {
  items: NavItemType[];
  isVisible: boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ items, isVisible }) => {
  const { isAuthenticated, user, logout, IsAdmin } = useAuth();

  return (
    <nav
      className={`fixed right-0 left-0 top-0 py-4 z-100 transition-transform duration-300 ${
        isVisible ? "translate-y-0 lg:bg-neutral-800" : "-translate-y-full"
      }`}
    >
      <div className="mycontainer items-center lg:flex hidden justify-between">
        <div className="w-1/5">
          <Logo />
        </div>
        
        <ul className="w-3/5 flex justify-center items-center gap-10">
          {items.map((item) => (
            <div key={item.id} className="relative group">
              <NavItem item={item} />
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-secondary-700 transition-all group-hover:w-full"></span>
            </div>
          ))}
        </ul>
        
        <div className="w-1/5 flex justify-end">
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
    </nav>
  );
};

export default DesktopNav;
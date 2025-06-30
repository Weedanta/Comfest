"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User } from "../type/TAuth";
import { Button } from "./ui/Button";

interface ProfileDropdownProps {
  user: User | null;
  logout: () => void;
  isAdmin: boolean;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  logout,
  isAdmin,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const getSubscriptionStatus = () => {
    // Mock subscription logic - replace with actual subscription data
    const hasActiveSubscription = user?.role === "premium" || isAdmin;
    return hasActiveSubscription ? "Premium" : "Basic";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
      >
        {/* Avatar */}
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {getInitials(user.name)}
        </div>
        
        {/* User Info - Hidden on mobile */}
        <div className="hidden lg:block text-left">
          <p className="text-white font-medium text-sm">{user.name}</p>
          <p className="text-white/70 text-xs">
            {getSubscriptionStatus()} • {user.role}
          </p>
        </div>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 text-white transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-neutral-200 z-50 overflow-hidden">
          {/* User Info Section */}
          <div className="px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-white/90">{user.email}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {getSubscriptionStatus()}
              </span>
              <span className="text-xs capitalize">{user.role}</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {/* Dashboard Link */}
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-2 text-neutral-700 hover:bg-neutral-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Dashboard
            </Link>

            {/* Subscription Management */}
            <Link
              href="/subscription"
              className="flex items-center px-4 py-2 text-neutral-700 hover:bg-neutral-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              Subscription
            </Link>

            {/* Profile Settings */}
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-neutral-700 hover:bg-neutral-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link>

            {/* Admin Panel - Only for admins */}
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center px-4 py-2 text-neutral-700 hover:bg-neutral-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Admin Panel
              </Link>
            )}

            {/* Divider */}
            <div className="border-t border-neutral-200 my-2"></div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-danger-700 hover:bg-danger-50 transition-colors"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
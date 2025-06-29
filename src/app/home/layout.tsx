// Path: src/app/home/layout.tsx
import React from "react";
import Navbar from "@/shared/components/Navbar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 pt-20 lg:pt-24">
        {children}
      </main>
      
    </div>
  );
};

export default HomeLayout;
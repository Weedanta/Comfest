"use client";
import React, { useState } from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import ProfileSidebar from "../components/ProfileSidebar";
import PersonalInfoSection from "../components/PersonalInfoSection";
import PasswordSection from "../components/PasswordSection";
import ProfileHeader from "../components/ProfileHeader";

type ProfileTab = "personal" | "password" | "delete";

const ProfileContainer: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<ProfileTab>("personal");

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-neutral-800 mb-2">
            Access Denied
          </h2>
          <p className="text-neutral-600">
            Please login to access your profile.
          </p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfoSection />;
      case "password":
        return <PasswordSection />;
      case "delete":
        return (
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-danger-700 mb-4">
              Delete Account
            </h3>
            <p className="text-neutral-600 mb-4">
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </p>
            <button className="bg-danger-700 text-white px-4 py-2 rounded-lg hover:bg-danger-800 transition-colors">
              Delete Account
            </button>
          </div>
        );
      default:
        return <PersonalInfoSection />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 pt-24 pb-16">
      <div className="mycontainer">
        <ProfileHeader user={user} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
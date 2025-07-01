"use client";
import React from "react";
import { User, Lock, Trash2, Shield, CreditCard, Bell } from "lucide-react";

type ProfileTab = "personal" | "password" | "delete";

interface ProfileSidebarProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const menuItems = [
    {
      id: "personal" as ProfileTab,
      title: "Personal Info",
      subtitle: "Update your profile information",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "password" as ProfileTab,
      title: "Password",
      subtitle: "Change your password",
      icon: <Lock className="w-5 h-5" />,
    },
    {
      id: "delete" as ProfileTab,
      title: "Delete Account",
      subtitle: "Permanently delete your account",
      icon: <Trash2 className="w-5 h-5" />,
      danger: true,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
      <div className="p-4 border-b border-neutral-200">
        <h3 className="font-semibold text-neutral-800">Profile Settings</h3>
        <p className="text-sm text-neutral-600 mt-1">
          Manage your account preferences
        </p>
      </div>

      <nav className="p-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200 group ${
              activeTab === item.id
                ? item.danger
                  ? "bg-danger-50 text-danger-700 border border-danger-200"
                  : "bg-primary-50 text-primary-700 border border-primary-200"
                : "text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            <div className={`flex-shrink-0 mt-0.5 ${
              activeTab === item.id && item.danger
                ? "text-danger-600"
                : activeTab === item.id
                ? "text-primary-600"
                : "text-neutral-500 group-hover:text-neutral-700"
            }`}>
              {item.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className={`font-medium text-sm ${
                activeTab === item.id && item.danger
                  ? "text-danger-700"
                  : activeTab === item.id
                  ? "text-primary-700"
                  : "text-neutral-800"
              }`}>
                {item.title}
              </div>
              <div className={`text-xs mt-0.5 ${
                activeTab === item.id && item.danger
                  ? "text-danger-600"
                  : activeTab === item.id
                  ? "text-primary-600"
                  : "text-neutral-500"
              }`}>
                {item.subtitle}
              </div>
            </div>

            {/* Active indicator */}
            {activeTab === item.id && (
              <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${
                item.danger ? "bg-danger-600" : "bg-primary-600"
              }`} />
            )}
          </button>
        ))}
      </nav>

      {/* Additional Options */}
      <div className="p-4 border-t border-neutral-200 space-y-2">
        <button className="w-full flex items-center gap-3 p-2 text-sm text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50 rounded-lg transition-colors">
          <Shield className="w-4 h-4" />
          Privacy Settings
        </button>
        <button className="w-full flex items-center gap-3 p-2 text-sm text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50 rounded-lg transition-colors">
          <Bell className="w-4 h-4" />
          Notifications
        </button>
        <button className="w-full flex items-center gap-3 p-2 text-sm text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50 rounded-lg transition-colors">
          <CreditCard className="w-4 h-4" />
          Billing
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
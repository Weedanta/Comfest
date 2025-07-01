"use client";
import React, { useState, useRef } from "react";
import { User } from "@/shared/type/TAuth";
import { Camera, Upload } from "lucide-react";

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Here you would typically upload to your backend
      // const formData = new FormData();
      // formData.append('avatar', file);
      // await uploadAvatar(formData);

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Failed to upload avatar");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          <div 
            className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-2xl cursor-pointer overflow-hidden border-4 border-white/30 hover:border-white/50 transition-all group"
            onClick={handleAvatarClick}
          >
            {avatar ? (
              <img 
                src={avatar} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              getInitials(user.name)
            )}
            
            {/* Upload overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              {isUploading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <Camera className="w-6 h-6 text-white" />
              )}
            </div>
          </div>

          {/* Upload button */}
          <button
            onClick={handleAvatarClick}
            disabled={isUploading}
            className="absolute -bottom-2 -right-2 bg-secondary-700 text-white rounded-full p-2 shadow-lg hover:bg-secondary-800 transition-colors disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
          </button>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
          <p className="text-white/90 mb-1">{user.email}</p>
          <div className="flex items-center gap-4">
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
              {user.role === "ADMIN" ? "Administrator" : "Member"}
            </span>
            <span className="text-sm text-white/80">
              Member since {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
        <div className="text-center">
          <div className="text-2xl font-bold">12</div>
          <div className="text-sm text-white/80">Active Orders</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">3</div>
          <div className="text-sm text-white/80">Subscriptions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">₹2,450</div>
          <div className="text-sm text-white/80">Total Spent</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
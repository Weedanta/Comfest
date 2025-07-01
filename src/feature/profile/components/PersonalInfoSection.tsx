"use client";
import React, { useState } from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { Button } from "@/shared/components/ui/Button";
import { Save, X, Edit3, Check } from "lucide-react";

const PersonalInfoSection: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "", // You might want to add phone to user type
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.phone && !/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user context
      if (user) {
        updateUser({
          ...user,
          name: formData.name,
          email: formData.email,
        });
      }

      setIsEditing(false);
      
      // Show success message
      alert("Profile updated successfully!");
      
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
      {/* Header */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-neutral-800">
              Personal Information
            </h3>
            <p className="text-sm text-neutral-600 mt-1">
              You can update your profile photo and personal details here.
            </p>
          </div>
          
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Full Name *
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.name ? "border-danger-500" : "border-neutral-300"
                }`}
                placeholder="Enter your full name"
              />
            ) : (
              <div className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800">
                {formData.name || "Not provided"}
              </div>
            )}
            {errors.name && (
              <p className="text-danger-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Email Address *
            </label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.email ? "border-danger-500" : "border-neutral-300"
                }`}
                placeholder="Enter your email address"
              />
            ) : (
              <div className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800">
                {formData.email || "Not provided"}
              </div>
            )}
            {errors.email && (
              <p className="text-danger-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.phone ? "border-danger-500" : "border-neutral-300"
                }`}
                placeholder="Enter your phone number"
              />
            ) : (
              <div className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800">
                {formData.phone || "Not provided"}
              </div>
            )}
            {errors.phone && (
              <p className="text-danger-600 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Role Field (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Account Type
            </label>
            <div className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800">
              {user?.role === "admin" ? "Administrator" : "Member"}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-neutral-200">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              variant="primary"
              size="small"
              className="h-10 px-6"
              leftIcon={isSaving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
            
            <Button
              onClick={handleCancel}
              variant="secondary"
              size="small"
              className="h-10 px-6"
              leftIcon={<X className="w-4 h-4" />}
            >
              Cancel
            </Button>
          </div>
        )}

        {/* Success indicator when not editing */}
        {!isEditing && (
          <div className="flex items-center gap-2 mt-6 pt-6 border-t border-neutral-200 text-success-700">
            <Check className="w-4 h-4" />
            <span className="text-sm">Profile information is up to date</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoSection;
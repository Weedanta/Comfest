"use client";
import React, { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { Save, Eye, EyeOff, Lock, Shield, Check, X } from "lucide-react";

const PasswordSection: React.FC = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isChanging, setIsChanging] = useState(false);

  const passwordRequirements = [
    { 
      text: "At least 8 characters", 
      met: formData.newPassword.length >= 8 
    },
    { 
      text: "Contains uppercase letter", 
      met: /[A-Z]/.test(formData.newPassword) 
    },
    { 
      text: "Contains lowercase letter", 
      met: /[a-z]/.test(formData.newPassword) 
    },
    { 
      text: "Contains number", 
      met: /\d/.test(formData.newPassword) 
    },
    { 
      text: "Contains special character", 
      met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) 
    },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (!passwordRequirements.every(req => req.met)) {
      newErrors.newPassword = "Password doesn't meet all requirements";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = "New password must be different from current password";
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

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsChanging(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      alert("Password changed successfully!");
      
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password. Please try again.");
    } finally {
      setIsChanging(false);
    }
  };

  const isFormValid = passwordRequirements.every(req => req.met) && 
                     formData.confirmPassword === formData.newPassword &&
                     formData.currentPassword &&
                     formData.currentPassword !== formData.newPassword;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
      {/* Header */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Lock className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-800">
              Change Password
            </h3>
            <p className="text-sm text-neutral-600 mt-1">
              Update your password to keep your account secure.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.currentPassword ? "border-danger-500" : "border-neutral-300"
                }`}
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
              >
                {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-danger-600 text-sm mt-1">{errors.currentPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => handleInputChange("newPassword", e.target.value)}
                className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.newPassword ? "border-danger-500" : "border-neutral-300"
                }`}
                placeholder="Enter your new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
              >
                {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-danger-600 text-sm mt-1">{errors.newPassword}</p>
            )}

            {/* Password Requirements */}
            {formData.newPassword && (
              <div className="mt-3 p-3 bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-neutral-600" />
                  <span className="text-sm font-medium text-neutral-700">Password Requirements</span>
                </div>
                <div className="space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {req.met ? (
                        <Check className="w-3 h-3 text-success-600" />
                      ) : (
                        <X className="w-3 h-3 text-neutral-400" />
                      )}
                      <span className={`text-xs ${
                        req.met ? "text-success-700" : "text-neutral-600"
                      }`}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Confirm New Password *
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.confirmPassword ? "border-danger-500" : "border-neutral-300"
                }`}
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
              >
                {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-danger-600 text-sm mt-1">{errors.confirmPassword}</p>
            )}
            
            {/* Password Match Indicator */}
            {formData.confirmPassword && (
              <div className="flex items-center gap-2 mt-2">
                {formData.newPassword === formData.confirmPassword ? (
                  <>
                    <Check className="w-4 h-4 text-success-600" />
                    <span className="text-sm text-success-700">Passwords match</span>
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4 text-danger-600" />
                    <span className="text-sm text-danger-700">Passwords don't match</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-neutral-200">
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isChanging}
            variant="primary"
            size="small"
            className="h-10 px-6"
            leftIcon={isChanging ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Save className="w-4 h-4" />
            )}
          >
            {isChanging ? "Changing Password..." : "Change Password"}
          </Button>
          
          <p className="text-sm text-neutral-600">
            Make sure your new password is strong and unique.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordSection;
"use client";
import { useState, useCallback } from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { UpdateProfileRequest, ChangePasswordRequest } from "../types/profile.types";

export const useProfile = () => {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = useCallback(async (data: UpdateProfileRequest) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      // Mock API call - replace with actual API
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      
      // Update user context
      updateUser({
        ...user,
        ...data,
        updatedAt: new Date().toISOString(),
      });

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Update failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [user, updateUser]);

  const changePassword = useCallback(async (data: ChangePasswordRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock API call - replace with actual API
      const response = await fetch("/api/profile/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change password");
      }

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Password change failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadAvatar = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      // Mock API call - replace with actual API
      const response = await fetch("/api/profile/avatar", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload avatar");
      }

      const { avatarUrl } = await response.json();
      
      // Update user context with new avatar
      if (user) {
        updateUser({
          ...user,
          avatar: avatarUrl,
        });
      }

      return { success: true, avatarUrl };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [user, updateUser]);

  return {
    updateProfile,
    changePassword,
    uploadAvatar,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};
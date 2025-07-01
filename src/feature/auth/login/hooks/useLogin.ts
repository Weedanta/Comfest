"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/hooks/useAuth";
import { apiClient } from "@/lib/api";
import { 
  validateEmail, 
  validatePassword, 
  sanitizeInput 
} from "../../shared/utils/validation";
import { LoginCredentials } from "@/shared/type/TAuth";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export const useLogin = () => {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({
      ...prev,
      [field]: sanitizedValue
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }

    if (errors.general) {
      setErrors(prev => ({
        ...prev,
        general: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const credentials: LoginCredentials = {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      };

      // Use apiClient instead of authAPI
      const response = await apiClient.login(credentials);

      if (response.data?.token) {
        authLogin(response.data.token);
        router.push("/dashboard");
      } else {
        setErrors({
          general: response.message || "Login failed. Please try again."
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setErrors({
        general: error.message || "An unexpected error occurred. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit,
    clearErrors,
  };
};
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/hooks/useAuth";
import { apiClient } from "@/lib/api";
import { 
  validateEmail, 
  validatePassword, 
  validateName,
  validateConfirmPassword,
  sanitizeInput 
} from "../../shared/utils/validation";
import { RegisterCredentials } from "@/shared/type/TAuth";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface SignupFormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  general?: string;
}

export const useSignup = () => {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const validateForm = (): boolean => {
    const newErrors: SignupFormErrors = {};

    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error;
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }

    const confirmPasswordValidation = validateConfirmPassword(
      formData.password, 
      formData.confirm_password
    );
    if (!confirmPasswordValidation.isValid) {
      newErrors.confirm_password = confirmPasswordValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof SignupFormData, value: string) => {
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
      const credentials: RegisterCredentials & { name: string } = {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        confirm_password: formData.confirm_password,
        name: formData.name.trim(),
      };

      // Use apiClient instead of authAPI
      const response = await apiClient.register(credentials);

      if (response.data?.token) {
        authLogin(response.data.token);
        router.push("/dashboard");
      } else {
        setErrors({
          general: response.message || "Registration failed. Please try again."
        });
      }
    } catch (error: any) {
      console.error("Signup error:", error);
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
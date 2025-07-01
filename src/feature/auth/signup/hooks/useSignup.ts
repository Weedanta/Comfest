"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/hooks/useAuth";
import { authAPI } from "../../shared/api/authAPI";
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

    // Validate name
    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error;
    }

    // Validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }

    // Validate confirm password
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

    // Clear specific field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }

    // Clear general error
    if (errors.general) {
      setErrors(prev => ({
        ...prev,
        general: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});

    // Validate form
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

      const response = await authAPI.register(credentials);

      if (response.status.isSuccess && response.data?.token) {
        // Use AuthContext login function to auto-login after signup
        authLogin(response.data.token);
        
        // Redirect to dashboard or home
        router.push("/dashboard");
      } else {
        setErrors({
          general: response.message || "Registration failed. Please try again."
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({
        general: "An unexpected error occurred. Please try again."
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
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileRequest {
  name: string;
  email: string;
  phone: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ProfileTabType {
  id: string;
  title: string;
  icon: React.ReactNode;
}
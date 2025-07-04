export type UserRole = "ADMIN" | "USER" | "PREMIUM";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirm_password: string;
}

export interface User {
  UserID?: string;
  email: string;
  name: string;
  role: UserRole;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
  exp?: number;
  IsAdmin?: boolean;
}

export interface ApiStatus {
  code: number;
  isSuccess: boolean;
}

export interface AuthResponse {
  status: ApiStatus;
  message: string;
  data: {
    token?: string | null;
    user?: User;
    email?: string;
    otpSent?: boolean;
    UserID?: string;
    otpExpiresAt?: string;
  } | null;
  tempData?: TempRegisterData;
}

export interface TempRegisterData {
  token: string;
  user_id: string;
  timestamp: number;
  expiresAt: number;
}

export interface JWTPayload {
  UserID: string;
  role?: UserRole;
  email?: string;
  IsAdmin?: boolean;
  name?: string;
  permissions?: string[];
  exp: number;
  iat?: number;
}

export interface ApiErrorResponse {
  code: number;
  message: string;
  errors?: string[];
}

export interface OTPVerificationData {
  userID?: string;
  user_id?: string;
  otp_code: string;
}

export interface DecodedToken {
  UserID: string;
  email?: string;
  role?: UserRole;
  IsAdmin?: boolean;
  exp: number;
  iat: number;
}
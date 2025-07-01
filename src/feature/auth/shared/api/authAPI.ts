// src/feature/auth/shared/api/authAPI.ts

import { 
  LoginCredentials, 
  RegisterCredentials, 
  AuthResponse, 
  User,
  ApiErrorResponse 
} from "@/shared/type/TAuth";

// Mock user interface for database
interface MockUser {
  UserID: string;
  email: string;
  name: string;
  password: string;
  role: "admin" | "user";
  IsAdmin: boolean;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

// Mock user database - In real app, this would be handled by backend
const mockUsers: MockUser[] = [
  {
    UserID: "admin-1",
    email: "admin@seacatering.com",
    name: "Admin User",
    password: "Admin123!",
    role: "admin",
    IsAdmin: true,
    permissions: ["read", "write", "delete"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    UserID: "user-1", 
    email: "brian@example.com",
    name: "Brian Manager",
    password: "User123!",
    role: "user",
    IsAdmin: false,
    permissions: ["read"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate mock JWT token
const generateToken = (user: MockUser): string => {
  const payload = {
    UserID: user.UserID,
    email: user.email,
    name: user.name,
    role: user.role === "admin" ? "ADMIN" : user.role === "user" ? "USER" : "USER",
    IsAdmin: user.IsAdmin,
    permissions: user.permissions,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    iat: Math.floor(Date.now() / 1000)
  };
  
  // In real app, this would be properly signed JWT
  return btoa(JSON.stringify(payload));
};

// Hash password (mock - in real app use bcrypt)
const hashPassword = (password: string): string => {
  return btoa(password + "salt"); // Very simple mock hashing
};

// Verify password
const verifyPassword = (password: string, hashedPassword: string): boolean => {
  return hashPassword(password) === hashedPassword;
};

export const authAPI = {
  // Login function
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(1000); // Simulate network delay
    
    try {
      const { email, password } = credentials;
      
      // Find user by email
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        return {
          status: { code: 401, isSuccess: false },
          message: "Invalid email or password",
          data: null
        };
      }
      
      // Verify password
      if (!verifyPassword(password, user.password)) {
        return {
          status: { code: 401, isSuccess: false },
          message: "Invalid email or password", 
          data: null
        };
      }
      
      // Generate token
      const token = generateToken(user);
      
      // Convert to User interface for response
      const userResponse: User = {
        id: user.UserID,
        email: user.email,
        name: user.name,
        role: user.role === "admin" ? "ADMIN" : user.role === "user" ? "USER" : "USER",
        permissions: user.permissions,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isAdmin: user.IsAdmin
      };
      
      return {
        status: { code: 200, isSuccess: true },
        message: "Login successful",
        data: {
          token,
          user: userResponse
        }
      };
      
    } catch (error) {
      return {
        status: { code: 500, isSuccess: false },
        message: "Internal server error",
        data: null
      };
    }
  },

  // Register function
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    await delay(1500); // Simulate network delay
    
    try {
      const { email, password, confirm_password } = credentials;
      const name = (credentials as any).name || email.split('@')[0]; // Fallback to email prefix if name not provided
      
      // Check if passwords match
      if (password !== confirm_password) {
        return {
          status: { code: 400, isSuccess: false },
          message: "Passwords do not match",
          data: null
        };
      }
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (existingUser) {
        return {
          status: { code: 409, isSuccess: false },
          message: "User with this email already exists",
          data: null
        };
      }
      
      // Create new user
      const newUser: MockUser = {
        UserID: `user-${Date.now()}`,
        email: email.toLowerCase(),
        name: name,
        password: hashPassword(password),
        role: "user",
        IsAdmin: false,
        permissions: ["read"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Add to mock database
      mockUsers.push(newUser);
      
      // Generate token
      const token = generateToken(newUser);
      
      // Convert to User interface for response
      const userResponse: User = {
        id: newUser.UserID,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role === "admin" ? "ADMIN" : newUser.role === "user" ? "USER" : "USER",
        permissions: newUser.permissions,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        isAdmin: newUser.IsAdmin
      };
      
      return {
        status: { code: 201, isSuccess: true },
        message: "Registration successful",
        data: {
          token,
          user: userResponse
        }
      };
      
    } catch (error) {
      return {
        status: { code: 500, isSuccess: false },
        message: "Internal server error",
        data: null
      };
    }
  },

  // Get current user (for verification)
  getCurrentUser: async (token: string): Promise<AuthResponse> => {
    await delay(500);
    
    try {
      // Decode token (mock)
      const payload = JSON.parse(atob(token));
      
      // Check if token is expired
      if (payload.exp < Math.floor(Date.now() / 1000)) {
        return {
          status: { code: 401, isSuccess: false },
          message: "Token expired",
          data: null
        };
      }
      
      // Find user
      const user = mockUsers.find(u => u.UserID === payload.UserID);
      
      if (!user) {
        return {
          status: { code: 404, isSuccess: false },
          message: "User not found",
          data: null
        };
      }
      
      // Convert to User interface for response
      const userResponse: User = {
        id: user.UserID,
        email: user.email,
        name: user.name,
        role: user.role === "admin" ? "ADMIN" : user.role === "user" ? "USER" : "USER",
        isAdmin: user.IsAdmin,
        permissions: user.permissions,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
      
      return {
        status: { code: 200, isSuccess: true },
        message: "User found",
        data: {
          user: userResponse
        }
      };
      
    } catch (error) {
      return {
        status: { code: 401, isSuccess: false },
        message: "Invalid token",
        data: null
      };
    }
  }
};
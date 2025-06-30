"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, JWTPayload } from "../type/TAuth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  IsAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Export AuthContext untuk digunakan di useAuth hook
export { AuthContext };

interface AuthProviderProps {
  children: React.ReactNode;
}

// Mock function to decode JWT token - replace with actual JWT library
const decodeToken = (token: string): JWTPayload | null => {
  try {
    // This is a mock implementation
    // In real app, use jwt-decode library or similar
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload as JWTPayload;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Mock function to check if token is expired
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeToken(token);
    if (!decoded) return true;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser && !isTokenExpired(token)) {
          const userData = JSON.parse(storedUser) as User;
          setUser(userData);
        } else {
          // Clear invalid/expired auth data
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (token: string) => {
    try {
      const decoded = decodeToken(token);
      if (!decoded) {
        throw new Error("Invalid token");
      }

      const userData: User = {
        UserID: decoded.UserID,
        email: decoded.email || "",
        name: decoded.name || "",
        role: decoded.role || "user",
        IsAdmin: decoded.IsAdmin || false,
        permissions: decoded.permissions || [],
      };

      // Store in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid token");
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    
    // Clear state
    setUser(null);
    
    // Redirect to home or login page
    window.location.href = "/home";
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    IsAdmin: user?.IsAdmin || user?.role === "admin" || false,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
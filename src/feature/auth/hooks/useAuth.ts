'use client'
import { useState } from 'react'
import { apiClient } from '@/lib/api'
import { useAuth as useAuthContext } from '@/shared/hooks/useAuth'

export function useAuthApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login: contextLogin, logout: contextLogout } = useAuthContext()

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await apiClient.login(credentials)
      contextLogin(result.data.token)
      return result
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: {
    email: string
    password: string
    confirm_password: string
    name: string
  }) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await apiClient.register(userData)
      contextLogin(result.data.token)
      return result
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    apiClient.clearToken()
    contextLogout()
  }

  return {
    login,
    register,
    logout,
    loading,
    error,
    clearError: () => setError(null)
  }
}
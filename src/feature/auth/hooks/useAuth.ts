'use client'
import { useState } from 'react'
import { apiClient } from '@/lib/api'
import { useAuth as useAuthContext } from '@/shared/hooks/useAuth'
import { LoginCredentials, RegisterCredentials } from '@/shared/type/TAuth'

export function useAuthApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login: contextLogin } = useAuthContext()

  const login = async (credentials: LoginCredentials) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await apiClient.login(credentials)
      
      if (result.data?.token) {
        contextLogin(result.data.token)
      }
      
      return result
    } catch (err: any) {
      setError(err.message || 'Login failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await apiClient.register(credentials)
      
      if (result.data?.token) {
        contextLogin(result.data.token)
      }
      
      return result
    } catch (err: any) {
      setError(err.message || 'Registration failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  return {
    login,
    register,
    loading,
    error,
    clearError
  }
}
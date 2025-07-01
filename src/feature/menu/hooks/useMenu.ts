'use client'
import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api'

export function useMenu() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMenu = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await apiClient.getMenu()
      setMenuItems(result.data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createMenuItem = async (data: any) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await apiClient.createMenuItem(data)
      await fetchMenu() // Refresh menu
      return result
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenu()
  }, [])

  return {
    menuItems,
    loading,
    error,
    fetchMenu,
    createMenuItem,
    clearError: () => setError(null)
  }
}
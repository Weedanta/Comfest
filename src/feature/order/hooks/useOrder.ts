'use client'
import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api'

export function useOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await apiClient.getMyOrders()
      setOrders(result.data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createOrder = async (orderData: any) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await apiClient.createOrder(orderData)
      await fetchOrders() // Refresh orders
      return result
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    clearError: () => setError(null)
  }
}
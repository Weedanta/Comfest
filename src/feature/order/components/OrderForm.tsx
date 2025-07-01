// src/feature/order/components/OrderForm.tsx - Fixed Version
'use client'
import React, { useState } from 'react'
import { useOrders } from '../hooks/useOrder'
import { useMenu } from '@/feature/menu/hooks/useMenu'
import { Button } from '@/shared/components/ui/Button'

// Define proper interfaces
interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  category: string
  image?: string
  isAvailable: boolean
}

interface OrderItem {
  menuItemId: string
  quantity: number
}

interface CustomerInfo {
  notes: string
  deliveryAddress: string
  phoneNumber: string
}

const OrderForm: React.FC = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    notes: '',
    deliveryAddress: '',
    phoneNumber: ''
  })
  
  const { createOrder, loading } = useOrders()
  const { menuItems } = useMenu()

  // Type assertion for menuItems
  const typedMenuItems = menuItems as MenuItem[]

  const handleAddItem = (menuItemId: string) => {
    const existingItem = orderItems.find(item => item.menuItemId === menuItemId)
    
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.menuItemId === menuItemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setOrderItems([...orderItems, { menuItemId, quantity: 1 }])
    }
  }

  const handleRemoveItem = (menuItemId: string) => {
    setOrderItems(orderItems.filter(item => item.menuItemId !== menuItemId))
  }

  const handleQuantityChange = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(menuItemId)
      return
    }
    
    setOrderItems(orderItems.map(item =>
      item.menuItemId === menuItemId
        ? { ...item, quantity }
        : item
    ))
  }

  const calculateTotal = (): number => {
    return orderItems.reduce((total, orderItem) => {
      const menuItem = typedMenuItems.find((m: MenuItem) => m.id === orderItem.menuItemId)
      return total + (menuItem ? Number(menuItem.price) * orderItem.quantity : 0)
    }, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (orderItems.length === 0) {
      alert('Please add at least one item to your order')
      return
    }
    
    try {
      await createOrder({
        items: orderItems,
        ...customerInfo
      })
      
      // Reset form
      setOrderItems([])
      setCustomerInfo({
        notes: '',
        deliveryAddress: '',
        phoneNumber: ''
      })
      
      alert('Order placed successfully!')
    } catch (error) {
      console.error('Failed to create order:', error)
    }
  }

  if (!typedMenuItems || typedMenuItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading menu items...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Place Your Order</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Menu Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Select Items</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {typedMenuItems.map((item: MenuItem) => (
              <div key={item.id} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    Rp {Number(item.price).toLocaleString('id-ID')}
                  </p>
                </div>
                <Button
                  onClick={() => handleAddItem(item.id)}
                  variant="primary"
                  size="small"
                  disabled={!item.isAvailable}
                >
                  {item.isAvailable ? 'Add' : 'Unavailable'}
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Order Summary & Customer Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          
          {/* Order Items */}
          <div className="space-y-2 mb-6">
            {orderItems.map((orderItem) => {
              const menuItem = typedMenuItems.find((m: MenuItem) => m.id === orderItem.menuItemId)
              if (!menuItem) return null
              
              return (
                <div key={orderItem.menuItemId} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <span className="font-medium">{menuItem.name}</span>
                    <span className="text-sm text-gray-600 ml-2">
                      Rp {Number(menuItem.price).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      value={orderItem.quantity}
                      onChange={(e) => handleQuantityChange(orderItem.menuItemId, parseInt(e.target.value) || 0)}
                      className="w-16 px-2 py-1 border rounded text-center"
                    />
                    <button
                      onClick={() => handleRemoveItem(orderItem.menuItemId)}
                      className="text-danger-700 hover:text-danger-900 text-xl font-bold"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )
            })}
            
            {orderItems.length === 0 && (
              <p className="text-gray-500 text-center py-4">No items selected</p>
            )}
          </div>
          
          {/* Total */}
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>Rp {calculateTotal().toLocaleString('id-ID')}</span>
            </div>
          </div>
          
          {/* Customer Information Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={customerInfo.phoneNumber}
                onChange={(e) => setCustomerInfo({...customerInfo, phoneNumber: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="08123456789"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address *
              </label>
              <textarea
                value={customerInfo.deliveryAddress}
                onChange={(e) => setCustomerInfo({...customerInfo, deliveryAddress: e.target.value})}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your complete delivery address..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Any special instructions..."
              />
            </div>
            
            <Button
              type="submit"
              disabled={loading || orderItems.length === 0}
              className="w-full"
              variant="primary"
            >
              {loading ? 'Placing Order...' : `Place Order (Rp ${calculateTotal().toLocaleString('id-ID')})`}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OrderForm
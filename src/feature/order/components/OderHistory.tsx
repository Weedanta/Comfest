'use client'
import React from 'react'
import { useOrders } from '../hooks/useOrder'

const OrderHistory: React.FC = () => {
  const { orders, loading, error } = useOrders()

  if (loading) {
    return <div className="flex justify-center p-8">Loading orders...</div>
  }

  if (error) {
    return (
      <div className="bg-danger-200 text-danger-700 p-4 rounded">
        Error loading orders: {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Order History</h2>
      
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        orders.map((order: any) => (
          <div key={order.id} className="bg-white border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">Order #{order.id.slice(-8)}</h3>
                <p className="text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                order.status === 'PREPARING' ? 'bg-orange-100 text-orange-800' :
                order.status === 'READY' ? 'bg-green-100 text-green-800' :
                order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {order.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              {order.orderItems.map((item: any) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.menuItem.name} x {item.quantity}</span>
                  <span>Rp {(Number(item.price) * item.quantity).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>Rp {Number(order.totalAmount).toLocaleString('id-ID')}</span>
              </div>
              
              {order.deliveryAddress && (
                <div className="mt-2 text-sm text-gray-600">
                  <strong>Delivery Address:</strong> {order.deliveryAddress}
                </div>
              )}
              
              {order.notes && (
                <div className="mt-1 text-sm text-gray-600">
                  <strong>Notes:</strong> {order.notes}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default OrderHistory
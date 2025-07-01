'use client'
import React from 'react'
import { useMenu } from '../hooks/useMenu'
import { Button } from '@/shared/components/ui/Button'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  isAvailable: boolean
}

const MenuList: React.FC = () => {
  const { menuItems, loading, error } = useMenu()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-danger-200 text-danger-700 p-4 rounded">
        Error loading menu: {error}
      </div>
    )
  }

  // Group menu items by category
  const groupedMenu = menuItems.reduce((acc: Record<string, MenuItem[]>, item: MenuItem) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <div className="space-y-8">
      {Object.entries(groupedMenu).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const MenuCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Adding to cart:', item)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-neutral-800 mb-2">{item.name}</h3>
        <p className="text-neutral-600 text-sm mb-3">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-primary-600">
            Rp {item.price.toLocaleString('id-ID')}
          </span>
          <Button
            onClick={handleAddToCart}
            variant="primary"
            size="small"
            disabled={!item.isAvailable}
          >
            {item.isAvailable ? 'Add to Cart' : 'Unavailable'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MenuList
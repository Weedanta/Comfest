import { prisma } from '@/lib/prisma';

export interface CreateOrderData {
  userId: string;
  items: {
    menuItemId: string;
    quantity: number;
  }[];
  notes?: string;
  deliveryAddress?: string;
  phoneNumber?: string;
}

export class OrderService {
  static async createOrder(data: CreateOrderData) {
    const { userId, items, notes, deliveryAddress, phoneNumber } = data;
    
    // Calculate total amount
    let totalAmount = 0;
    const orderItemsData = [];
    
    for (const item of items) {
      const menuItem = await prisma.menuItem.findUnique({
        where: { id: item.menuItemId }
      });
      
      if (!menuItem) {
        throw new Error(`Menu item not found: ${item.menuItemId}`);
      }
      
      const itemTotal = Number(menuItem.price) * item.quantity;
      totalAmount += itemTotal;
      
      orderItemsData.push({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: menuItem.price
      });
    }
    
    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        notes,
        deliveryAddress,
        phoneNumber,
        orderItems: {
          create: orderItemsData
        }
      },
      include: {
        orderItems: {
          include: {
            menuItem: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    return order;
  }
  
  static async getUserOrders(userId: string) {
    return await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            menuItem: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
  
  static async getAllOrders() {
    return await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            menuItem: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
  
  static async updateOrderStatus(orderId: string, status: string) {
    return await prisma.order.update({
      where: { id: orderId },
      data: { status: status as any }
    });
  }
  
  static async getOrderById(orderId: string) {
    return await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            menuItem: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }
}
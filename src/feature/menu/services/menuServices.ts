import { prisma } from '@/lib/prisma';

export interface CreateMenuItemData {
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
}

export class MenuService {
  static async getAllMenuItems() {
    return await prisma.menuItem.findMany({
      where: { isAvailable: true },
      orderBy: { createdAt: 'desc' }
    });
  }
  
  static async getMenuItemById(id: string) {
    return await prisma.menuItem.findUnique({
      where: { id }
    });
  }
  
  static async createMenuItem(data: CreateMenuItemData) {
    return await prisma.menuItem.create({
      data: {
        ...data,
        price: data.price
      }
    });
  }
  
  static async updateMenuItem(id: string, data: Partial<CreateMenuItemData>) {
    return await prisma.menuItem.update({
      where: { id },
      data
    });
  }
  
  static async deleteMenuItem(id: string) {
    return await prisma.menuItem.update({
      where: { id },
      data: { isAvailable: false }
    });
  }
  
  static async getMenuByCategory() {
    const menuItems = await prisma.menuItem.findMany({
      where: { isAvailable: true }
    });
    
    const groupedByCategory = menuItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, any[]>);
    
    return groupedByCategory;
  }
}
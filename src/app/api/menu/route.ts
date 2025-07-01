import { NextRequest, NextResponse } from 'next/server';
import { MenuService } from '@/feature/menu/services/menuServices';

export async function GET() {
  try {
    const menuItems = await MenuService.getAllMenuItems();
    
    return NextResponse.json({
      message: 'Menu items retrieved successfully',
      data: menuItems
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const menuItem = await MenuService.createMenuItem(body);
    
    return NextResponse.json({
      message: 'Menu item created successfully',
      data: menuItem
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Failed to create menu item' },
      { status: 500 }
    );
  }
}
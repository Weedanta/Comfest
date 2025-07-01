import { NextRequest, NextResponse } from 'next/server';
import { OrderService } from '@/feature/order/services/orderService';
import jwt from 'jsonwebtoken';

function getUserFromToken(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    throw new Error('No token provided');
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromToken(request);
    const body = await request.json();
    
    const orderData = {
      userId: user.userId,
      ...body
    };
    
    const order = await OrderService.createOrder(orderData);
    
    return NextResponse.json({
      message: 'Order created successfully',
      data: order
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromToken(request);
    const orders = await OrderService.getUserOrders(user.userId);
    
    return NextResponse.json({
      message: 'Orders retrieved successfully',
      data: orders
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
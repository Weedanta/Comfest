import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      message: 'Database connection successful',
      data: {
        connected: true,
        userCount
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        message: 'Database connection failed',
        error: error.message 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
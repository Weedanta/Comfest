import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/feature/auth/services/authService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    const result = await AuthService.login({ email, password });
    
    return NextResponse.json({
      message: 'Login successful',
      data: result
    });
    
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Login failed' },
      { status: 401 }
    );
  }
}
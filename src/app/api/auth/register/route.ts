import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/feature/auth/services/authService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, confirm_password, name } = body;
    
    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    if (password !== confirm_password) {
      return NextResponse.json(
        { message: 'Passwords do not match' },
        { status: 400 }
      );
    }
    
    const result = await AuthService.register({ email, password, confirm_password, name });
    
    return NextResponse.json({
      message: 'User registered successfully',
      data: result
    });
    
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Registration failed' },
      { status: 400 }
    );
  }
}
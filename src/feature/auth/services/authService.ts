import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, LoginCredentials, RegisterCredentials } from '@/shared/type/TAuth';

export class AuthService {
  static async register(credentials: RegisterCredentials) {
    const { email, password, name } = credentials;
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'USER'
      }
    });
    
    return this.generateTokenResponse(user);
  }
  
  static async login(credentials: LoginCredentials) {
    const { email, password } = credentials;
    
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }
    
    return this.generateTokenResponse(user);
  }
  
  private static generateTokenResponse(user: any) {
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isAdmin: user.isAdmin
      }
    };
  }
  
  static async getUserById(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }
}
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signJWT } from '@/lib/jwt';
import { User, LoginCredentials, RegisterCredentials } from '@/shared/type/TAuth';

export class AuthService {
  static async register(credentials: RegisterCredentials & { name: string }) {
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
    const token = signJWT({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isAdmin: user.isAdmin
    });
    
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
}
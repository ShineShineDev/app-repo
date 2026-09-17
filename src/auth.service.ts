import { Injectable, BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: string;
}

export interface RegisterDto {
  username?: string;
  password?: string;
}

export interface LoginDto {
  username?: string;
  password?: string;
}

@Injectable()
export class AuthService {
  // In-memory storage: username -> User
  private readonly users = new Map<string, User>();

  private hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
  }

  private verifyPassword(password: string, storedHash: string): boolean {
    const [salt, originalHash] = storedHash.split(':');
    if (!salt || !originalHash) {
      return false;
    }
    const derivedHash = scryptSync(password, salt, 64);
    const originalHashBuffer = Buffer.from(originalHash, 'hex');
    if (derivedHash.length !== originalHashBuffer.length) {
      return false;
    }
    return timingSafeEqual(derivedHash, originalHashBuffer);
  }

  register(dto: RegisterDto) {
    const username = dto.username?.trim();
    const password = dto.password;

    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    if (username.length < 3) {
      throw new BadRequestException('Username must be at least 3 characters long');
    }

    if (password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters long');
    }

    const normalizedKey = username.toLowerCase();
    if (this.users.has(normalizedKey)) {
      throw new ConflictException('Username is already taken');
    }

    const newUser: User = {
      id: randomBytes(8).toString('hex'),
      username,
      passwordHash: this.hashPassword(password),
      createdAt: new Date().toISOString(),
    };

    this.users.set(normalizedKey, newUser);

    return {
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        createdAt: newUser.createdAt,
      },
    };
  }

  login(dto: LoginDto) {
    const username = dto.username?.trim();
    const password = dto.password;

    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    const normalizedKey = username.toLowerCase();
    const user = this.users.get(normalizedKey);

    if (!user || !this.verifyPassword(password, user.passwordHash)) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  getUsersCount(): number {
    return this.users.size;
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthController & AuthService (In-Memory DB)', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('POST /auth/register', () => {
    it('should register a new user successfully', () => {
      const res = authController.register({ username: 'alice', password: 'password123' });
      expect(res.message).toBe('User registered successfully');
      expect(res.user.username).toBe('alice');
      expect(res.user.id).toBeDefined();
      expect(authService.getUsersCount()).toBe(1);
    });

    it('should throw BadRequestException if fields are missing', () => {
      expect(() => authController.register({ username: '', password: '123' })).toThrow(
        BadRequestException,
      );
    });

    it('should throw ConflictException if username is duplicate', () => {
      authController.register({ username: 'bob', password: 'password123' });
      expect(() =>
        authController.register({ username: 'bob', password: 'password456' }),
      ).toThrow(ConflictException);
    });
  });

  describe('POST /auth/login', () => {
    it('should log in successfully with valid credentials', () => {
      authController.register({ username: 'charlie', password: 'secretpassword' });
      const res = authController.login({ username: 'charlie', password: 'secretpassword' });
      expect(res.message).toBe('Login successful');
      expect(res.user.username).toBe('charlie');
    });

    it('should throw UnauthorizedException on wrong password', () => {
      authController.register({ username: 'david', password: 'secretpassword' });
      expect(() =>
        authController.login({ username: 'david', password: 'wrongpassword' }),
      ).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for non-existent user', () => {
      expect(() =>
        authController.login({ username: 'unknown', password: 'secretpassword' }),
      ).toThrow(UnauthorizedException);
    });
  });
});

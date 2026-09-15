import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('GET /', () => {
    it('should return an HTML welcome page', () => {
      const html = appController.getWelcome();
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('Premium');
      expect(html).toContain('Your API is');
    });
  });

  describe('GET /health', () => {
    it('should return status ok', () => {
      const health = appController.getHealth();
      expect(health.status).toBe('ok');
    });

    it('should include a numeric uptime', () => {
      const health = appController.getHealth();
      expect(typeof health.uptime).toBe('number');
      expect(health.uptime).toBeGreaterThanOrEqual(0);
    });

    it('should include an ISO timestamp', () => {
      const health = appController.getHealth();
      expect(() => new Date(health.timestamp)).not.toThrow();
      expect(health.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });
});

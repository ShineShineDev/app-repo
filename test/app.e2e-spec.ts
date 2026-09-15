import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /', () => {
    it('should return 200 with HTML content-type', async () => {
      const res = await request(app.getHttpServer()).get('/');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toMatch(/text\/html/);
    });

    it('should contain premium welcome page markup', async () => {
      const res = await request(app.getHttpServer()).get('/');
      expect(res.text).toContain('<!DOCTYPE html>');
      expect(res.text).toContain('Premium');
      expect(res.text).toContain('Your API is');
    });
  });

  describe('GET /health', () => {
    it('should return 200 with status ok', async () => {
      const res = await request(app.getHttpServer()).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });

    it('should include uptime and timestamp', async () => {
      const res = await request(app.getHttpServer()).get('/health');
      expect(typeof res.body.uptime).toBe('number');
      expect(res.body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });
});

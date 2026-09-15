import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/html; charset=utf-8')
  getWelcome(): string {
    return this.appService.getWelcomePage();
  }

  @Get('health')
  getHealth(): { status: string; uptime: number; timestamp: string } {
    return this.appService.getHealth();
  }
}

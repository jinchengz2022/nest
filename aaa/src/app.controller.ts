import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('h1')
  getH1(name: string): string {
    return this.appService.getHello() + name;
  }

  @Get('h2')
  getH2(): string {
    return this.appService.getHello();
  }
}

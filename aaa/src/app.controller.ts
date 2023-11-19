import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AaaInterceptor } from './aaa.interceptor';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('h1')
  @UseInterceptors(AaaInterceptor)
  getH1(): any {
    return new Error('err');
  }

  @Get('h2')
  getH2(): string {
    return this.appService.getHello();
  }
}

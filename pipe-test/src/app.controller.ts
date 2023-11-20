import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { PppPipe } from './ppp.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('aa')
  getHello(@Query('aa', PppPipe) aa: string): string {
    console.log('sss');

    return this.appService.getHello() + aa;
  }
}

import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { IsInt } from 'class-validator';
import { AppService } from './app.service';
import { PppPipe } from './ppp.pipe';

export class Prop {
  name: string;
  @IsInt()
  age: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('aa')
  getHello(@Query('aa', PppPipe) aa: string): string {
    console.log('sss');
    return this.appService.getHello() + aa;
  }

  @Post('test')
  getName(@Body(new ValidationPipe()) obj: Prop) {
    throw new HttpException('hhhhh', HttpStatus.BAD_REQUEST);
    console.log(obj);
    return '';
  }
}

import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AaaInterceptor } from './aaa.interceptor';
import { AppService } from './app.service';

// import uuid from 'uuid';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Query(
      'aa',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND }),
    )
    aa: string,
  ): string {
    return aa + 1;
  }

  @Get('h1/:uuid')
  @UseInterceptors(AaaInterceptor)
  getH1(@Param('bb', new ParseUUIDPipe()) bb: number): any {
    return bb;
    // return new Error('err');
  }

  @Get('h2')
  getH2(): string {
    return this.appService.getHello();
  }
}

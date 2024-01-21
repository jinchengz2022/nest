import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisClientType } from 'redis';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  @Get()
  async getHello(): Promise<string> {
    const key = await this.redisClient.keys('*');

    console.log(key);

    return this.appService.getHello();
  }
}

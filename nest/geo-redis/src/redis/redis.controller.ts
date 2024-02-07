import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { RedisService } from './redis.service';
import { AddPosDto } from './dto/addPos.dto';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('getPos')
  async getPos(@Query('name') name: string) {
    return await this.redisService.getPos('positions', name);
  }

  @Get('getPosList')
  async getPosList(@Query('name') name: string) {
    const res = await this.redisService.getPosList(name);
    console.log(res);

    return res;
  }
  @Post('addPos')
  async addPos(@Body() params: AddPosDto) {
    console.log(params);

    if (!params.name || !params.latitude || !params.latitude) {
      throw new BadRequestException('信息不全');
    }

    try {
      await this.redisService.addPos(params);
    } catch (error) {
      throw new BadRequestException(error);
    }

    return {
      message: '',
      code: 200,
    };
  }

  @Post('searchNearBy')
  async searchNearBy(@Body() params: { key: string; radius: number }) {
    const currentPos = await this.getPos(params.key);
    console.log(currentPos);

    if (currentPos) {
      const res = await this.redisService.searchNearBy(
        'positions',
        [currentPos.longitude, currentPos.latitude],
        params.radius,
      );

      return res;
    }

    return false;
  }
}

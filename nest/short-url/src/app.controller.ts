import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Redirect,
  Param,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ShortLongMapService } from './short-long-map.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(ShortLongMapService)
  private shortLongMapService: ShortLongMapService;

  @Get('jump/:code')
  @Redirect()
  async jump(@Param('code') code) {
    const longUrl = await this.shortLongMapService.getLongUrl(code);

    if (!longUrl) {
      throw new BadRequestException('短链不存在');
    }

    return {
      url: longUrl,
      statusCode: 302,
    };
  }

  @Get('shortUrl')
  async generateUrl(@Query('url') longUrl) {
    console.log({ longUrl });

    return this.shortLongMapService.generate(longUrl);
  }
}

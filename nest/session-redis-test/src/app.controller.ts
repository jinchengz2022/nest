import { Injectable, Get, Req, Res, Inject, Controller } from '@nestjs/common';
import { Request, Response } from 'express';
import { SessionService } from './session/session.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(SessionService)
  private sessionService: SessionService;

  @Get('count')
  async count(@Req() req: Request, @Res() res: Response) {
    try {
      const sid = req.cookies?.sid;

      const session = await this.sessionService.getSession<{ count: string }>(
        sid,
      );
      const curCount = session.count ? parseInt(session.count) + 1 : 1;
      const curSid = await this.sessionService.setSession(sid, {
        count: curCount,
      });

      res.cookie('sid', curSid, { maxAge: 18000000 });

      return curCount;
    } catch (error) {
      console.error(error);
    }
  }

  @Get()
  getHello(): string {
    return 'hello world';
  }
}

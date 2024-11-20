import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RequireLogin, RequirePermission, UserInfo } from './custom.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('aaa')
  @RequireLogin()
  @RequirePermission('ddd')
  aaa(@UserInfo('userName') userName: string, @UserInfo() userInfo): string {
    console.log({ userName, userInfo });

    return this.appService.getHello();
  }
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { AppService } from './app.service';

@Injectable()
export class M1Middleware implements NestMiddleware {
  constructor(private appServer: AppService) {}

  use(req: Request, res: Request, next: () => void) {
    console.log({ req, res });

    console.log('before');
    console.log(this.appServer.getHello() + '11111');

    next();
    console.log('after');
  }
}

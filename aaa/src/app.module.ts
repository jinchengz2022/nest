import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { M1Middleware } from './m1.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // 指定M1Middleware中间件作用于h1这个路由
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(M1Middleware)
      .forRoutes({ path: 'h1*', method: RequestMethod.GET });
    consumer
      .apply(M1Middleware)
      .forRoutes({ path: 'h2*', method: RequestMethod.GET });
  }
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AppService } from './app.service';

@Injectable()
export class AaaInterceptor implements NestInterceptor {
  constructor(private appService: AppService) {}

  private readonly logger = new Logger(AaaInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 使用tap执行额外操作，不会改变数据
    const now = Date.now();

    return next.handle().pipe(
      catchError((err) => {
        // this.appService.getH1();
        // console.log(String(err));
        this.logger.error(err.message, err.stack);
        return throwError(() => err);
      }),
    );
    // 添加一些日志、缓存逻辑等
    // .pipe(
    //   tap((data) => {
    //     this.appService.getHello();
    //     this.logger.log(data, 'data');
    //   }),
    // );
    // 接口请求时长
    // .pipe(tap(() => console.log(`after ... ${Date.now() - now} ms`)));
  }
}

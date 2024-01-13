import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';
import { Reflector } from '@nestjs/core';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector;

  @Inject(RedisService)
  private redisService: RedisService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const user = request.session.user;

    if (!user) {
      throw new UnauthorizedException('用户未登录~');
    }

    let permissions = await this.redisService.listGet(
      `user_${user.userName}_permission`,
    );

    if (permissions.length === 0) {
      const foundUser = await this.userService.findByUserName(user.userName);
      permissions = foundUser.permissions.map((i) => i.name);

      this.redisService.listSet(
        `user_${user.userName}_permission`,
        permissions,
        60 * 30,
      );
    }
    const permission = this.reflector.get('permission', context.getHandler());

    if (permissions.some((i) => i === permission)) {
      return true;
    } else {
      throw new UnauthorizedException('暂无权限～');
    }
  }
}

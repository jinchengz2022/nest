import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { Request } from 'express';
import { Permissions } from './user/entities/permissions.entity';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (!request.user) {
      return true;
    }

    const roles = await this.userService.findRolesByIds(
      request.user.roles.map((i) => i.id),
    );

    const permissions: Permissions[] = roles.reduce((pre, cur) => {
      pre.push(...cur.permissions);
      return pre;
    }, []);

    const requirePermissions = this.reflector.getAllAndOverride(
      'require-permissions',
      [context.getClass(), context.getHandler()],
    );

    console.log(requirePermissions, 'requirePermissions');

    console.log(permissions, 'permissions');

    const hasAccess = permissions.find((i) => i.name === requirePermissions[0]);

    if (!hasAccess) {
      throw new UnauthorizedException('暂无权限访问该接口！');
    }

    return true;
  }
}

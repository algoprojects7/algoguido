import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { hasPermission, type Permission } from '@algoguido/shared';
import { type TokenPayload } from '@algoguido/auth';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<Permission[]>('permissions', context.getHandler());
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as TokenPayload;

    if (!user) {
      throw new ForbiddenException('User session context is missing');
    }

    const hasAccess = requiredPermissions.every((permission) =>
      hasPermission(user.role, permission)
    );

    if (!hasAccess) {
      throw new ForbiddenException('You do not have the required permissions to perform this action');
    }

    return true;
  }
}

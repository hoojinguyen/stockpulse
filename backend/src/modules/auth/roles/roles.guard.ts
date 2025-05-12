import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

/**
 * Guard to check if the user has the required roles
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Check if the user has the required roles
   * 
   * @param context Execution context
   * @returns Whether the user can access the endpoint
   */
  canActivate(context: ExecutionContext): boolean {
    // Get the required roles from the handler metadata
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Get the user from the request
    const { user } = context.switchToHttp().getRequest();

    // Check if the user exists and has preferences with a role
    if (!user || !user.user || !user.user.preferences) {
      throw new ForbiddenException('User does not have required permissions');
    }

    // Check if the user's role is in the required roles
    return requiredRoles.includes(user.user.preferences.role);
  }
}
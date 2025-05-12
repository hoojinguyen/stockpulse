import { SetMetadata } from '@nestjs/common';

/**
 * Key for roles metadata
 */
export const ROLES_KEY = 'roles';

/**
 * Decorator to specify required roles for an endpoint
 * 
 * @param roles Array of roles that can access the endpoint
 * @returns Decorator function
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
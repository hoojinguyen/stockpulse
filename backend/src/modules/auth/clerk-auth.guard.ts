import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard for protecting routes with Clerk authentication
 * 
 * Uses the Clerk passport strategy to validate JWT tokens
 * and authorize access to protected routes
 */
@Injectable()
export class ClerkAuthGuard extends AuthGuard('clerk') {}
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from './clerk-auth.guard';
import { CurrentUser } from './current-user.decorator';

/**
 * Authentication controller
 * 
 * Provides endpoints for testing authentication
 */
@Controller('auth')
export class AuthController {
  /**
   * Get the current authenticated user
   * 
   * @param user Current authenticated user
   * @returns User information
   */
  @Get('me')
  @UseGuards(ClerkAuthGuard)
  getMe(@CurrentUser() user: any) {
    return user;
  }
}
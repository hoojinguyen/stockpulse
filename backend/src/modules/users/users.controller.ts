import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ClerkAuthGuard } from '@modules/auth/clerk-auth.guard';
import { CurrentUser } from '@modules/auth/current-user.decorator';

/**
 * Controller for user management
 */
@Controller('users')
@UseGuards(ClerkAuthGuard) // Protect all routes in this controller
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get the current user's profile
   * 
   * @param user Current authenticated user
   * @returns User profile
   */
  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    return user.user; // Return the database user from the auth payload
  }

  /**
   * Get a user by ID
   * 
   * @param id User ID
   * @returns User
   */
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    // Convert string ID to number
    const userId = Number(id);
    
    // In a real application, you would check if the current user has permission
    // to view this user's information
    return this.usersService.findByClerkId(userId.toString());
  }
}
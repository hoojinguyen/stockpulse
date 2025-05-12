import { Controller, Get, Param, Put, Body, UseGuards, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PreferencesService } from './preferences.service';
import { ClerkAuthGuard } from '@modules/auth/clerk-auth.guard';
import { CurrentUser } from '@modules/auth/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '@modules/auth/roles/roles.decorator';
import { RolesGuard } from '@modules/auth/roles/roles.guard';

/**
 * Controller for user management
 */
@Controller('users')
@UseGuards(ClerkAuthGuard) // Protect all routes in this controller
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly preferencesService: PreferencesService,
  ) {}

  /**
   * Get the current user's profile
   * 
   * @param user Current authenticated user
   * @returns User profile with preferences
   */
  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    const dbUser = user.user;
    
    // Get user preferences
    try {
      const preferences = await this.preferencesService.getPreferences(dbUser.id);
      return { ...dbUser, preferences };
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Create default preferences if not found
        const preferences = await this.preferencesService.createDefaultPreferences(dbUser.id);
        return { ...dbUser, preferences };
      }
      throw error;
    }
  }

  /**
   * Update the current user's profile
   * 
   * @param user Current authenticated user
   * @param updateUserDto Data for updating user
   * @returns Updated user profile
   */
  @Put('profile')
  async updateProfile(
    @CurrentUser() user: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const dbUser = user.user;
    
    // Update user fields
    if (updateUserDto.name) {
      dbUser.name = updateUserDto.name;
    }
    
    if (updateUserDto.email) {
      dbUser.email = updateUserDto.email;
    }
    
    // Save updated user
    const updatedUser = await this.usersService.update(dbUser.id, dbUser);
    
    // Get user preferences
    try {
      const preferences = await this.preferencesService.getPreferences(dbUser.id);
      return { ...updatedUser, preferences };
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Create default preferences if not found
        const preferences = await this.preferencesService.createDefaultPreferences(dbUser.id);
        return { ...updatedUser, preferences };
      }
      throw error;
    }
  }

  /**
   * Get a user by ID (admin only)
   * 
   * @param id User ID
   * @returns User
   */
  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async getUserById(@Param('id') id: string) {
    // Convert string ID to number
    const userId = parseInt(id, 10);
    
    // Get user by ID
    const user = await this.usersService.findById(userId);
    
    // Get user preferences
    try {
      const preferences = await this.preferencesService.getPreferences(userId);
      return { ...user, preferences };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return user; // Return user without preferences if not found
      }
      throw error;
    }
  }
  
  /**
   * Get all users (admin only)
   * 
   * @returns List of users
   */
  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  async getAllUsers() {
    return this.usersService.findAll();
  }
}
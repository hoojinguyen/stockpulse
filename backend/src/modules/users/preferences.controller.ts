import { Controller, Get, Put, Body, UseGuards, ForbiddenException, Param } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { ClerkAuthGuard } from '@modules/auth/clerk-auth.guard';
import { CurrentUser } from '@modules/auth/current-user.decorator';
import { Roles } from '@modules/auth/roles/roles.decorator';
import { RolesGuard } from '@modules/auth/roles/roles.guard';

/**
 * Controller for managing user preferences
 */
@Controller('preferences')
@UseGuards(ClerkAuthGuard)
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  /**
   * Get the current user's preferences
   * 
   * @param user Current authenticated user
   * @returns User preferences
   */
  @Get()
  async getPreferences(@CurrentUser() user: any) {
    return this.preferencesService.getPreferences(user.user.id);
  }

  /**
   * Update the current user's preferences
   * 
   * @param user Current authenticated user
   * @param updatePreferencesDto Data for updating preferences
   * @returns Updated preferences
   */
  @Put()
  async updatePreferences(
    @CurrentUser() user: any,
    @Body() updatePreferencesDto: UpdatePreferencesDto,
  ) {
    return this.preferencesService.updatePreferences(
      user.user.id,
      updatePreferencesDto,
    );
  }

  /**
   * Update a user's role (admin only)
   * 
   * @param userId User ID to update
   * @param role New role
   * @returns Updated preferences
   */
  @Put(':userId/role')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async updateUserRole(
    @Param('userId') userId: string,
    @Body('role') role: string,
  ) {
    if (!role) {
      throw new ForbiddenException('Role is required');
    }

    return this.preferencesService.updateUserRole(
      parseInt(userId, 10),
      role,
    );
  }
}
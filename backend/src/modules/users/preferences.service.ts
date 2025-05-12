import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPreferences } from './entities/user-preferences.entity';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { User } from './entities/user.entity';

/**
 * Service for managing user preferences
 */
@Injectable()
export class PreferencesService {
  constructor(
    @InjectRepository(UserPreferences)
    private preferencesRepository: Repository<UserPreferences>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Get preferences for a user
   * 
   * @param userId User ID
   * @returns User preferences
   */
  async getPreferences(userId: number): Promise<UserPreferences> {
    const preferences = await this.preferencesRepository.findOne({
      where: { userId },
      relations: ['user'],
    });

    if (!preferences) {
      throw new NotFoundException(`Preferences for user with ID ${userId} not found`);
    }

    return preferences;
  }

  /**
   * Create default preferences for a user
   * 
   * @param userId User ID
   * @returns Created preferences
   */
  async createDefaultPreferences(userId: number): Promise<UserPreferences> {
    // Check if user exists
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Create default preferences
    const preferences = this.preferencesRepository.create({
      userId,
      // Default values are set in the entity
    });

    return this.preferencesRepository.save(preferences);
  }

  /**
   * Update preferences for a user
   * 
   * @param userId User ID
   * @param updatePreferencesDto Data for updating preferences
   * @returns Updated preferences
   */
  async updatePreferences(
    userId: number,
    updatePreferencesDto: UpdatePreferencesDto,
  ): Promise<UserPreferences> {
    // Get existing preferences or create default ones
    let preferences: UserPreferences;
    try {
      preferences = await this.getPreferences(userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        preferences = await this.createDefaultPreferences(userId);
      } else {
        throw error;
      }
    }

    // Update preferences
    Object.assign(preferences, updatePreferencesDto);
    return this.preferencesRepository.save(preferences);
  }

  /**
   * Update user role (admin only)
   * 
   * @param userId User ID
   * @param role New role
   * @returns Updated preferences
   */
  async updateUserRole(userId: number, role: string): Promise<UserPreferences> {
    // Get existing preferences or create default ones
    let preferences: UserPreferences;
    try {
      preferences = await this.getPreferences(userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        preferences = await this.createDefaultPreferences(userId);
      } else {
        throw error;
      }
    }

    // Update role
    preferences.role = role;
    return this.preferencesRepository.save(preferences);
  }
}
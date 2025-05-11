import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

/**
 * Enum for theme preferences
 */
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

/**
 * Enum for notification preferences
 */
export enum NotificationFrequency {
  REAL_TIME = 'real_time',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  NEVER = 'never',
}

/**
 * Data Transfer Object for updating user preferences
 */
export class UpdatePreferencesDto {
  /**
   * User's preferred theme
   */
  @IsEnum(Theme, { message: 'Theme must be one of: light, dark, system' })
  @IsOptional()
  theme?: Theme;

  /**
   * User's notification frequency preference
   */
  @IsEnum(NotificationFrequency, {
    message: 'Notification frequency must be one of: real_time, daily, weekly, never',
  })
  @IsOptional()
  notificationFrequency?: NotificationFrequency;

  /**
   * Whether to receive email notifications
   */
  @IsBoolean({ message: 'Email notifications must be a boolean value' })
  @IsOptional()
  emailNotifications?: boolean;

  /**
   * Default currency for displaying financial data
   */
  @IsString({ message: 'Default currency must be a string' })
  @IsOptional()
  defaultCurrency?: string;
}
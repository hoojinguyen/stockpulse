import { IsEmail, IsOptional, IsString } from 'class-validator';

/**
 * Data Transfer Object for updating a user
 */
export class UpdateUserDto {
  /**
   * User's email (optional for updates)
   */
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsOptional()
  email?: string;

  /**
   * User's name (optional)
   */
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;
}
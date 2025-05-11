import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * Data Transfer Object for creating a user
 */
export class CreateUserDto {
  /**
   * User's email (required)
   */
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  /**
   * User's name (optional)
   */
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;

  /**
   * Clerk user ID (required)
   */
  @IsString({ message: 'Clerk ID must be a string' })
  @IsNotEmpty({ message: 'Clerk ID is required' })
  clerkId: string;
}
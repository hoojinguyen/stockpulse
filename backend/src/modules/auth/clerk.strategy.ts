import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Inject } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '@modules/users/users.service';
import { User } from '@modules/users/entities/user.entity';

/**
 * Passport strategy for Clerk authentication
 * 
 * Validates JWT tokens from Clerk and extracts user information
 */
@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, 'clerk') {
  constructor(
    @Inject('CLERK_CLIENT') private readonly clerkClient: any,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  /**
   * Validate the request by extracting and verifying the JWT token
   * 
   * @param req Express request object
   * @returns User information extracted from the token and the database user
   */
  async validate(req: Request): Promise<any> {
    try {
      // Extract the token from the Authorization header
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }
      
      // Verify the token with Clerk
      const { sub: clerkId, email, email_verified, ...tokenData } = await this.clerkClient.verifyToken(token);
      
      if (!clerkId || !email || !email_verified) {
        throw new UnauthorizedException('Invalid token or missing required claims');
      }
      
      // Find or create the user in our database
      const user: User = await this.usersService.findOrCreate(
        clerkId,
        email,
        tokenData.name || null
      );
      
      // Return both the token data and the database user
      return {
        clerkId,
        email,
        ...tokenData,
        user,
      };
    } catch (error) {
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
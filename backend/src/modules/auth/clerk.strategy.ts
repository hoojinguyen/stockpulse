import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Inject } from '@nestjs/common';
import { Request } from 'express';

/**
 * Passport strategy for Clerk authentication
 * 
 * Validates JWT tokens from Clerk and extracts user information
 */
@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, 'clerk') {
  constructor(@Inject('CLERK_CLIENT') private readonly clerkClient: any) {
    super();
  }

  /**
   * Validate the request by extracting and verifying the JWT token
   * 
   * @param req Express request object
   * @returns User information extracted from the token
   */
  async validate(req: Request): Promise<any> {
    try {
      // Extract the token from the Authorization header
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }
      
      // Verify the token with Clerk
      const { sub: userId, ...tokenData } = await this.clerkClient.verifyToken(token);
      
      if (!userId) {
        throw new UnauthorizedException('Invalid token');
      }
      
      // Return the user information
      return { userId, ...tokenData };
    } catch (error) {
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
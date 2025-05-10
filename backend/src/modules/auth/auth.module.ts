import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ClerkStrategy } from './clerk.strategy';
import { ClerkClientProvider } from '../../providers/clerk-client.provider';
import { UsersModule } from '@modules/users/users.module';

/**
 * Authentication module for Clerk integration
 * 
 * Provides authentication services using Clerk for user management
 * and JWT token validation
 */
@Module({
  imports: [PassportModule, UsersModule],
  providers: [ClerkStrategy, ClerkClientProvider],
  exports: [ClerkStrategy],
})
export class AuthModule {}
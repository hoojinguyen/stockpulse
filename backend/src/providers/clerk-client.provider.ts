import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClerkClient } from '@clerk/backend';

/**
 * Provider for Clerk client
 * 
 * Creates and configures a Clerk client instance using environment variables
 * for authentication with Clerk's services.
 */
export const ClerkClientProvider: Provider = {
  provide: 'CLERK_CLIENT',
  useFactory: (configService: ConfigService) => {
    return createClerkClient({
      secretKey: configService.get<string>('CLERK_SECRET_KEY'),
    });
  },
  inject: [ConfigService],
};
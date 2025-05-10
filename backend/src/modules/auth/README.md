# Authentication Module

## Overview

This module implements authentication using Clerk, a third-party authentication service. It provides a Passport strategy for verifying JWT tokens issued by Clerk and a guard for protecting routes.

## Components

- **ClerkClientProvider**: Creates and configures a Clerk client instance using environment variables.
- **ClerkStrategy**: A Passport strategy that validates JWT tokens from Clerk.
- **ClerkAuthGuard**: A guard that protects routes with Clerk authentication.
- **CurrentUser**: A decorator to extract the current authenticated user from the request.

## Usage

### Protecting Routes

To protect a route with Clerk authentication, use the `ClerkAuthGuard`:

```typescript
@Get()
@UseGuards(ClerkAuthGuard)
getWatchlists() {
  return this.watchlistsService.findAll();
}
```

### Accessing the Current User

To access the current authenticated user, use the `CurrentUser` decorator:

```typescript
@Get()
@UseGuards(ClerkAuthGuard)
getWatchlists(@CurrentUser() user: any) {
  return this.watchlistsService.findAllByUserId(user.userId);
}
```

## Environment Variables

The following environment variables are required:

- `CLERK_SECRET_KEY`: The secret key for your Clerk application.

Add these to your `.env` file:

```
CLERK_SECRET_KEY=your_secret_key
```

## Setup

1. Create a Clerk application at [Clerk](https://clerk.com/) and obtain your API keys.
2. Add the environment variables to your `.env` file.
3. Import the `AuthModule` in your `app.module.ts`.

```typescript
import { AuthModule } from './modules/auth';

@Module({
  imports: [
    // ...
    AuthModule,
    // ...
  ],
})
export class AppModule {}
```